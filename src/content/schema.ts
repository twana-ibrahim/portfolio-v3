import { z } from "zod";

/**
 * CONTENT SCHEMAS
 *
 * Every piece of portfolio content is parsed through these at module load.
 * A typo in a date, a missing summary, or an orphaned case-study slug fails
 * `pnpm build` rather than rendering something broken in production.
 *
 * This is the entire reason a CMS is unnecessary here: the type system and
 * these schemas give the same guarantees a CMS's content model would, with
 * git history, code review and zero infrastructure.
 */

/** "2024-03" — year and month is the right precision for a CV. */
const YearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected YYYY-MM");

/** An end date of `null` means "present". */
const EndDate = YearMonth.nullable();

const Slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected a lowercase kebab-case slug");

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  arrangement: z.enum(["remote", "on-site", "hybrid"]),
  start: YearMonth,
  end: EndDate,
  /**
   * What was actually shipped, in the applicant's own voice. Two to four
   * bullets. Each one should survive the question "so what?".
   */
  highlights: z.array(z.string().min(1)).min(1).max(5),
  /** Slugs from `projects`. Renders the work done during this role. */
  projects: z.array(Slug).default([]),
});

export type Experience = z.infer<typeof experienceSchema>;

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A single hard number. These are what separate a portfolio from a list of
 * nouns, so the schema makes them a first-class field rather than prose.
 */
export const metricSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const projectSchema = z.object({
  slug: Slug,
  title: z.string().min(1),
  /** Who it was built for. Empty string for personal work. */
  client: z.string(),
  year: z.number().int().min(2018).max(2100),
  /** One sentence, indicative mood, no marketing adjectives. */
  summary: z.string().min(20).max(200),
  role: z.string().min(1),
  domain: z.enum([
    "telecom",
    "fintech",
    "media",
    "government",
    "healthcare",
    "hospitality",
    "ngo",
    "education",
    "personal",
  ]),
  surface: z.enum(["web-app", "website", "mobile", "pwa", "platform"]),
  stack: z.array(z.string().min(1)).min(1),
  metrics: z.array(metricSchema).default([]),
  links: z
    .object({
      live: z.url().optional(),
      repo: z.url().optional(),
    })
    .default({}),
  /**
   * Internal enterprise work that cannot be shown or linked. Drives the "no
   * public link" affordance in the UI, so absent links read as deliberate
   * rather than as an oversight.
   */
  confidential: z.boolean().default(false),
  /** Surfaces on the home page. Keep this to four or fewer. */
  featured: z.boolean().default(false),
  /** True when `src/content/case-studies/<slug>.mdx` exists. Enforced below. */
  caseStudy: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type Metric = z.infer<typeof metricSchema>;

/* -------------------------------------------------------------------------- */
/*  Skills                                                                    */
/* -------------------------------------------------------------------------- */

export const skillGroupSchema = z.object({
  title: z.string().min(1),
  /**
   * Six items maximum, on purpose. A forty-badge wall communicates "I have
   * heard of these things"; a short, ordered list communicates judgement.
   */
  items: z.array(z.string().min(1)).min(1).max(6),
});

export type SkillGroup = z.infer<typeof skillGroupSchema>;

/* -------------------------------------------------------------------------- */
/*  Case study frontmatter (MDX)                                              */
/* -------------------------------------------------------------------------- */

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  /** Must match a `slug` in `projects`. Checked at read time. */
  project: Slug,
  /** Used verbatim as the meta description, so it has a hard length bound. */
  description: z.string().min(50).max(160),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD"),
  /** Estimated read time is computed, never authored. */
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;

/* -------------------------------------------------------------------------- */
/*  Collection-level validation                                               */
/* -------------------------------------------------------------------------- */

/**
 * Parses the project list and enforces the invariants a per-item schema
 * cannot see: unique slugs, and every `experience.projects` reference
 * resolving to a real project.
 */
export function parseProjects(input: unknown[]): Project[] {
  const projects = z.array(projectSchema).parse(input);

  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) {
      throw new Error(`Duplicate project slug: "${project.slug}"`);
    }
    seen.add(project.slug);
  }

  return projects;
}

export function parseExperience(input: unknown[], projects: Project[]): Experience[] {
  const experience = z.array(experienceSchema).parse(input);
  const slugs = new Set(projects.map((project) => project.slug));

  for (const role of experience) {
    for (const slug of role.projects) {
      if (!slugs.has(slug)) {
        throw new Error(
          `Experience "${role.company} (${role.start})" references unknown project "${slug}"`,
        );
      }
    }
  }

  return experience;
}

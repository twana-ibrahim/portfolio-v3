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
/*  Localization                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Requires a value in every locale.
 *
 * The locales are written out rather than derived from the `locales` array,
 * because that is what makes adding a third language a compile error here
 * first — one obvious failure in one file, instead of an English sentence
 * quietly surviving in the middle of a translated page.
 *
 * What is NOT wrapped is as deliberate as what is. Product names (`title`),
 * client names, technology names and certification titles stay in one form:
 * "React" is "React" in Kurdish, and translating "Advanced React" would make
 * the credential impossible to match against the certificate it links to.
 */
export function localized<T extends z.ZodType>(inner: T) {
  return z.object({ en: inner, ku: inner });
}

/* -------------------------------------------------------------------------- */
/*  Experience                                                                */
/* -------------------------------------------------------------------------- */

export const experienceSchema = z.object({
  company: z.string().min(1),
  /**
   * The employer's previous name, when the entity changed underneath a
   * continuous period of employment — a rebrand, an acquisition, or a team
   * transferred wholesale.
   *
   * Exists so that case can be one entry rather than two. Splitting it reads
   * as a job change that did not happen; hiding it entirely would misname the
   * company for the earlier half of the dates. Not localized: a registered
   * company name is the same string in both languages.
   */
  formerly: z.string().min(1).optional(),
  role: localized(z.string().min(1)),
  location: localized(z.string().min(1)),
  arrangement: z.enum(["remote", "on-site", "hybrid"]),
  start: YearMonth,
  end: EndDate,
  /**
   * What was actually shipped, in the applicant's own voice. Two to four
   * bullets. Each one should survive the question "so what?".
   *
   * Localized as a whole list rather than per bullet, so a locale is free to
   * make a point in three sentences where the other needs four.
   */
  highlights: localized(z.array(z.string().min(1)).min(1).max(5)),
  /** Slugs from `projects`. Renders the work done during this role. */
  projects: z.array(Slug).default([]),
});

export type Experience = z.infer<typeof experienceSchema>;

export const educationSchema = z.object({
  institution: localized(z.string().min(1)),
  qualification: localized(z.string().min(1)),
  start: YearMonth,
  end: EndDate,
});

export type Education = z.infer<typeof educationSchema>;

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A single hard number. These are what separate a portfolio from a list of
 * nouns, so the schema makes them a first-class field rather than prose.
 */
export const metricSchema = z.object({
  value: z.string().min(1),
  label: localized(z.string().min(1)),
});

export const projectSchema = z.object({
  slug: Slug,
  title: z.string().min(1),
  /** Who it was built for. Empty string for personal work. */
  client: z.string(),
  year: z.number().int().min(2018).max(2100),
  /**
   * One sentence, indicative mood, no marketing adjectives.
   *
   * The bound is per locale and counts characters, which is the honest measure
   * for Arabic script — Sorani runs a little shorter than English for the same
   * meaning, so the same ceiling is not a tighter constraint in practice.
   */
  summary: localized(z.string().min(20).max(220)),
  role: localized(z.string().min(1)),
  /**
   * The industry the software serves. Surfaced in the UI next to the client,
   * because "eight industries in five years" is a claim the list itself proves.
   */
  domain: z.enum([
    "telecom",
    "fintech",
    "media",
    "identity",
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
  title: localized(z.string().min(1)),
  /**
   * Six items maximum, on purpose. A forty-badge wall communicates "I have
   * heard of these things"; a short, ordered list communicates judgement.
   *
   * Not localized: these are technology names, and a Kurdish developer writes
   * "TypeScript" in Latin exactly as an English one does.
   */
  items: z.array(z.string().min(1)).min(1).max(6),
});

export type SkillGroup = z.infer<typeof skillGroupSchema>;

/* -------------------------------------------------------------------------- */
/*  Credentials                                                               */
/* -------------------------------------------------------------------------- */

export const certificationSchema = z.object({
  /**
   * Not localized, and not a translation candidate. The name has to match the
   * certificate the `verifyUrl` resolves to, or the link stops being proof.
   */
  name: z.string().min(1),
  issuer: z.string().min(1),
  /** "YYYY-MM" awarded. An undated credential reads as filler. */
  awarded: YearMonth.optional(),
  /**
   * Public verification URL. This is the whole value of a certification —
   * anyone can type a course name, and a link is the difference between a
   * claim and a fact. Optional because not every issuer provides one.
   */
  verifyUrl: z.url().optional(),
});

export const languageSchema = z.object({
  name: localized(z.string().min(1)),
  /** Mirrors the CEFR-adjacent wording recruiters expect on a CV. */
  level: z.enum(["Native", "Professional", "Limited working", "Elementary"]),
});

export type Certification = z.infer<typeof certificationSchema>;
export type Language = z.infer<typeof languageSchema>;

/* -------------------------------------------------------------------------- */
/*  Long-form copy                                                            */
/* -------------------------------------------------------------------------- */

/**
 * A heading split into three parts, because one phrase in the middle is set
 * apart — italic serif in English, heavier weight in Kurdish, since Arabic
 * script has no italic. `trail` may be empty when the emphasis ends the line.
 */
export const statementSchema = z.object({
  lead: z.string().min(1),
  emphasis: z.string().min(1),
  trail: z.string(),
});

export type Statement = z.infer<typeof statementSchema>;

/**
 * The person, in prose.
 *
 * Separate from `lib/config/site.ts`, which holds the facts that do not change
 * with language — the URL, the email, the IANA timezone, the path to the CV.
 * Anything a reader reads as a sentence lives here instead, because it has to
 * exist twice and `site.ts` is `as const`, which would freeze every string to
 * its own literal type and make a second locale impossible to assign.
 */
export const profileSchema = z.object({
  name: localized(z.string().min(1)),
  role: localized(z.string().min(1)),
  tagline: localized(z.string().min(1)),
  headline: localized(statementSchema),
  /** Supports a `{years}` token, resolved against `careerStart` at render. */
  summary: localized(z.string().min(40)),
  availability: z.object({
    label: localized(z.string().min(1)),
    detail: localized(z.string().min(1)),
  }),
  location: z.object({
    city: localized(z.string().min(1)),
    region: localized(z.string().min(1)),
    country: localized(z.string().min(1)),
  }),
  bio: localized(z.array(z.string().min(1)).min(1)),
});

export type Profile = z.infer<typeof profileSchema>;

export function parseProfile(input: unknown): Profile {
  return profileSchema.parse(input);
}

/**
 * Per-page prose: the one heading and the one paragraph each page opens with.
 *
 * Not in the UI dictionary. A dictionary entry is a label that happens to
 * appear in several places; these are the pages' actual writing, and keeping
 * them next to the rest of the content is what stops the dictionary turning
 * into a second, undisciplined content store.
 */
export const pageCopySchema = z.object({
  work: z.object({
    title: localized(statementSchema),
    intro: localized(z.string().min(40)),
    description: localized(z.string().min(40).max(200)),
  }),
  about: z.object({
    title: localized(statementSchema),
    description: localized(z.string().min(40).max(200)),
  }),
  contact: z.object({
    title: localized(z.string().min(1)),
    where: localized(z.string().min(20)),
    description: localized(z.string().min(40).max(200)),
  }),
  cta: z.object({
    title: localized(statementSchema),
    body: localized(z.string().min(40)),
  }),
});

export type PageCopy = z.infer<typeof pageCopySchema>;

export function parsePageCopy(input: unknown): PageCopy {
  return pageCopySchema.parse(input);
}

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

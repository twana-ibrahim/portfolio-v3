import { z } from "zod";

/**
 * Content is parsed through these at module load, so malformed data fails
 * `pnpm build` rather than rendering broken in production.
 */

const YearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Expected YYYY-MM");
const EndDate = YearMonth.nullable();
const Slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected a lowercase kebab-case slug");

/**
 * Requires a value in every locale.
 *
 * Locales are written out rather than derived from the `locales` array, so
 * adding a third language is a compile error here first — one obvious failure
 * in one file, instead of English quietly surviving inside a translated page.
 *
 * What is not wrapped is as deliberate as what is: product, client and
 * technology names stay in one form.
 */
export function localized<T extends z.ZodType>(inner: T) {
  return z.object({ en: inner, ku: inner });
}

export const experienceSchema = z.object({
  company: z.string().min(1),
  /** Previous name, when the entity changed under a continuous tenure. */
  formerly: z.string().min(1).optional(),
  role: localized(z.string().min(1)),
  location: localized(z.string().min(1)),
  arrangement: z.enum(["remote", "on-site", "hybrid"]),
  start: YearMonth,
  end: EndDate,
  /** Localized as a whole list, so a locale may use more or fewer bullets. */
  highlights: localized(z.array(z.string().min(1)).min(1).max(5)),
  /** Slugs from `projects`. Cross-checked in `parseExperience`. */
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

export const metricSchema = z.object({
  value: z.string().min(1),
  label: localized(z.string().min(1)),
});

export const projectSchema = z.object({
  slug: Slug,
  title: z.string().min(1),
  /** Empty string for personal work. */
  client: z.string(),
  year: z.number().int().min(2018).max(2100),
  summary: localized(z.string().min(20).max(220)),
  role: localized(z.string().min(1)),
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
  /** Drives the "no public link" affordance, so a missing link reads as intent. */
  confidential: z.boolean().default(false),
  /** Surfaces on the home page. Keep to four or fewer. */
  featured: z.boolean().default(false),
  /** True when `src/content/case-studies/<slug>.mdx` exists. */
  caseStudy: z.boolean().default(false),
});

export type Project = z.infer<typeof projectSchema>;
export type Metric = z.infer<typeof metricSchema>;

export const skillGroupSchema = z.object({
  title: localized(z.string().min(1)),
  /** Six maximum: a long list says "I have heard of these things". */
  items: z.array(z.string().min(1)).min(1).max(6),
});

export type SkillGroup = z.infer<typeof skillGroupSchema>;

export const certificationSchema = z.object({
  /** Must match the certificate `verifyUrl` resolves to, so never translated. */
  name: z.string().min(1),
  issuer: z.string().min(1),
  awarded: YearMonth.optional(),
  /** Public verification link — the difference between a claim and a fact. */
  verifyUrl: z.url().optional(),
});

export const languageSchema = z.object({
  name: localized(z.string().min(1)),
  level: z.enum(["Native", "Professional", "Limited working", "Elementary"]),
});

export type Certification = z.infer<typeof certificationSchema>;
export type Language = z.infer<typeof languageSchema>;

/**
 * A heading split so one phrase can be set apart: italic serif in English,
 * heavier weight in Kurdish, since Arabic script has no italic. `trail` may be
 * empty when the emphasis ends the line.
 */
export const statementSchema = z.object({
  lead: z.string().min(1),
  emphasis: z.string().min(1),
  trail: z.string(),
});

export type Statement = z.infer<typeof statementSchema>;

/**
 * Prose lives here rather than in `lib/config/site.ts`, which is `as const` —
 * that would freeze every string to its own literal type and make a second
 * locale impossible to assign.
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
 * Per-page prose, kept out of the UI dictionary. A dictionary entry is a label
 * reused in several places; this is the pages' actual writing.
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

/** Enforces the invariant a per-item schema cannot see: unique slugs. */
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

/** Fails the build on an experience entry pointing at a project that is gone. */
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

export const caseStudyFrontmatterSchema = z.object({
  title: z.string().min(1),
  /** Must equal the filename slug. Checked at read time. */
  project: Slug,
  /** Used verbatim as the meta description, hence the hard bound. */
  description: z.string().min(50).max(160),
  published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD"),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudyFrontmatterSchema>;

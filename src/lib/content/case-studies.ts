import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { projects } from "@/content/projects";
import { type CaseStudyFrontmatter, caseStudyFrontmatterSchema } from "@/content/schema";

const CASE_STUDY_DIR = path.join(process.cwd(), "src", "content", "case-studies");

export type CaseStudy = CaseStudyFrontmatter & {
  slug: string;
  /** Raw MDX body, compiled by the page that renders it. */
  body: string;
  readingMinutes: number;
};

/** 200 wpm is the usual figure for technical prose. */
function estimateReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function readCaseStudy(fileName: string): Promise<CaseStudy> {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = await readFile(path.join(CASE_STUDY_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const frontmatter = caseStudyFrontmatterSchema.safeParse(data);
  if (!frontmatter.success) {
    // Fail the build rather than render a case study with no description or a
    // malformed date. Prefixing with the filename makes it fixable at a glance.
    throw new Error(
      `Invalid frontmatter in case-studies/${fileName}:\n${frontmatter.error.issues
        .map((issue) => `  • ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  if (frontmatter.data.project !== slug) {
    throw new Error(
      `case-studies/${fileName}: frontmatter project "${frontmatter.data.project}" must match the filename slug "${slug}".`,
    );
  }

  return {
    ...frontmatter.data,
    slug,
    body: content,
    readingMinutes: estimateReadingMinutes(content),
  };
}

/** All case studies, newest first. Called at build time only. */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  let files: string[];
  try {
    files = (await readdir(CASE_STUDY_DIR)).filter((file) => file.endsWith(".mdx"));
  } catch {
    return [];
  }

  const studies = await Promise.all(files.map(readCaseStudy));

  // Guards the one piece of drift the schemas cannot see: a project flagged
  // `caseStudy: true` with no MDX behind it would render a link straight into
  // a 404, and dynamicParams is off so it would not even be a soft one.
  const written = new Set(studies.map((study) => study.slug));
  const missing = projects.filter((project) => project.caseStudy && !written.has(project.slug));
  if (missing.length > 0) {
    throw new Error(
      `Projects flagged caseStudy: true with no MDX file in src/content/case-studies/:\n${missing
        .map((project) => `  • ${project.slug}.mdx`)
        .join("\n")}`,
    );
  }

  return studies.sort((a, b) => b.published.localeCompare(a.published));
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const studies = await getCaseStudies();
  return studies.find((study) => study.slug === slug) ?? null;
}

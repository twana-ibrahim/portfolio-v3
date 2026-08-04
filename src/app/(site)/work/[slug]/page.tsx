import { ArrowLeft, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/layout/container";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { TagList } from "@/components/ui/tag";
import { getProjectBySlug } from "@/content/projects";
import { ContactCta } from "@/features/contact";
import { getCaseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { createMetadata } from "@/lib/seo/metadata";

/** Every case study is known at build time, so all of them prerender. */
export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return createMetadata({ title: "Not found", noIndex: true });

  return createMetadata({
    title: study.title,
    description: study.description,
    path: `/work/${slug}`,
    type: "article",
    publishedTime: study.published,
  });
}

/**
 * Derived from compileMDX itself rather than reached for from `unified`, so it
 * stays correct across next-mdx-remote upgrades and needs no `any` cast for the
 * plugin tuples.
 */
type CompileOptions = NonNullable<Parameters<typeof compileMDX>[0]["options"]>;

const mdxOptions: CompileOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          // Dual themes emit --shiki-light / --shiki-dark custom properties,
          // which globals.css switches on. One highlight pass, both themes.
          theme: { light: "github-light-default", dark: "github-dark-default" },
          keepBackground: false,
        },
      ],
    ],
  },
};

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;

  const [study, project] = [await getCaseStudy(slug), getProjectBySlug(slug)];
  if (!study || !project) notFound();

  const { content } = await compileMDX({
    source: study.body,
    components: mdxComponents,
    options: mdxOptions,
  });

  return (
    <>
      <Container className="pt-12 pb-4 md:pt-16">
        <Link
          href="/work"
          className="label group inline-flex items-center gap-2 text-ink-subtle transition-colors duration-fast hover:text-ink"
        >
          <ArrowLeft
            size={13}
            aria-hidden
            className="transition-transform duration-fast ease-out-quart group-hover:-translate-x-0.5"
          />
          All work
        </Link>

        <header className="mt-12 border-line border-b pb-12 md:mt-16">
          <h1 className="max-w-4xl text-ink text-title">{study.title}</h1>

          <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label text-ink-subtle">Client</dt>
              <dd className="mt-2 text-ink text-sm">{project.client || "Personal project"}</dd>
            </div>
            <div>
              <dt className="label text-ink-subtle">Role</dt>
              <dd className="mt-2 text-ink text-sm">{project.role}</dd>
            </div>
            <div>
              <dt className="label text-ink-subtle">Year</dt>
              <dd className="mt-2 text-ink text-sm tabular-nums">{project.year}</dd>
            </div>
            <div>
              <dt className="label text-ink-subtle">Read</dt>
              <dd className="mt-2 text-ink text-sm">{study.readingMinutes} min</dd>
            </div>
          </dl>

          <TagList items={project.stack} className="mt-10" />

          {project.confidential ? (
            <p className="label mt-8 inline-flex items-center gap-2 text-ink-subtle">
              <Lock size={12} strokeWidth={2} aria-hidden />
              Internal system — screenshots and links withheld
            </p>
          ) : null}
        </header>
      </Container>

      <Container width="prose" className="py-16 md:py-20">
        <article>{content}</article>
      </Container>

      <ContactCta />
    </>
  );
}

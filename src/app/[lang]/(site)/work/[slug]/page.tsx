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
import { interpolate } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import { localePath } from "@/lib/i18n/routing";
import { getTranslations } from "@/lib/i18n/server";
import { createMetadata } from "@/lib/seo/metadata";

/** Every case study is known at build time, so all of them prerender. */
export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

/**
 * Off: the lesser of two flawed options.
 *
 * `notFound()` thrown inside the `[lang]` tree resolves to no boundary in this
 * app — not at `[lang]/`, not in the route group, not at the app root — and
 * Next serves its error shell with an empty `<body>`. On, the request reaches
 * the page, the throw happens, and the visitor gets that blank page.
 *
 * Off, the slug matches no route and `app/not-found.tsx` handles it. The cost
 * is one `NoFallbackError` per unknown slug in the log. Recheck on the next
 * Next major; if the throw starts resolving, turn this on and the 404 gains
 * the site chrome.
 */
export const dynamicParams = false;

/**
 * Case studies are English-only: the MDX bodies have no Kurdish counterpart
 * and the loader keys them by slug alone, so the chrome localizes and the
 * prose does not. Costs nothing today — every project is `caseStudy: false`.
 * Before the first one ships, decide whether the loader should look for
 * `<slug>.ku.mdx` or whether both locales link to the English version.
 */
export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getTranslations();
  const study = await getCaseStudy(slug);
  if (!study) return createMetadata({ title: "Not found", locale, noIndex: true });

  return createMetadata({
    title: study.title,
    description: study.description,
    path: `/work/${slug}`,
    locale,
    type: "article",
    publishedTime: study.published,
  });
}

/** Derived from compileMDX itself, so it survives next-mdx-remote upgrades
 *  and needs no `any` cast for the plugin tuples. */
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

export default async function CaseStudyPage({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const { locale, dictionary } = await getTranslations();

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
          href={localePath(locale, "/work")}
          className="label group inline-flex items-center gap-2 text-ink-subtle transition-colors duration-fast hover:text-ink"
        >
          <ArrowLeft
            size={13}
            aria-hidden
            className="transition-transform duration-fast ease-out-expo group-hover:-translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0.5"
          />
          {dictionary.work.allWork}
        </Link>

        <header className="mt-12 border-line border-b pb-12 md:mt-16">
          {/* The body is English-only — see the note above — so the heading
              and article are marked as such regardless of page locale. */}
          <h1 lang="en" dir="ltr" className="max-w-4xl text-ink text-title rtl:text-end">
            {study.title}
          </h1>

          <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="label text-ink-subtle">{dictionary.work.client}</dt>
              <dd className="mt-2 text-ink text-sm">
                {project.client || dictionary.work.personalProject}
              </dd>
            </div>
            <div>
              <dt className="label text-ink-subtle">{dictionary.work.role}</dt>
              <dd className="mt-2 text-ink text-sm">{pick(project.role, locale)}</dd>
            </div>
            <div>
              <dt className="label text-ink-subtle">{dictionary.work.year}</dt>
              <dd dir="ltr" className="mt-2 text-ink text-sm tabular-nums rtl:text-end">
                {project.year}
              </dd>
            </div>
            <div>
              <dt className="label text-ink-subtle">{dictionary.work.read}</dt>
              <dd className="mt-2 text-ink text-sm">
                {interpolate(dictionary.work.readingMinutes, { count: study.readingMinutes })}
              </dd>
            </div>
          </dl>

          <TagList dir="ltr" items={project.stack} className="mt-10" />

          {project.confidential ? (
            <p className="label mt-8 inline-flex items-center gap-2 text-ink-subtle">
              <Lock size={12} strokeWidth={2} aria-hidden />
              {dictionary.work.withheld}
            </p>
          ) : null}
        </header>
      </Container>

      <Container width="prose" className="py-16 md:py-20">
        <article lang="en" dir="ltr">
          {content}
        </article>
      </Container>

      <ContactCta />
    </>
  );
}

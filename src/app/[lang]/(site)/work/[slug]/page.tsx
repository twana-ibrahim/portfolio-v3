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
 * Off, deliberately, and it is the lesser of two flawed options.
 *
 * `notFound()` thrown from inside the `[lang]` tree does not resolve to any
 * not-found boundary in this app — not at `[lang]/`, not in the route group,
 * not at the app root. Next serves its built-in error shell with an empty
 * `<body>`. Turning this on lets the request reach the page, so the throw
 * happens, so the visitor gets that blank page.
 *
 * Off, the slug never matches a route at all, and the miss is handled by
 * `app/not-found.tsx` — which renders. The cost is one
 * `Internal: NoFallbackError` line in the server log per unknown slug: real
 * noise, and worth it. A page the visitor can read beats a log the visitor
 * never sees.
 *
 * Recheck on the next Next.js major. If `notFound()` starts resolving, turn
 * this on and the 404 gains the site's header and footer.
 */
export const dynamicParams = false;

/**
 * ── CASE STUDIES ARE ENGLISH-ONLY, FOR NOW ──────────────────────────────────
 * The MDX bodies in `src/content/case-studies/` have no Kurdish counterpart,
 * and the loader keys them by slug alone. The chrome around them localizes,
 * the prose does not.
 *
 * This costs nothing today — every project carries `caseStudy: false`, so this
 * route prerenders zero pages. Before the first one ships, decide whether the
 * loader should look for `<slug>.ku.mdx` and fall back to English, or whether
 * a case study simply links to the English version from both locales.
 * ────────────────────────────────────────────────────────────────────────────
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
          // Was a bare "/work", which 404s through the proxy now that every
          // route lives under a locale segment.
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

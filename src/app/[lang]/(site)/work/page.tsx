import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { StatementText } from "@/components/ui/statement";
import { pageCopy } from "@/content/pages";
import { projects } from "@/content/projects";
import { ContactCta } from "@/features/contact";
import { ProjectList } from "@/features/work";
import { plural } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import { getTranslations } from "@/lib/i18n/server";
import { createMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getTranslations();

  return createMetadata({
    title: dictionary.work.eyebrow,
    path: "/work",
    locale,
    description: pick(pageCopy.work.description, locale),
  });
}

/** Newest first, then grouped under the year so the list stays scannable. */
function groupByYear(items: typeof projects) {
  const groups = new Map<number, typeof projects>();
  for (const project of items) {
    groups.set(project.year, [...(groups.get(project.year) ?? []), project]);
  }
  return [...groups.entries()].sort(([a], [b]) => b - a);
}

export default async function WorkPage() {
  const { locale, dictionary } = await getTranslations();
  const grouped = groupByYear(projects);
  const title = pick(pageCopy.work.title, locale);

  return (
    <>
      <Container className="pt-16 pb-4 md:pt-24">
        <Reveal>
          <p className="label text-ink-subtle">{dictionary.work.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-ink text-title">
            <StatementText lead={title.lead} emphasis={title.emphasis} trail={title.trail} />
          </h1>
          <p className="mt-8 max-w-xl text-ink-muted text-lead">
            {pick(pageCopy.work.intro, locale)}
          </p>
        </Reveal>
      </Container>

      {grouped.map(([year, items]) => (
        <Section
          key={year}
          label={String(year)}
          meta={plural(dictionary.work.projectCount, items.length)}
          className="py-10 md:py-14"
        >
          <ProjectList projects={items} />
        </Section>
      ))}

      <ContactCta />
    </>
  );
}

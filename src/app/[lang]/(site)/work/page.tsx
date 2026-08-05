import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/content/projects";
import { ContactCta } from "@/features/contact";
import { ProjectList } from "@/features/work";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Work",
  path: "/work",
  description:
    "Selected engineering work across digital banking, telecom, streaming, identity and government systems — built between 2021 and today.",
});

/** Newest first, then grouped under the year so the list stays scannable. */
function groupByYear(items: typeof projects) {
  const groups = new Map<number, typeof projects>();
  for (const project of items) {
    groups.set(project.year, [...(groups.get(project.year) ?? []), project]);
  }
  return [...groups.entries()].sort(([a], [b]) => b - a);
}

export default function WorkPage() {
  const grouped = groupByYear(projects);

  return (
    <>
      <Container className="pt-16 pb-4 md:pt-24">
        <Reveal>
          <p className="label text-ink-subtle">Work</p>
          <h1 className="mt-6 max-w-4xl text-ink text-title">
            Systems that businesses{" "}
            <em className="font-serif font-normal tracking-[-0.02em]">actually run on</em>.
          </h1>
          <p className="mt-8 max-w-xl text-ink-muted text-lead">
            Most of this is internal software — back-office portals, agent tools, reporting systems
            and identity infrastructure, running inside banks, telecom operators and public bodies.
            None of it is public, so a missing link here is deliberate rather than an oversight. The
            detail lives in the case studies.
          </p>
        </Reveal>
      </Container>

      {grouped.map(([year, items]) => (
        <Section
          key={year}
          label={String(year)}
          meta={`${items.length} project${items.length === 1 ? "" : "s"}`}
          className="py-10 md:py-14"
        >
          <ProjectList projects={items} />
        </Section>
      ))}

      <ContactCta />
    </>
  );
}

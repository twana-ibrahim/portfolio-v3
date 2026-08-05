import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { experience } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { ContactCta } from "@/features/contact";
import { ExperienceList } from "@/features/experience";
import { Hero } from "@/features/hero";
import { ProjectList } from "@/features/work";

/**
 * The home page composes feature slices and does nothing else.
 *
 * No data massaging, no styling decisions, no business logic — if this file
 * ever grows past a screen, the work belongs in a slice instead.
 */
export default function HomePage() {
  const firstYear = experience.at(-1)?.start.slice(0, 4) ?? "";
  const latestYear = new Date().getFullYear().toString().slice(2);

  return (
    <>
      <Hero />

      <Section
        id="work"
        label="Selected work"
        meta={
          <Link
            href="/work"
            className="link-underline inline-flex items-center gap-1.5 hover:text-ink"
          >
            All {projects.length} projects
            <ArrowRight size={12} strokeWidth={2} aria-hidden />
          </Link>
        }
      >
        <ProjectList projects={featuredProjects} />
      </Section>

      <Section id="experience" label="Experience" meta={`${firstYear}—${latestYear}`}>
        <ExperienceList />
      </Section>

      <ContactCta />
    </>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { experience } from "@/content/experience";
import { featuredProjects, projects } from "@/content/projects";
import { ContactCta } from "@/features/contact";
import { ExperienceList } from "@/features/experience";
import { Hero } from "@/features/hero";
import { ProjectList } from "@/features/work";
import { interpolate } from "@/lib/i18n/format";
import { localePath } from "@/lib/i18n/routing";
import { getTranslations } from "@/lib/i18n/server";

/**
 * The home page composes feature slices and does nothing else.
 *
 * No data massaging, no styling decisions, no business logic — if this file
 * ever grows past a screen, the work belongs in a slice instead.
 */
export default async function HomePage() {
  const { locale, dictionary } = await getTranslations();

  const firstYear = experience.at(-1)?.start.slice(0, 4) ?? "";
  const latestYear = new Date().getFullYear().toString().slice(2);

  return (
    <>
      <Hero />

      <Section
        id="work"
        label={dictionary.home.selectedWork}
        meta={
          <Link
            href={localePath(locale, "/work")}
            className="link-underline inline-flex items-center gap-1.5 hover:text-ink"
          >
            {interpolate(dictionary.home.allProjects, { count: projects.length })}
            <ArrowRight size={12} strokeWidth={2} aria-hidden className="rtl:-scale-x-100" />
          </Link>
        }
      >
        <ProjectList projects={featuredProjects} />
      </Section>

      <Section
        id="experience"
        label={dictionary.home.experience}
        // dir="ltr": an en-dashed year range is two Latin numbers around a
        // neutral character, which the bidi algorithm flips in an RTL line.
        meta={<span dir="ltr">{`${firstYear}—${latestYear}`}</span>}
      >
        <ExperienceList />
      </Section>

      <ContactCta />
    </>
  );
}

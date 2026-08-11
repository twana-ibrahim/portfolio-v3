import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/section";
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
        meta={
          <Link
            href={localePath(locale, "/about")}
            className="link-underline inline-flex items-center gap-1.5 hover:text-ink"
          >
            {dictionary.about.fullHistory}
            <ArrowRight size={12} strokeWidth={2} aria-hidden className="rtl:-scale-x-100" />
          </Link>
        }
      >
        {/* Two most recent. The full history is /about's job — rendering it
            here as well put the same list on the page twice. */}
        <ExperienceList limit={2} />
      </Section>

      <ContactCta />
    </>
  );
}

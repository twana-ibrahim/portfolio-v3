import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Project } from "@/content/schema";
import { getTranslations } from "@/lib/i18n/server";
import { ProjectRow } from "./project-row";

/**
 * Resolves the locale once for the whole list rather than letting each row
 * await it. `getTranslations()` is cheap and would be correct either way, but
 * a row is rendered up to sixteen times per page and there is no reason for
 * sixteen async boundaries where one will do.
 */
export async function ProjectList({ projects }: { projects: readonly Project[] }) {
  const { locale, dictionary } = await getTranslations();

  return (
    <Stagger>
      <ul className="border-line border-b">
        {projects.map((project, index) => (
          <StaggerItem key={project.slug} as="li" className="border-line border-t">
            <ProjectRow project={project} index={index} locale={locale} dictionary={dictionary} />
          </StaggerItem>
        ))}
      </ul>
    </Stagger>
  );
}

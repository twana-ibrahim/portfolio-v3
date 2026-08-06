import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { experience } from "@/content/experience";
import { getProjectBySlug } from "@/content/projects";
import { pick } from "@/lib/i18n/localized";
import { getTranslations } from "@/lib/i18n/server";
import { formatDateRange, formatDuration } from "@/lib/utils/format";

/**
 * Employment history.
 *
 * Laid out as a two-column record rather than the usual vertical timeline with
 * dots and a connecting line. A timeline spends a third of its width on
 * decoration; this spends it on the highlights, which is the only part anyone
 * actually reads.
 */
export async function ExperienceList() {
  const { locale, dictionary } = await getTranslations();

  return (
    <Stagger>
      <ol className="border-line border-b">
        {experience.map((role) => {
          const projectTitles = role.projects
            .map((slug) => getProjectBySlug(slug)?.title)
            .filter((title): title is string => Boolean(title));

          return (
            <StaggerItem
              key={`${role.company}-${role.start}`}
              as="li"
              className="grid gap-x-8 gap-y-5 border-line border-t py-10 md:grid-cols-12"
            >
              <div className="md:col-span-4">
                <h3 className="font-medium text-ink text-subheading tracking-tight">
                  {role.company}
                </h3>
                <p className="mt-1.5 text-ink-muted text-sm">{pick(role.role, locale)}</p>
                <p className="label mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-subtle">
                  <span>{pick(role.location, locale)}</span>
                  <span aria-hidden className="h-px w-3 bg-line-strong" />
                  <span>{dictionary.work.arrangement[role.arrangement]}</span>
                </p>
              </div>

              <div className="md:col-span-3 md:col-start-5">
                <p className="label text-ink-subtle">
                  {formatDateRange(role.start, role.end, locale)}
                </p>
                {/* Full token, no opacity modifier: /70 dropped this below
                      the contrast floor the token exists to guarantee. */}
                <p className="label mt-1.5 text-ink-subtle">
                  {formatDuration(role.start, role.end, locale)}
                </p>
              </div>

              <div className="md:col-span-5">
                <ul className="space-y-3">
                  {pick(role.highlights, locale).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-ink-muted text-sm leading-relaxed"
                    >
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-line-strong" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {projectTitles.length > 0 ? (
                  // dir="ltr": product names joined by a neutral separator.
                  // In an RTL paragraph the bidi algorithm reverses the run
                  // and "Fast SIM · Smart Offers" comes out backwards.
                  <p dir="ltr" className="label mt-5 text-ink-subtle rtl:text-end">
                    {projectTitles.join(" · ")}
                  </p>
                ) : null}
              </div>
            </StaggerItem>
          );
        })}
      </ol>
    </Stagger>
  );
}

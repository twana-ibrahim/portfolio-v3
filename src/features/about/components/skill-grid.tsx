import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { secondarySkills, skillGroups } from "@/content/skills";
import { pick } from "@/lib/i18n/localized";
import { getTranslations } from "@/lib/i18n/server";

export async function SkillGrid() {
  const { locale, dictionary } = await getTranslations();

  return (
    <>
      <Stagger>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <StaggerItem key={pick(group.title, "en")}>
              <h3 className="label border-line border-t pt-4 text-ink-subtle">
                {pick(group.title, locale)}
              </h3>
              {/* dir="ltr": technology names are Latin in both locales, and
                  entries like "Angular · RxJS" contain a neutral separator
                  the bidi algorithm would otherwise reorder. */}
              <ul dir="ltr" className="mt-5 space-y-2.5 rtl:text-end">
                {group.items.map((item) => (
                  <li key={item} className="text-ink text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </div>
      </Stagger>

      <p className="mt-14 max-w-3xl text-ink-subtle text-sm leading-relaxed">
        <span className="label text-ink-muted">{dictionary.about.alsoWorkedWith} — </span>
        <span dir="ltr">{secondarySkills.join(", ")}.</span>
      </p>
    </>
  );
}

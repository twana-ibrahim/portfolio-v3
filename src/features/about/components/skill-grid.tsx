import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { secondarySkills, skillGroups } from "@/content/skills";

export function SkillGrid() {
  return (
    <>
      <Stagger>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <StaggerItem key={group.title}>
              <h3 className="label border-line border-t pt-4 text-ink-subtle">{group.title}</h3>
              <ul className="mt-5 space-y-2.5">
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
        <span className="label text-ink-muted">Also worked with — </span>
        {secondarySkills.join(", ")}.
      </p>
    </>
  );
}

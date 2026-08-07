import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";
import { TagList } from "@/components/ui/tag";
import { domainLabels } from "@/content/projects";
import type { Project } from "@/content/schema";
import type { Locale } from "@/lib/config/i18n";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { pick } from "@/lib/i18n/localized";
import { localePath } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { ordinal } from "@/lib/utils/format";

/**
 * Resolves where a project row points, if anywhere.
 *
 * Three genuinely different states, and conflating them is the mistake the
 * previous site made — every project looked clickable and none were. A row
 * with nothing to show renders as text, not as a dead link.
 */
function resolveTarget(project: Project, locale: Locale, dictionary: Dictionary) {
  if (project.caseStudy) {
    return {
      kind: "internal",
      href: localePath(locale, `/work/${project.slug}`),
      cta: dictionary.work.readCaseStudy,
    } as const;
  }
  const external = project.links.live ?? project.links.repo;
  if (external) {
    return {
      kind: "external",
      href: external,
      cta: project.links.live ? dictionary.work.visitSite : dictionary.work.viewSource,
    } as const;
  }
  return { kind: "none" } as const;
}

type ProjectRowProps = {
  project: Project;
  index: number;
  locale: Locale;
  dictionary: Dictionary;
};

export function ProjectRow({ project, index, locale, dictionary }: ProjectRowProps) {
  const target = resolveTarget(project, locale, dictionary);
  const interactive = target.kind !== "none";

  const content = (
    <>
      <div className="flex items-baseline gap-5 lg:col-span-1">
        <span dir="ltr" className="label text-ink-subtle tabular-nums">
          {ordinal(index)}
        </span>
      </div>

      <div className="lg:col-span-5">
        <h3
          className={cn(
            "font-medium text-subheading text-ink tracking-tight",
            interactive && "transition-colors duration-fast group-hover:text-accent",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-subtle text-sm">
          <span>{project.client || dictionary.work.personalProject}</span>
          <span aria-hidden className="h-px w-3 bg-line-strong" />
          <span>{pick(domainLabels[project.domain], locale)}</span>
        </p>
      </div>

      <div className="lg:col-span-4">
        <p className="text-ink-muted text-sm leading-relaxed">{pick(project.summary, locale)}</p>
        {/* dir="ltr": every stack entry is a Latin technology name, and the
            hairline separators between them are neutral characters that the
            bidi algorithm reorders inside an RTL paragraph — "React · PWA"
            renders as "PWA · React". Also keeps the label tracking, which the
            RTL rule in globals.css otherwise strips. */}
        <TagList dir="ltr" items={project.stack.slice(0, 4)} className="mt-4" />
      </div>

      <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
        <span dir="ltr" className="label text-ink-subtle tabular-nums">
          {project.year}
        </span>

        {target.kind === "none" ? (
          // Keyed off `confidential`, not off having no link. Three of these
          // are public sites that simply have no URL recorded — badging those
          // "Internal" states something untrue about the client's work.
          project.confidential ? (
            <span className="label inline-flex items-center gap-1.5 text-ink-subtle">
              <Lock size={11} strokeWidth={2} aria-hidden />
              {dictionary.work.internal}
            </span>
          ) : null
        ) : (
          <span className="label inline-flex items-center gap-1.5 text-ink transition-colors duration-fast group-hover:text-accent">
            <span className="hidden sm:inline">{target.cta}</span>
            <ArrowUpRight
              size={14}
              aria-hidden
              className={cn(
                "transition-transform duration-base ease-out-expo",
                // The nudge needs its own RTL variant. `translate` is applied
                // last, in the untransformed frame, so mirroring the glyph
                // does NOT flip which way it drifts — it would have crept
                // right while pointing left.
                "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                "rtl:group-hover:-translate-x-0.5",
                // An arrow that leads away has to point away from the reading
                // direction. Two different mechanisms, because `scale` applies
                // before `rotate`: mirroring an already-rotated glyph lands it
                // somewhere neither side wants.
                target.kind === "internal" ? "rotate-45 rtl:rotate-225" : "rtl:-scale-x-100",
              )}
            />
          </span>
        )}
      </div>
    </>
  );

  /**
   * The grid engages at `lg:`, not `md:`.
   *
   * Twelve columns across a 768px viewport leaves the summary about 190px,
   * which wraps a single sentence to five or six lines against a 92px meta
   * column. Nothing overflowed — it was just cramped, in the band where the
   * row has the least room and the most to say. Staying stacked to 1024 costs
   * height on tablets and buys back a readable measure.
   */
  const layout = "group grid grid-cols-1 items-baseline gap-x-8 gap-y-4 py-8 lg:grid-cols-12";

  /**
   * An accent hairline drawing in across the row's top rule on hover.
   *
   * Same gesture as `link-underline` — draws from the reading edge, same
   * easing — so the site has one idea about what "this responds to you" looks
   * like rather than a different flourish per component. `origin-left` is
   * logical here via the RTL variant: a rule that draws from the left on a
   * right-to-left page starts at the end of the line and reads backwards.
   * Applied only to rows that go somewhere: a dead row that lights up is a
   * promise the markup does not keep. Sits on `-top-px` to cover the li's
   * existing border rather than stack a second line beneath it.
   */
  const hoverRule = cn(
    "relative before:absolute before:inset-x-0 before:-top-px before:h-px",
    "before:origin-left before:scale-x-0 before:bg-accent rtl:before:origin-right",
    "before:transition-transform before:duration-base before:ease-out-expo",
    "hover:before:scale-x-100",
  );

  // The <li> belongs to the caller: a <ul> may only contain <li>, and the
  // stagger wrapper has to *be* that element rather than sit inside it.
  if (target.kind === "internal") {
    return (
      <Link href={target.href} className={cn(layout, hoverRule)}>
        {content}
      </Link>
    );
  }

  if (target.kind === "external") {
    return (
      <a href={target.href} target="_blank" rel="noreferrer" className={cn(layout, hoverRule)}>
        {content}
      </a>
    );
  }

  return <div className={layout}>{content}</div>;
}

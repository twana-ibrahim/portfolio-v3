import { ArrowUpRight, Lock } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { TagList } from "@/components/ui/tag";
import { domainLabels } from "@/content/projects";
import type { Project } from "@/content/schema";
import { cn } from "@/lib/utils/cn";
import { ordinal } from "@/lib/utils/format";

/**
 * Resolves where a project row points, if anywhere.
 *
 * Three genuinely different states, and conflating them is the mistake the
 * previous site made — every project looked clickable and none were. A row
 * with nothing to show renders as text, not as a dead link.
 */
function resolveTarget(project: Project) {
  if (project.caseStudy) {
    return {
      kind: "internal",
      href: `/work/${project.slug}` as Route,
      cta: "Read case study",
    } as const;
  }
  const external = project.links.live ?? project.links.repo;
  if (external) {
    return {
      kind: "external",
      href: external,
      cta: project.links.live ? "Visit site" : "View source",
    } as const;
  }
  return { kind: "none" } as const;
}

type ProjectRowProps = {
  project: Project;
  index: number;
};

export function ProjectRow({ project, index }: ProjectRowProps) {
  const target = resolveTarget(project);
  const interactive = target.kind !== "none";

  const content = (
    <>
      <div className="flex items-baseline gap-5 md:col-span-1">
        <span className="label text-ink-subtle tabular-nums">{ordinal(index)}</span>
      </div>

      <div className="md:col-span-5">
        <h3
          className={cn(
            "font-medium text-subheading text-ink tracking-tight",
            interactive && "transition-colors duration-fast group-hover:text-accent",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-subtle text-sm">
          <span>{project.client || "Personal project"}</span>
          <span aria-hidden className="h-px w-3 bg-line-strong" />
          <span>{domainLabels[project.domain]}</span>
        </p>
      </div>

      <div className="md:col-span-4">
        <p className="text-ink-muted text-sm leading-relaxed">{project.summary}</p>
        <TagList items={project.stack.slice(0, 4)} className="mt-4" />
      </div>

      <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
        <span className="label text-ink-subtle tabular-nums">{project.year}</span>

        {target.kind === "none" ? (
          // Keyed off `confidential`, not off having no link. Three of these
          // are public sites that simply have no URL recorded — badging those
          // "Internal" states something untrue about the client's work.
          project.confidential ? (
            <span className="label inline-flex items-center gap-1.5 text-ink-subtle">
              <Lock size={11} strokeWidth={2} aria-hidden />
              Internal
            </span>
          ) : null
        ) : (
          <span className="label inline-flex items-center gap-1.5 text-ink transition-colors duration-fast group-hover:text-accent">
            <span className="hidden sm:inline">{target.cta}</span>
            <ArrowUpRight
              size={14}
              aria-hidden
              className={cn(
                "transition-transform duration-base ease-out-quart",
                "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                target.kind === "internal" && "rotate-45",
              )}
            />
          </span>
        )}
      </div>
    </>
  );

  const layout = "group grid grid-cols-1 items-baseline gap-x-8 gap-y-4 py-8 md:grid-cols-12";

  /**
   * An accent hairline drawing in across the row's top rule on hover.
   *
   * Same gesture as `link-underline` — draws from the left, same easing — so
   * the site has one idea about what "this responds to you" looks like rather
   * than a different flourish per component. Applied only to rows that go
   * somewhere: a dead row that lights up is a promise the markup does not
   * keep. Sits on `-top-px` to cover the li's existing border rather than
   * stack a second line beneath it.
   */
  const hoverRule = cn(
    "relative before:absolute before:inset-x-0 before:-top-px before:h-px",
    "before:origin-left before:scale-x-0 before:bg-accent",
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

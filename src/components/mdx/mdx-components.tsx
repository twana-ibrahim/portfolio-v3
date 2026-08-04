import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * MDX element map.
 *
 * Styles are written here rather than pulled from @tailwindcss/typography.
 * The typography plugin is excellent for content you do not control; for a
 * handful of case studies it means shipping a large stylesheet and then
 * fighting it with `prose-headings:` overrides to reach the same place. This
 * is roughly the same number of lines and answers to the design tokens.
 */

function Heading2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mt-16 scroll-mt-28 font-medium text-heading text-ink first:mt-0",
        // The autolinked anchor is invisible until the heading is hovered.
        "[&>a]:no-underline [&>a:hover]:text-accent",
        className,
      )}
      {...props}
    />
  );
}

function Heading3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("mt-12 scroll-mt-28 font-medium text-ink text-subheading", className)}
      {...props}
    />
  );
}

function Paragraph({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("mt-6 text-ink-muted leading-[1.75]", className)} {...props} />;
}

function Anchor({ href = "", className, ...props }: ComponentProps<"a">) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn("link-underline text-ink", className)}
      {...props}
    />
  );
}

function List({ className, ...props }: ComponentProps<"ul">) {
  return <ul className={cn("mt-6 space-y-3", className)} {...props} />;
}

function OrderedList({ className, ...props }: ComponentProps<"ol">) {
  return <ol className={cn("mt-6 list-decimal space-y-3 pl-5", className)} {...props} />;
}

function ListItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      className={cn(
        "text-ink-muted leading-relaxed",
        // Hairline dash instead of a bullet, matching the rest of the system.
        "marker:text-ink-subtle [ul>&]:relative [ul>&]:pl-6",
        "[ul>&]:before:absolute [ul>&]:before:top-[0.7em] [ul>&]:before:left-0 [ul>&]:before:h-px [ul>&]:before:w-3 [ul>&]:before:bg-line-strong",
        className,
      )}
      {...props}
    />
  );
}

function Blockquote({ className, ...props }: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-8 border-accent border-l-2 py-1 pl-6 text-ink text-lead italic", className)}
      {...props}
    />
  );
}

function Pre({ className, ...props }: ComponentProps<"pre">) {
  return (
    <pre
      className={cn(
        "mt-8 overflow-x-auto rounded-sm border border-line bg-paper-raised p-5 text-[0.8125rem] leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded-xs bg-paper-raised px-1.5 py-0.5 font-mono text-[0.875em] text-ink",
        // Inside a <pre> the wrapper already handles background and padding.
        "[pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-inherit",
        className,
      )}
      {...props}
    />
  );
}

function Divider() {
  return <hr className="rule mt-14" />;
}

/* ---------------------------------------------------------------------- */
/*  Authoring components — available inside MDX without importing them     */
/* ---------------------------------------------------------------------- */

/**
 * A single hard number, pulled out of the prose.
 *
 * <Metric value="73%" label="faster activation" />
 */
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <span className="my-8 flex flex-col gap-1 border-line border-t pt-5">
      <span className="font-medium text-ink text-title tabular-nums">{value}</span>
      <span className="label text-ink-subtle">{label}</span>
    </span>
  );
}

/** A row of metrics. <Metrics><Metric .../><Metric .../></Metrics> */
function Metrics({ children }: { children: ReactNode }) {
  return <div className="my-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}

/** Screenshot with a caption. Always give it a real alt. */
function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-12">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-sm border border-line"
        sizes="(min-width: 768px) 42rem, 100vw"
      />
      {caption ? <figcaption className="label mt-4 text-ink-subtle">{caption}</figcaption> : null}
    </figure>
  );
}

/** Aside for constraints, trade-offs and things that went wrong. */
function Note({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-10 border-line border-t bg-paper-raised px-6 py-6">
      {title ? <p className="label text-ink-subtle">{title}</p> : null}
      <div className="[&>p:first-child]:mt-0">{children}</div>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: Anchor,
  ul: List,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  pre: Pre,
  code: InlineCode,
  hr: Divider,
  Metric,
  Metrics,
  Figure,
  Note,
};

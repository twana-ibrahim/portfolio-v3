import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A single technology or attribute. Intentionally plain — no pill, no fill,
 * no colour. Tags are metadata, and metadata should never outrank the title
 * it sits beneath.
 */
export function Tag({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("label text-ink-subtle", className)} {...props} />;
}

/** Renders a stack list with hairline separators rather than bullet dots. */
export function TagList({
  items,
  className,
  ...props
}: ComponentProps<"ul"> & { items: readonly string[] }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-1.5", className)} {...props}>
      {items.map((item, index) => (
        <Tag key={item} className="flex items-center gap-3">
          {index > 0 ? <span className="h-px w-3 bg-line-strong" aria-hidden /> : null}
          {item}
        </Tag>
      ))}
    </ul>
  );
}

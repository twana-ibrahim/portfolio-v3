import type { ComponentProps, ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils/cn";

type SectionProps = Omit<ComponentProps<"section">, "title"> & {
  /** Eyebrow text, e.g. "Selected work". Rendered as a mono uppercase label. */
  label: string;
  /** Right-aligned counterpart to the label: a count, a year range, a link. */
  meta?: ReactNode;
  /** Set false for sections that should not draw the top hairline. */
  rule?: boolean;
};

/**
 * The repeating unit of the page.
 *
 * Structure is a hairline rule, then a label/meta row, then content. Every
 * section on the site uses it, which is what produces the steady vertical
 * rhythm the Swiss direction depends on. Sections do not set their own
 * vertical padding — spacing is the layout's job, not the content's.
 */
export function Section({ label, meta, rule = true, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-20 md:py-28 lg:py-36", className)} {...props}>
      <Container>
        {rule ? <hr className="rule" /> : null}

        <header className="mt-5 flex items-baseline justify-between gap-6">
          <h2 className="label text-ink-subtle">{label}</h2>
          {meta ? <div className="label text-ink-subtle">{meta}</div> : null}
        </header>

        <div className="mt-10 md:mt-14">{children}</div>
      </Container>
    </section>
  );
}

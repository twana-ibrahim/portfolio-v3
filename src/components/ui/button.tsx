import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Sharp corners, no gradients, no shadows on hover. In an editorial system the
 * button is a block of ink: the block itself never moves, and colour does the
 * work.
 *
 * The icon is the one exception, and it is a consistency fix rather than a
 * new idea. Every link on this site already nudges its arrow on hover; a
 * button that sat perfectly still next to them read as the less responsive
 * control, which is backwards for the primary action on the page. Same
 * distance and same easing as the links, so it is the existing gesture rather
 * than a second one.
 */
const button = cva(
  [
    "relative isolate overflow-hidden",
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-tight",
    "transition-colors duration-base ease-out-expo",

    /**
     * The fill sweeps in from the left and, on leave, continues out to the
     * right rather than retreating the way it came. That is the whole trick,
     * and it is one property: the origin flips between the two states, so the
     * same scaleX animation reads as "enter" one way and "exit" the other.
     *
     * `isolate` keeps the -z-10 behind the label but inside the button's own
     * stacking context, so it cannot fall behind the page.
     */
    "before:absolute before:inset-0 before:-z-10 before:bg-[var(--btn-fill)]",
    "before:origin-right before:scale-x-0",
    "before:transition-transform before:duration-base before:ease-out-expo",
    "hover:before:origin-left hover:before:scale-x-100",

    "[&_svg]:transition-transform [&_svg]:duration-base [&_svg]:ease-out-expo",
    "hover:[&_svg]:translate-x-0.5",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /**
         * Each variant only has to name the colour that sweeps in; the base
         * owns the mechanism. `hover:bg-*` is gone deliberately — animating the
         * background and sweeping a fill over it at once produces two
         * different colours arriving at two different speeds.
         */
        solid: "bg-ink text-paper [--btn-fill:var(--accent)] hover:text-accent-ink",
        /** Reserved for the single most important action on a page. */
        accent: "bg-accent text-accent-ink [--btn-fill:var(--accent-hover)]",
        outline:
          "border border-line-strong text-ink [--btn-fill:var(--ink)] hover:border-ink hover:text-paper",
        /** No fill: a ghost with a sweeping block behind it is not a ghost. */
        ghost: "text-ink-muted hover:text-ink",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button> & {
    /**
     * Render the child element instead of a <button>, keeping the styles.
     * Use for links: <Button asChild><Link href="/work">Work</Link></Button>.
     * This is what keeps navigation semantically an anchor.
     */
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";
  return <Component className={cn(button({ variant, size }), className)} {...props} />;
}

export { button as buttonVariants };

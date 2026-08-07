import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A block of ink: sharp corners, no gradients, and the block never moves —
 * colour does the work. The icon nudge is the exception, matching the distance
 * and easing every link already uses so it is one gesture, not two.
 */
const button = cva(
  [
    "relative isolate overflow-hidden",
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-tight",
    "transition-colors duration-base ease-out-expo",

    /**
     * The fill sweeps in from the reading edge and continues out the far side
     * on leave rather than retreating — one scaleX animation, with the origin
     * flipping between states. `origin-*` is physical with no logical
     * equivalent, so the RTL variants swap both ends or the gesture runs
     * against the reader's eye. `isolate` keeps the -z-10 inside the button's
     * own stacking context.
     */
    "before:absolute before:inset-0 before:-z-10 before:bg-[var(--btn-fill)]",
    "before:origin-right before:scale-x-0 rtl:before:origin-left",
    "before:transition-transform before:duration-base before:ease-out-expo",
    "hover:before:origin-left hover:before:scale-x-100 rtl:hover:before:origin-right",

    // `translate` resolves in the untransformed frame, so an RTL variant is
    // required — a mirrored icon still drifts right without one.
    "[&_svg]:transition-transform [&_svg]:duration-base [&_svg]:ease-out-expo",
    "hover:[&_svg]:translate-x-0.5 rtl:hover:[&_svg]:-translate-x-0.5",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /* Variants name only the colour that sweeps in; the base owns the
           mechanism. No `hover:bg-*` — animating the background *and* sweeping
           a fill gives two colours arriving at two speeds. */
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
    /** Renders the child instead of a <button>, so navigation stays an
     *  anchor: <Button asChild><Link href="/work">Work</Link></Button>. */
    asChild?: boolean;
  };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";
  return <Component className={cn(button({ variant, size }), className)} {...props} />;
}

export { button as buttonVariants };

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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-tight",
    "transition-colors duration-fast ease-out-expo",
    "[&_svg]:transition-transform [&_svg]:duration-fast [&_svg]:ease-out-expo",
    "hover:[&_svg]:translate-x-0.5",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        /** Default call to action: inverted block. */
        solid: "bg-ink text-paper hover:bg-accent hover:text-accent-ink",
        /** Reserved for the single most important action on a page. */
        accent: "bg-accent text-accent-ink hover:bg-accent-hover",
        outline:
          "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper",
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

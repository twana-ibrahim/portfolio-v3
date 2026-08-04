import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, taught about this project's custom theme scales.
 *
 * Without this it cannot tell a custom font size from a custom text colour —
 * both look like `text-<something>` — so it files them in the same conflict
 * group and keeps only whichever came last. `cn("text-heading text-ink")`
 * silently became `text-ink`, and the heading rendered at body size.
 *
 * That failed quietly: no error, no warning, just an h2 the same size as its
 * paragraphs. Every token added to the `--text-*` or `--ease-*` namespace in
 * tokens.css must be listed here too. The test beside this file guards it.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      // Font sizes from `--text-*` in tokens.css.
      text: ["display", "title", "heading", "subheading", "lead", "body", "meta"],
      // Easings from `--ease-*`.
      ease: ["out-expo", "out-quart", "in-out-quart"],
    },
    classGroups: {
      // `duration-*` tokens are declared as @utility in globals.css rather than
      // as theme values, because Tailwind v4 has no --duration-* namespace.
      duration: [{ duration: ["instant", "fast", "base", "slow", "reveal"] }],
    },
  },
});

/**
 * Merge conditional class names, with later Tailwind utilities winning over
 * earlier conflicting ones. This is what lets every component accept a
 * `className` override without variant styles fighting the caller.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

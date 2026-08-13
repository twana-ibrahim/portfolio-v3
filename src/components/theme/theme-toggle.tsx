"use client";

import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils/cn";

/**
 * Theme switch.
 *
 * The resolved theme is only known on the client, so the icons render in a
 * neutral state until mount. Both icons are always in the DOM and cross-fade —
 * swapping the element would cause a layout flash and lose the button's focus.
 *
 * The change sweeps out from this button across the whole page. The geometry is
 * only knowable at click time, so the keyframes are built here and handed
 * straight to the pseudo-element; `globals.css` owns everything static about
 * it — stacking, blend mode, and suppressing the UA's crossfade.
 */
export function ThemeToggle({
  dictionary,
  className,
}: {
  dictionary: Dictionary;
  className?: string;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const button = buttonRef.current;
    const root = document.documentElement;

    /**
     * Firefox before 144 and Safari before 18 have no View Transition API, and
     * a reduced-motion request outranks the effect entirely. Both land on the
     * instant swap, which is what this button did before.
     */
    if (reduced || !button || typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    /**
     * Distance to the furthest viewport corner. Anything shorter leaves a
     * wedge of the outgoing theme alive when the animation ends; anything
     * longer spends the tail of a linear sweep travelling past the edge of the
     * screen, which reads as the animation hanging. `clientWidth` rather than
     * `innerWidth` for that second reason — `innerWidth` counts the scrollbar,
     * which is not part of the snapshot.
     */
    const radius = Math.hypot(
      Math.max(x, root.clientWidth - x),
      Math.max(y, root.clientHeight - y),
    );

    /**
     * A stylesheet with the geometry already substituted, rather than the two
     * tidier options — and both of those were tried and shipped broken first.
     *
     * Keyframes in `globals.css` reading `--theme-origin-*` off `<html>` is the
     * version that belongs in a design system, and it swept from the middle of
     * the screen on a machine that was not mine: the `::view-transition-*` tree
     * inherits from the document element in theory, and a `var()` that arrives
     * unresolved falls back in silence. `element.animate(…, { pseudoElement })`
     * fixes that and is Chromium-only for these pseudo-elements, so it trades
     * one browser's bug for another's absent feature.
     *
     * Literal values in a real stylesheet need neither. Every engine that can
     * run a view transition can run a CSS animation on it, the duration stays a
     * token instead of a number parsed out of one, and if this rule somehow
     * does not apply the UA's own crossfade is still there underneath — a
     * plainer change rather than a wrong one.
     */
    const sheet = document.createElement("style");
    sheet.textContent = `
      @keyframes theme-sweep {
        from { clip-path: circle(0px at ${x}px ${y}px); }
        to { clip-path: circle(${radius}px at ${x}px ${y}px); }
      }
      ::view-transition-new(root) {
        animation: theme-sweep var(--duration-slow) linear;
      }
    `;
    document.head.append(sheet);

    /**
     * next-themes writes the class from an effect, so without `flushSync` the
     * callback returns before the DOM changes and the API snapshots the same
     * theme twice — a 700ms pause, then an instant swap.
     */
    const transition = document.startViewTransition(() => flushSync(() => setTheme(next)));

    // Both arms: `finished` rejects when a second click skips this transition.
    const drop = () => sheet.remove();
    transition.finished.then(drop, drop);
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? isDark
            ? dictionary.a11y.switchToLight
            : dictionary.a11y.switchToDark
          : dictionary.a11y.switchTheme
      }
      className={cn(
        "relative grid size-9 place-items-center rounded-xs text-ink-muted",
        "transition-colors duration-fast hover:text-ink",
        className,
      )}
    >
      <Sun
        aria-hidden
        strokeWidth={1.5}
        className={cn(
          "absolute size-[18px] transition-all duration-base ease-out-expo",
          isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        aria-hidden
        strokeWidth={1.5}
        className={cn(
          "absolute size-[18px] transition-all duration-base ease-out-expo",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Theme switch.
 *
 * The resolved theme is only known on the client, so the icons render in a
 * neutral state until mount. Both icons are always in the DOM and cross-fade —
 * swapping the element would cause a layout flash and lose the button's focus.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"}
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
          "absolute size-[18px] transition-all duration-base ease-out-quart",
          isDark ? "scale-75 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      />
      <Moon
        aria-hidden
        strokeWidth={1.5}
        className={cn(
          "absolute size-[18px] transition-all duration-base ease-out-quart",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}

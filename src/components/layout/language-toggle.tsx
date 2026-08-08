"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { type Locale, localeMeta, locales } from "@/lib/config/i18n";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { swapLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";

type LanguageToggleProps = {
  locale: Locale;
  dictionary: Dictionary;
  className?: string;
};

/**
 * Both languages with the current one lit, like a tab bar. A lone "English" on
 * a Kurdish page reads equally as a label for where you are and a link to
 * where you are not — the first reaction it got was "why is the Kurdish site
 * in English?".
 *
 * Links, not buttons: middle-click, open-in-new-tab, and a Kurdish page that
 * is crawlable from the English one. Each label is in its own language.
 */
export function LanguageToggle({ locale, dictionary, className }: LanguageToggleProps) {
  const pathname = usePathname();

  /**
   * Query and hash, carried across the switch. From `window.location` rather
   * than `useSearchParams()`, which opts its whole route out of static
   * generation without its own Suspense boundary — and this renders in every
   * page's header. Pre-hydration the href is the clean path, which is what a
   * crawler should follow anyway.
   */
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    // Compared, not just depended on: a navigation updates `pathname` and
    // `window.location` in separate steps, so reading location blind can
    // append the previous page's query to the next page's href.
    const { pathname: settled, search, hash } = window.location;
    setSuffix(settled === pathname ? search + hash : "");
  }, [pathname]);

  return (
    // A labelled <nav>, so assistive tech says what the pair does before
    // reading out two language names.
    <nav aria-label={dictionary.a11y.switchLanguage} className={cn("flex items-center", className)}>
      {locales.map((candidate, index) => {
        const meta = localeMeta[candidate];
        const isCurrent = candidate === locale;

        return (
          <Fragment key={candidate}>
            {index > 0 ? <span aria-hidden className="h-3 w-px shrink-0 bg-line-strong" /> : null}

            {isCurrent ? (
              // Not a link. Linking the page to itself is a dead control, and
              // `aria-current` is what actually communicates "you are here".
              <span
                aria-current="true"
                lang={meta.htmlLang}
                className="label grid h-9 place-items-center px-2 text-ink"
              >
                {meta.label}
              </span>
            ) : (
              <Link
                href={swapLocale(pathname, candidate, suffix)}
                // Same page, another language — not a new destination. Without
                // this Next scrolls to the top and the reader loses their
                // place. Position lands close, not exact: the Kurdish pages
                // run a couple of hundred pixels shorter.
                scroll={false}
                // Tells assistive tech and search engines that the destination
                // is in a different language from the page linking to it.
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                className="label grid h-9 place-items-center px-2 text-ink-subtle transition-colors duration-fast ease-out-expo hover:text-ink"
              >
                {meta.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}

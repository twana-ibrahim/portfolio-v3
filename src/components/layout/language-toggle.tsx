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
 * Language switch.
 *
 * Shows BOTH languages with the current one lit, rather than only the one you
 * would switch to. The single-label version was genuinely ambiguous: a lone
 * "English" sitting on a Kurdish page reads just as easily as a label for the
 * page you are on as a link to the page you are not — and the first reaction
 * it got was "why is the Kurdish site in English?". Two items with one active
 * cannot be misread; it is the same reason a tab bar shows every tab.
 *
 * Links, not buttons — they navigate, and a button would cost middle-click,
 * open-in-new-tab, and the ability to see where it goes. It also means the
 * Kurdish page is crawlable from the English one, which a JS toggle is not.
 *
 * Each label is written in its own language. "Kurdish" spelled in English is
 * for people who already read English, which is exactly the audience that does
 * not need the switch.
 */
export function LanguageToggle({ locale, dictionary, className }: LanguageToggleProps) {
  const pathname = usePathname();

  /**
   * Query string and hash, carried across the switch.
   *
   * Read from `window.location` after mount rather than via
   * `useSearchParams()`. That hook opts its whole route out of static
   * generation unless it sits inside its own Suspense boundary, and this
   * component renders in the header of every page — the cost would be the
   * entire site going dynamic to preserve a query string nothing sets yet.
   *
   * Before hydration the href is the clean path, which is the correct thing
   * for a crawler to follow anyway. The hash comes free: it never reaches the
   * server, so this is the only place it could have come from.
   */
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    // Compared, not just depended on. A client-side navigation updates
    // `pathname` and `window.location` in separate steps, so reading location
    // blind can append the *previous* page's query to the next page's href.
    // If they disagree, the navigation has not settled and there is nothing
    // worth carrying yet.
    const { pathname: settled, search, hash } = window.location;
    setSuffix(settled === pathname ? search + hash : "");
  }, [pathname]);

  return (
    // A labelled <nav>, not a div with role="group": this is a set of links
    // that navigate, which is what nav is for, and the label means assistive
    // tech says what the pair does before reading out two language names.
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

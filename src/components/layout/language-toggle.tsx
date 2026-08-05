"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
 * A link, not a button — it navigates, and rendering it as a button would
 * cost middle-click, open-in-new-tab and the ability to see where it goes.
 * It also means the Kurdish page is crawlable from the English one, which a
 * JS-driven toggle would not give.
 *
 * Each label is written in its own language. "Kurdish" spelled in English is
 * for people who already read English, which is exactly the audience that
 * does not need the switch.
 */
export function LanguageToggle({ locale, dictionary, className }: LanguageToggleProps) {
  const pathname = usePathname();
  const other = locales.find((candidate) => candidate !== locale) ?? locale;
  const meta = localeMeta[other];

  return (
    <Link
      href={swapLocale(pathname, other)}
      // Tells assistive tech and search engines that the destination is in a
      // different language from the page linking to it.
      hrefLang={meta.htmlLang}
      lang={meta.htmlLang}
      aria-label={`${dictionary.a11y.switchLanguage} — ${meta.label}`}
      className={cn(
        "label grid h-9 place-items-center px-2 text-ink-muted",
        "transition-colors duration-fast ease-out-expo hover:text-ink",
        className,
      )}
    >
      {meta.label}
    </Link>
  );
}

/**
 * Locale configuration.
 *
 * Two locales, and they are not mirror images of each other. English is the
 * default because the audience that decides — recruiters and remote clients —
 * reads English. Kurdish is not a translation layer bolted onto that; it is
 * the version a Kurdish reader gets, and it is allowed to say things
 * differently where saying the same thing would land wrong.
 */

export const locales = ["en", "ku"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type LocaleMeta = {
  /** Written in its own language, never in English. */
  label: string;
  /** `lang` attribute. `ckb` is Central Kurdish (Sorani) — `ku` alone is the macrolanguage. */
  htmlLang: string;
  dir: "ltr" | "rtl";
  /** Drives Intl formatting for dates and numbers. */
  intlLocale: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: {
    label: "English",
    htmlLang: "en",
    dir: "ltr",
    intlLocale: "en-GB",
  },
  ku: {
    label: "کوردی",
    /**
     * `ckb` rather than `ku`. Sorani and Kurmanji are different enough in
     * script and grammar that tagging this page `ku` tells a screen reader and
     * a search engine less than nothing — Kurmanji is written in Latin script.
     */
    htmlLang: "ckb",
    dir: "rtl",
    intlLocale: "ckb-IQ",
  },
};

export function isRtl(locale: Locale): boolean {
  return localeMeta[locale].dir === "rtl";
}

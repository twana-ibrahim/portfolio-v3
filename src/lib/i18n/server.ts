import { lang } from "next/root-params";
import { defaultLocale, isLocale, type Locale } from "@/lib/config/i18n";
import { type Dictionary, getDictionary } from "./dictionary";

/**
 * The current locale, for any Server Component.
 *
 * `next/root-params` getters are module imports rather than props, so a
 * component nested six levels below the page can read the locale without it
 * being threaded through every component in between. That is the whole reason
 * the locale segment sits above the root layout.
 *
 * Falls back rather than throwing: `lang()` is `string | undefined` because
 * TypeScript cannot know the segment always resolves, and a 404 rendering in
 * English is better than a 404 that crashes.
 */
export async function getLocale(): Promise<Locale> {
  const current = await lang();
  return current && isLocale(current) ? current : defaultLocale;
}

/**
 * Locale and UI strings together, since almost nothing needs only one.
 *
 * Client Components cannot call this — `next/root-params` is server-only — so
 * they take `locale` and `dictionary` as props from the nearest server parent.
 */
export async function getTranslations(): Promise<{ locale: Locale; dictionary: Dictionary }> {
  const locale = await getLocale();
  return { locale, dictionary: await getDictionary(locale) };
}

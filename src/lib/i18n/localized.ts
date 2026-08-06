import type { Locale } from "@/lib/config/i18n";

/**
 * A content value that exists in every locale.
 *
 * Deliberately `Record<Locale, T>` rather than an optional map with an English
 * fallback. A fallback is how a site ends up half-translated in production
 * without anyone noticing — the missing string simply renders in English and
 * nothing fails. With this, adding a locale is a type error in every content
 * file until each one has actually been written.
 */
export type Localized<T> = Record<Locale, T>;

/**
 * Reads the current locale's value.
 *
 * A standalone function taking the locale, rather than a closure bound to it
 * and returned from `getTranslations()`. The bound version reads better at the
 * call site and is a trap: it would be the one thing in scope that cannot be
 * passed to a Client Component, and the failure ("Functions cannot be passed
 * directly to Client Components") does not name the function that caused it.
 */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

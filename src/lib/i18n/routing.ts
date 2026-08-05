import type { Route } from "next";
import type { Locale } from "@/lib/config/i18n";

/**
 * Prefixes an app path with its locale.
 *
 * Every route now lives under `/[lang]`, so no component may write a bare
 * `href="/work"` — it would 404 through the proxy on every request.
 *
 * The cast is unavoidable and deliberate: `typedRoutes` can only verify a
 * literal, and this builds the path at runtime from a locale it cannot know.
 * Confined to this one function so the cast exists once rather than at every
 * call site, and the `AppPath` union keeps the *unprefixed* half checked —
 * a typo in "/about" still fails to compile.
 */
export type AppPath = "/" | "/work" | "/about" | "/contact" | `/work/${string}`;

export function localePath(locale: Locale, path: AppPath): Route {
  return (path === "/" ? `/${locale}` : `/${locale}${path}`) as Route;
}

/**
 * The same page in the other locale, for the language toggle and hreflang.
 * Strips whatever locale prefix is on the current pathname and applies the
 * requested one, so switching language holds your place on the site.
 */
export function swapLocale(pathname: string, next: Locale): Route {
  const withoutLocale = pathname.replace(/^\/(en|ku)(?=\/|$)/, "");
  return `/${next}${withoutLocale}` as Route;
}

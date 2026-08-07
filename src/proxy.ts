import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale, locales } from "@/lib/config/i18n";

/**
 * Remembers the locale the visitor last actually read.
 *
 * The language toggle is a plain `<Link>` — deliberately, so it is crawlable
 * and middle-clickable — which means no client code runs when it is used.
 * Recording the choice here instead: navigating to a locale-prefixed path *is*
 * the choice, whether it came from the toggle or from a shared link.
 *
 * Without it, `Accept-Language` won every time. A Kurdish-browser visitor
 * could click "English", then return to the bare domain later and be sent
 * straight back to Kurdish — the site overruling them, repeatedly, with no way
 * for them to win.
 */
const LOCALE_COOKIE = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Locale negotiation.
 *
 * Every route now lives under `/[lang]`, so a bare `/work` has to be sent
 * somewhere. The choice comes from `Accept-Language`, falling back to English —
 * the audience that decides reads English, and guessing Kurdish for someone
 * whose browser never asked for it is worse than the reverse.
 *
 * Hand-rolled rather than pulling in Negotiator and intl-localematcher. Two
 * locales, neither with regional variants, is a `startsWith` — those libraries
 * earn their weight at ten locales with quality weights and script subtags,
 * not at two.
 */
function negotiate(request: NextRequest): Locale {
  // An explicit choice outranks what the browser was configured with, and
  // outranks it permanently. This is the whole point of the cookie.
  const remembered = request.cookies.get(LOCALE_COOKIE)?.value;
  if (remembered && isLocale(remembered)) return remembered;

  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag = "", q = "q=1"] = part.trim().split(";");
      return { tag: tag.trim().toLowerCase(), q: Number(q.replace("q=", "")) || 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    // `ckb` is Central Kurdish; `ku` is the macrolanguage. Browsers send either,
    // and a Sorani speaker should not land on English because of the subtag.
    if (tag === "ku" || tag.startsWith("ku-") || tag === "ckb" || tag.startsWith("ckb-")) {
      return "ku";
    }
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const active = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (active) {
    // Only write when it actually changes. Setting a cookie on every request
    // would attach Set-Cookie to responses that are otherwise plain cache
    // hits, for no gain.
    if (request.cookies.get(LOCALE_COOKIE)?.value === active) return;

    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, active, {
      maxAge: ONE_YEAR,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const locale = negotiate(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // 307, not 308. The target depends on a cookie and a request header, so
  // caching it permanently would pin the first visitor's language onto every
  // later one behind the same CDN node.
  const redirect = NextResponse.redirect(url, 307);
  // Says out loud what the response varies on. 307 is not cacheable by default
  // without explicit headers, so this is belt-and-braces — but the cost of a
  // shared cache getting this wrong is every visitor seeing one stranger's
  // language, which is worth a header to prevent.
  redirect.headers.set("Vary", "Accept-Language, Cookie");
  return redirect;
}

export const config = {
  /**
   * Skips Next internals and anything with a file extension. `sitemap.xml`,
   * `robots.txt`, the OG image and the CV are not localized routes and must
   * not be prefixed.
   */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale, locales } from "@/lib/config/i18n";

/**
 * Remembers the locale last read. The toggle is a plain `<Link>` so nothing
 * client-side runs when it is used — navigating here *is* the choice.
 *
 * Without it `Accept-Language` won every time, so a Kurdish-browser visitor
 * could click "English" and be sent back to Kurdish on their next visit.
 */
const LOCALE_COOKIE = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Every route lives under `/[lang]`, so a bare `/work` has to go somewhere.
 * Falls back to English: guessing Kurdish for a browser that never asked is
 * worse than the reverse.
 *
 * Hand-rolled rather than Negotiator plus intl-localematcher — those earn
 * their weight at ten locales with quality weights, not at two.
 */
function negotiate(request: NextRequest): Locale {
  // An explicit choice outranks the browser's configuration, permanently.
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
    // Only on change: otherwise every plain cache hit carries a Set-Cookie.
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

  // 307, not 308: the target depends on a cookie and a header, so caching it
  // permanently would pin one visitor's language onto everyone behind the same
  // CDN node. Vary says so explicitly, in case anything caches it anyway.
  const redirect = NextResponse.redirect(url, 307);
  redirect.headers.set("Vary", "Accept-Language, Cookie");
  return redirect;
}

export const config = {
  /** Skips Next internals and anything with an extension — sitemap.xml,
   *  robots.txt, the OG image and the CV must not be locale-prefixed. */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

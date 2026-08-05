import { type NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/config/i18n";

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
function negotiate(request: NextRequest): string {
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

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = negotiate(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // 307, not 308. The redirect depends on a request header, so caching it
  // permanently would pin the first visitor's language onto every later one
  // behind the same CDN node.
  return NextResponse.redirect(url, 307);
}

export const config = {
  /**
   * Skips Next internals and anything with a file extension. `sitemap.xml`,
   * `robots.txt`, the OG image and the CV are not localized routes and must
   * not be prefixed.
   */
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

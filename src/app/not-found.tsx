import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import Link from "next/link";
import { defaultLocale, localeMeta, locales } from "@/lib/config/i18n";
import { getDictionary } from "@/lib/i18n/dictionary";
import "@/styles/globals.css";

/**
 * The site's 404, and the only one that renders.
 *
 * It lives at the app root rather than at `[lang]/`, which is the whole fix.
 * With `[lang]` as a root-param segment Next registers a not-found boundary
 * only here — the build emits `/_not-found` and never `/[lang]/_not-found` —
 * so the `[lang]/not-found.tsx` this replaces was never once rendered. Every
 * 404 fell through to Next's built-in error shell: a blank white page, no
 * chrome and no way back, on every mistyped URL.
 *
 * It renders the whole document itself, fonts and stylesheet included, because
 * nothing above it does. `[lang]/layout.tsx` owns `<html>` for real routes and
 * never applies to a route that did not match, so a 404 that leans on it gets
 * no CSS at all — which is how the first version of this file shipped
 * unstyled: correct text, raw HTML.
 *
 * Both languages, rather than a guess. The segment that carries the locale is
 * precisely the thing that failed to match, so there is no honest way to pick
 * one — and a visitor who reads only one of the two should not have to work
 * out which half is theirs.
 */
const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const kurdish = Vazirmatn({ variable: "--font-kurdish", subsets: ["arabic"], display: "swap" });

export default async function NotFound() {
  const dictionaries = await Promise.all(locales.map((locale) => getDictionary(locale)));

  return (
    <html
      lang={localeMeta[defaultLocale].htmlLang}
      className={`${sans.variable} ${mono.variable} ${kurdish.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col justify-center gap-14 bg-paper px-6 py-24 antialiased md:px-16">
        {/* dir="ltr": "404" is a Latin numeral and belongs on the reading edge
            of the Latin block; the Kurdish block below sets its own. */}
        <p dir="ltr" className="label text-accent">
          404
        </p>

        <div className="flex flex-col gap-12 md:flex-row md:gap-20">
          {locales.map((locale, index) => {
            const dictionary = dictionaries[index];
            if (!dictionary) return null;
            const meta = localeMeta[locale];

            return (
              <div key={locale} lang={meta.htmlLang} dir={meta.dir} className="max-w-sm flex-1">
                <h1 className="text-heading text-ink">{dictionary.notFound.title}</h1>
                <p className="mt-4 text-ink-muted">{dictionary.notFound.body}</p>

                {/* Two, because the copy above says "everything that does
                    exist is one of these" — one link makes that a lie, and
                    these are genuinely the two places worth going. */}
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  <Link
                    href={`/${locale}`}
                    hrefLang={meta.htmlLang}
                    className="link-underline text-ink"
                  >
                    {dictionary.notFound.backHome}
                  </Link>
                  <Link
                    href={`/${locale}/work`}
                    hrefLang={meta.htmlLang}
                    className="link-underline text-ink-muted"
                  >
                    {dictionary.work.allWork}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </body>
    </html>
  );
}

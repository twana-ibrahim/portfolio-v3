import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import Link from "next/link";
import { defaultLocale, localeMeta, locales } from "@/lib/config/i18n";
import { getDictionary } from "@/lib/i18n/dictionary";
import "@/styles/globals.css";

/**
 * The site's 404, and the only one that renders.
 *
 * `global-not-found` rather than `not-found`, which is the whole fix. With
 * `[lang]` as a root-param segment there is no plain root layout to compose a
 * 404 inside — the build emits `/_not-found` and never `/[lang]/_not-found`,
 * so the `[lang]/not-found.tsx` this started as was never once rendered, and
 * every mistyped URL fell through to Next's built-in error shell: a blank
 * white page, no chrome, no way back.
 *
 * Moving it to `app/not-found.tsx` got the markup rendering but not the
 * document: with no root layout of its own to live in, Next generated a bare
 * `<html><body>` around it and this file's own `<html>` landed *inside* that
 * one. Nested document tags are a parse error, and every attribute on them —
 * `lang`, `dir`, the font variables, the flex centring — depends on browser
 * error recovery to survive. `global-not-found` is the documented convention
 * for exactly this shape (a root layout behind a top-level dynamic segment);
 * it skips app rendering entirely and owns the whole document, which is why
 * the fonts and the stylesheet are imported here rather than inherited.
 *
 * Both languages, rather than a guess. The segment that carries the locale is
 * precisely the thing that failed to match, so there is no honest way to pick
 * one — and a visitor who reads only one of the two should not have to work
 * out which half is theirs.
 */
const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const kurdish = Vazirmatn({ variable: "--font-kurdish", subsets: ["arabic"], display: "swap" });

/** Bilingual for the same reason the body is. Next adds `noindex` itself. */
export async function generateMetadata(): Promise<Metadata> {
  const dictionaries = await Promise.all(locales.map((locale) => getDictionary(locale)));
  const titles = dictionaries.map((dictionary) => dictionary.notFound.title);

  return { title: `404 · ${titles.join(" · ")}` };
}

export default async function GlobalNotFound() {
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

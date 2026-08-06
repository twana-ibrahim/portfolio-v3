import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Vazirmatn } from "next/font/google";
import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { isLocale, localeMeta, locales } from "@/lib/config/i18n";
import { getDictionary } from "@/lib/i18n/dictionary";
import { SiteJsonLd } from "@/lib/seo/json-ld";
import { createMetadata } from "@/lib/seo/metadata";
import "@/styles/globals.css";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * Sorani coverage.
 *
 * Geist has no Arabic script at all, so the Kurdish pages would fall back to
 * whatever the OS supplies — which on Windows is usually a Persian face with
 * the wrong shapes for ڕ ڵ ۆ ێ, the four letters that make Kurdish look
 * Kurdish rather than Persian. Vazirmatn covers them, is variable, and is
 * OFL-licensed.
 *
 * Loaded for both locales rather than conditionally: it is one subset, and a
 * conditional font swap on the language toggle is a flash for no gain.
 */
const kurdish = Vazirmatn({
  variable: "--font-kurdish",
  subsets: ["arabic"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const current = await lang();
  if (!current || !isLocale(current)) return createMetadata();
  return createMetadata({ locale: current });
}

export const viewport: Viewport = {
  themeColor: [
    // Tracks --paper. Both are matte now; a brighter bar above a matte page
    // is the seam that gives away a themed browser chrome.
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#111110" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const current = await lang();
  if (!current || !isLocale(current)) notFound();

  const { dir, htmlLang } = localeMeta[current];
  const dictionary = await getDictionary(current);

  return (
    // suppressHydrationWarning is required by next-themes: it writes the theme
    // class onto <html> before React hydrates, which is intentionally a mismatch.
    <html
      lang={htmlLang}
      dir={dir}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable} ${kurdish.variable} h-full`}
      data-locale={current}
    >
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main"
            // inset-s-4 is the logical inset: top-left in English, top-right
            // in Kurdish, without a direction-specific override.
            className="label sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-100 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
          >
            {dictionary.a11y.skipToContent}
          </a>
          {children}
        </ThemeProvider>
        <SiteJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

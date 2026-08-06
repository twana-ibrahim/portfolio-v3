import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { defaultLocale, type Locale, localeMeta, locales } from "@/lib/config/i18n";
import { SITE_URL, siteConfig } from "@/lib/config/site";
import { interpolate } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import { yearsSince } from "@/lib/utils/format";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  /** Route-relative path, e.g. "/work/fast-sim". Used for the canonical URL. */
  path?: string;
  /** Drives the canonical prefix, og:locale, the hreflang set and the copy. */
  locale?: Locale;
  /** Absolute or root-relative image URL. Defaults to the generated OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/** Maps a locale to the underscore form Open Graph expects. */
const OG_LOCALE: Record<Locale, string> = { en: "en_GB", ku: "ckb_IQ" };

/**
 * Single entry point for page metadata.
 *
 * Pages never hand-roll openGraph/twitter blocks — they call this. That is what
 * guarantees every route ends up with a canonical URL, an OG image and a
 * correctly formatted title, instead of whichever fields were remembered.
 */
export function createMetadata({
  title,
  description,
  path = "/",
  locale = defaultLocale,
  image,
  type = "website",
  publishedTime,
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  /** "/" must not become "/en/" — a trailing slash forks the canonical URL. */
  const localized = (target: Locale) => `${SITE_URL}/${target}${path === "/" ? "" : path}`;
  const url = localized(locale);

  /**
   * Every locale points at every other, plus x-default. Without x-default a
   * search engine has to guess which version to show someone whose language
   * is neither, and it guesses badly.
   */
  const languages = Object.fromEntries([
    ...locales.map((candidate) => [localeMeta[candidate].htmlLang, localized(candidate)]),
    ["x-default", localized(defaultLocale)],
  ]);

  const name = pick(profile.name, locale);
  const resolvedTitle = title ? `${title} — ${name}` : `${name} — ${pick(profile.role, locale)}`;
  const resolvedDescription =
    description ??
    interpolate(pick(profile.summary, locale), { years: yearsSince(siteConfig.careerStart) });
  const ogImage = image ?? `${SITE_URL}/opengraph-image`;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url, languages },
    authors: [{ name, url: SITE_URL }],
    creator: name,
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: name,
      locale: OG_LOCALE[locale],
      images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
      ...(siteConfig.twitterHandle ? { creator: siteConfig.twitterHandle } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
  };
}

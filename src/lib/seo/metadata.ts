import type { Metadata } from "next";
import { defaultLocale, type Locale, localeMeta, locales } from "@/lib/config/i18n";
import { SITE_URL, siteConfig } from "@/lib/config/site";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  /** Route-relative path, e.g. "/work/fast-sim". Used for the canonical URL. */
  path?: string;
  /** Drives the canonical prefix, og:locale, and the hreflang set. */
  locale?: Locale;
  /** Absolute or root-relative image URL. Defaults to the generated OG image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

const DEFAULT_DESCRIPTION = siteConfig.summary;

/**
 * Single entry point for page metadata.
 *
 * Pages never hand-roll openGraph/twitter blocks — they call this. That is what
 * guarantees every route ends up with a canonical URL, an OG image and a
 * correctly formatted title, instead of whichever fields were remembered.
 */
export function createMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
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
  const resolvedTitle = title
    ? `${title} — ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.role}`;
  const ogImage = image ?? `${SITE_URL}/opengraph-image`;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description,
    alternates: { canonical: url, languages },
    authors: [{ name: siteConfig.name, url: SITE_URL }],
    creator: siteConfig.name,
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description,
      siteName: siteConfig.name,
      locale: locale === "ku" ? "ckb_IQ" : "en_GB",
      images: [{ url: ogImage, width: 1200, height: 630, alt: resolvedTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
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

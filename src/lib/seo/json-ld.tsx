import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";
import { defaultLocale, type Locale, localeMeta } from "@/lib/config/i18n";
import { SITE_URL, siteConfig } from "@/lib/config/site";
import { interpolate } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import { getLocale } from "@/lib/i18n/server";
import { yearsSince } from "@/lib/utils/format";

/**
 * Structured data.
 *
 * This is what lets Google render a knowledge panel for a name rather than a
 * plain blue link, and it is the cheapest SEO win available to a personal site.
 * Built from the same content the page renders, so the two cannot disagree.
 *
 * The `@id` values are deliberately NOT locale-scoped. This is one person and
 * one website; emitting `#person` twice under different ids would tell a search
 * engine there are two Twana Ibrahims. The prose inside varies by locale, the
 * identity does not.
 */
function personSchema(locale: Locale) {
  const employer = experience.find((role) => role.end === null);
  const description = interpolate(pick(profile.summary, locale), {
    years: yearsSince(siteConfig.careerStart),
  });

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: pick(profile.name, locale),
    // The Latin spelling stays discoverable on the Kurdish page: it is what
    // anyone typing this name into a search box will use.
    ...(locale === defaultLocale ? {} : { alternateName: pick(profile.name, defaultLocale) }),
    url: SITE_URL,
    jobTitle: pick(profile.role, locale),
    description,
    email: `mailto:${siteConfig.contact.email}`,
    telephone: siteConfig.contact.phoneHref,
    address: {
      "@type": "PostalAddress",
      // English in every locale. A postal address is machine-readable data
      // consumed by services that have no Kurdish, not display copy.
      addressLocality: pick(profile.location.city, defaultLocale),
      addressRegion: pick(profile.location.region, defaultLocale),
      addressCountry: "IQ",
    },
    ...(employer ? { worksFor: { "@type": "Organization", name: employer.company } } : {}),
    alumniOf: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: pick(entry.institution, locale),
    })),
    knowsAbout: skillGroups.flatMap((group) => group.items),
    knowsLanguage: ["ckb", "en"],
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
  };
}

function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${pick(profile.name, locale)} — ${pick(profile.role, locale)}`,
    description: interpolate(pick(profile.summary, locale), {
      years: yearsSince(siteConfig.careerStart),
    }),
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

/**
 * Renders one JSON-LD block. Safe because the payload is built from our own
 * typed content, never from user input — the only reason `dangerouslySet` is
 * acceptable here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has no other insertion mechanism in React, and the payload is entirely first-party typed content — never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export async function SiteJsonLd() {
  const locale = await getLocale();

  return (
    <>
      <JsonLd data={personSchema(locale)} />
      <JsonLd data={websiteSchema(locale)} />
    </>
  );
}

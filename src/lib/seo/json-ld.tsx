import { education, experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { SITE_URL, siteConfig } from "@/lib/config/site";

/**
 * Structured data.
 *
 * This is what lets Google render a knowledge panel for a name rather than a
 * plain blue link, and it is the cheapest SEO win available to a personal site.
 * Built from the same content the page renders, so the two cannot disagree.
 */
function personSchema() {
  const employer = experience.find((role) => role.end === null);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: siteConfig.name,
    url: SITE_URL,
    jobTitle: siteConfig.role,
    description: siteConfig.summary,
    email: `mailto:${siteConfig.contact.email}`,
    telephone: siteConfig.contact.phoneHref,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: "IQ",
    },
    ...(employer ? { worksFor: { "@type": "Organization", name: employer.company } } : {}),
    alumniOf: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.institution,
    })),
    knowsAbout: skillGroups.flatMap((group) => group.items),
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
  };
}

function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.summary,
    inLanguage: "en",
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

export function SiteJsonLd() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
    </>
  );
}

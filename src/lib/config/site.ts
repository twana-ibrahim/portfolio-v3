/**
 * Locale-independent facts. No component hardcodes a URL, email or path.
 *
 * Sentences live in `content/profile.ts` instead: this file is `as const`,
 * which freezes every string to its own literal type — right for an email
 * address, and what makes a second locale impossible to assign.
 */

import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { AppPath } from "@/lib/i18n/routing";

/** Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is attached. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://twana-ibrahim.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  url: SITE_URL,

  /** Wordmark fallback. Latin in both locales — it is a monogram, not a word. */
  initials: "TI",

  /** Earlier than the first paid role (2021-10) on purpose. Drives both the
   *  hero stat and the `{years}` token in the copy. */
  careerStart: "2021-01",

  /** IANA zone — drives the live local-time readout in the footer. */
  timezone: "Asia/Baghdad",

  contact: {
    email: "tuwana.ibrahim99@gmail.com",
    phone: "+964 770 672 4292",
    /** tel: href — digits only, no spaces. */
    phoneHref: "+9647706724292",
  },

  socials: {
    github: "https://github.com/twana-ibrahim",
    linkedin: "https://www.linkedin.com/in/twana-ibrahim-92057915b",
  },

  /** Lives in /public. Renamed from the original to keep the URL clean. */
  resumePath: "/twana-ibrahim-cv.pdf",

  /** Twitter-card fallback author handle; null renders no twitter:creator. */
  twitterHandle: null as string | null,
} as const;

/**
 * Order here is order on screen. "Home" is explicit rather than left to the
 * wordmark: the mobile dialog covers the wordmark entirely, so without it
 * there is no way back to the front page from inside the menu.
 */
export const navigation = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const satisfies readonly { href: AppPath; key: keyof Dictionary["nav"] }[];

export type NavItem = (typeof navigation)[number];

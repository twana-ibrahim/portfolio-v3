/**
 * Every locale-independent fact about the person this site is for.
 *
 * Rule: no component hardcodes a URL, email, handle or path. If it appears in
 * the UI and it is about Twana rather than about layout, it comes from here —
 * or, if it is a sentence rather than a fact, from `src/content/profile.ts`.
 *
 * The split is not cosmetic. This file is `as const`, which freezes every
 * string to its own literal type; that is exactly what you want for an email
 * address and exactly what makes a second locale impossible to assign. So
 * anything that has to exist in two languages lives in `content/` instead,
 * where it is Zod-parsed and a missing translation fails the build.
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

  /**
   * When the clock starts for the "years shipping" figure.
   *
   * Earlier than the first paid role (2021-10) on purpose: 2021 was spent
   * learning the stack that role was hired for. Change this one date and both
   * the hero stat and the `{years}` token in the copy follow.
   */
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
 * Primary navigation. Order here is order on screen, desktop and mobile.
 *
 * "Home" is listed explicitly rather than left to the wordmark. The logo is
 * only a home link to people who already know that convention, and on mobile
 * the dialog covers the wordmark entirely — so without this there is no way
 * back to the front page from inside the menu.
 */
export const navigation = [
  { href: "/", key: "home" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const satisfies readonly { href: AppPath; key: keyof Dictionary["nav"] }[];

export type NavItem = (typeof navigation)[number];

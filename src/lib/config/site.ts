/**
 * Every fact about the person this site is for lives here.
 *
 * Rule: no component hardcodes a name, URL, email, or handle. If it appears in
 * the UI and it is about Twana rather than about layout, it comes from here.
 * Swapping the domain, the email, or the tagline is then a one-file change.
 */

import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { AppPath } from "@/lib/i18n/routing";

/** Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is attached. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://twana-ibrahim.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  url: SITE_URL,

  name: "Twana Ibrahim",
  initials: "TI",
  /** Matches the CV header exactly. Change both together or neither. */
  role: "Software Engineer (Frontend)",

  /**
   * When the clock starts for the "years shipping" figure.
   *
   * Earlier than the first paid role (2021-10) on purpose: 2021 was spent
   * learning the stack that role was hired for. Change this one date and the
   * hero stat follows.
   */
  careerStart: "2021-01",

  /** One line, used in the header meta and structured data. */
  tagline: "Frontend engineer building the internal systems banks and operators run on.",

  /**
   * The hero statement.
   *
   * Concrete on purpose. "Passionate developer crafting beautiful digital
   * experiences" describes nobody; naming the customer and what is at stake
   * describes exactly one person. The emphasis line is the only place the
   * serif appears on the page, so it has to carry the specificity.
   */
  headline: {
    lead: "I build the systems",
    emphasis: "banks and operators",
    // Short on purpose. Each line is its own clipped box in the hero's mask
    // reveal, so a line that wraps breaks the effect. "run their business on"
    // wrapped at 1440px; this fits, and reads harder besides.
    trail: "run on.",
  },

  /** Two or three sentences maximum. Anything longer belongs on /about. */
  summary:
    "Five years of frontend work on software other businesses depend on to operate — digital banking, telecom sales, streaming and advertising, identity and access management. Mostly React and TypeScript, mostly systems where being right matters more than being pretty.",

  location: {
    city: "Kalar",
    region: "Sulaymaniyah",
    country: "Iraq",
    /** IANA zone — drives the live local-time readout in the footer. */
    timezone: "Asia/Baghdad",
  },

  availability: {
    status: "open",
    label: "Available for work",
    /**
     * Roles, not engagements. The career is five years of employment at
     * companies, not a freelance book — leading with "contract" invites
     * questions about a track record that is not there, and undersells the
     * one that is.
     */
    detail: "Open to remote roles, GMT+3",
  },

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

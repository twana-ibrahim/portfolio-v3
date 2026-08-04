/**
 * Every fact about the person this site is for lives here.
 *
 * Rule: no component hardcodes a name, URL, email, or handle. If it appears in
 * the UI and it is about Twana rather than about layout, it comes from here.
 * Swapping the domain, the email, or the tagline is then a one-file change.
 */

/** Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is attached. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://twana-ibrahim.vercel.app"
).replace(/\/$/, "");

export const siteConfig = {
  url: SITE_URL,

  name: "Twana Ibrahim",
  initials: "TI",
  role: "Software Engineer",

  /** One line, used in the header meta and structured data. */
  tagline: "Software engineer building telecom and enterprise systems.",

  /**
   * The hero statement. Deliberately concrete — it names the domain and the
   * scale, because "passionate developer building beautiful experiences"
   * is indistinguishable from every other portfolio on the internet.
   */
  headline: {
    lead: "I build the systems",
    emphasis: "telecom operators",
    trail: "run their business on.",
  },

  /** Two or three sentences maximum. Anything longer belongs on /about. */
  summary:
    "Five years shipping production software for telecom operators, government bodies and NGOs across Iraq — SIM and eSIM sales platforms, streaming services, identity providers and internal tooling. I care about the parts users never see: correctness, load behaviour, and code that the next engineer can change without fear.",

  location: {
    city: "Erbil",
    region: "Kurdistan Region",
    country: "Iraq",
    /** IANA zone — drives the live local-time readout in the footer. */
    timezone: "Asia/Baghdad",
  },

  availability: {
    status: "open",
    label: "Available for work",
    detail: "Open to remote and contract engagements",
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

  /** Dropped into /public. Named with the year so it is obvious when stale. */
  resumePath: "/twana-ibrahim-cv.pdf",

  /** Twitter-card fallback author handle; null renders no twitter:creator. */
  twitterHandle: null as string | null,
} as const;

/** Primary navigation. Order here is order on screen, desktop and mobile. */
export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export type NavItem = (typeof navigation)[number];

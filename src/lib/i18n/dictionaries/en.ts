/**
 * English UI strings.
 *
 * This file is the shape. `ku.ts` satisfies the same type, so a missing key is
 * a compile error rather than an English word appearing mid-sentence on a
 * Kurdish page.
 *
 * Only chrome lives here — navigation, labels, form copy, section headings.
 * The portfolio's actual content (project summaries, experience highlights,
 * the bio) is localized where it is authored, in `src/content`, because a
 * project summary is content and not an interface string.
 *
 * DATA ONLY, NO FUNCTIONS. The dictionary crosses into client components, and
 * a function cannot be serialized across that boundary — it fails at build
 * with "Functions cannot be passed directly to Client Components", which is a
 * confusing way to learn it. Values with a variable use a `{count}` token and
 * `interpolate()`; values that inflect use `{ one, other }` and `plural()`.
 */
export const en = {
  /**
   * Separator for inline pairs like "Kalar, Iraq".
   *
   * Kurdish uses the Arabic comma (U+060C). A Latin comma in RTL text is a
   * neutral character, so the bidi algorithm parks it on the wrong side of the
   * word and it reads as a stray mark.
   */
  listSeparator: ", ",

  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main",
    footerNav: "Footer",
    mobileNav: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navigationDialog: "Navigation",
    switchTheme: "Switch theme",
    switchToDark: "Switch to dark theme",
    switchToLight: "Switch to light theme",
    switchLanguage: "Switch language",
    home: "home",
  },

  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    contact: "Contact",
  },

  home: {
    selectedWork: "Selected work",
    getInTouch: "Get in touch",
    allProjects: "All {count} projects",
    experience: "Experience",
    yearsShipping: "Years shipping",
    projectsDelivered: "Projects delivered",
    industries: "Industries",
  },

  work: {
    eyebrow: "Work",
    readCaseStudy: "Read case study",
    visitSite: "Visit site",
    viewSource: "View source",
    internal: "Internal",
    personalProject: "Personal project",
    projectCount: { one: "1 project", other: "{count} projects" },
    allWork: "All work",
    client: "Client",
    role: "Role",
    year: "Year",
    read: "Read",
    readingMinutes: "{count} min",
    withheld: "Internal system — screenshots and links withheld",
    /** Keys are the `arrangement` enum in content/schema.ts. */
    arrangement: {
      remote: "Remote",
      "on-site": "On-site",
      hybrid: "Hybrid",
    },
  },

  about: {
    eyebrow: "About",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
    capabilities: "Capabilities",
    whatIReachFor: "What I reach for",
    fullHistory: "Full history",
    downloadCv: "Download CV",
    // "Present" is not here on purpose — it belongs to the same vocabulary as
    // the month names, and lib/utils/format.ts owns that. Two sources for one
    // calendar is how a date range ends up half-translated.
    alsoWorkedWith: "Also worked with",
    /** Renders under a company whose name changed mid-tenure. */
    formerly: "Formerly {name}",
    /** Keys are the `level` enum in content/schema.ts. */
    languageLevels: {
      Native: "Native",
      Professional: "Professional",
      "Limited working": "Limited working",
      Elementary: "Elementary",
    },
  },

  contact: {
    eyebrow: "Contact",
    direct: "Direct",
    where: "Where",
    email: "Email",
    phone: "Phone",
    name: "Name",
    company: "Company",
    message: "Message",
    optional: "Optional",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "Where you work",
    messagePlaceholder: "What are you building, and where do you need help?",
    send: "Send message",
    sending: "Sending…",
    sendingAnnouncement: "Sending your message",
    orEmail: "Or email",
    sent: "Message sent.",
    sentBody: "Thanks for reaching out — I read everything and usually reply within a day or two.",
    ctaLabel: "Start a conversation",

    /**
     * Read by a stranger who has just been told they did something wrong, so
     * they say what to do rather than what failed.
     *
     * These live in the dictionary rather than in the Zod schema because the
     * Server Action that parses the form cannot call `next/root-params` — the
     * locale arrives as a form field, and the schema is built per request from
     * whichever of these two sets it selects.
     */
    validation: {
      name: "Please enter your name.",
      nameTooLong: "That name is longer than this form supports.",
      email: "Please enter an email address I can reply to.",
      message: "A little more detail helps — 20 characters minimum.",
      messageTooLong: "That is longer than this form accepts. Email me directly instead.",
      checkFields: "Please check the fields below.",
      failed: "Something went wrong sending that. Email me directly at {email}.",
    },
  },

  footer: {
    pages: "Pages",
    elsewhere: "Elsewhere",
    localTime: "local",
    builtWith: "Next.js · TypeScript · Tailwind",
  },

  notFound: {
    title: "This page does not exist.",
    body: "The link may be out of date, or the page may have been removed. Everything that does exist is one of these.",
    backHome: "Back to home",
  },
};

/**
 * No `as const`. It would make every value a literal type — `skipToContent`
 * would be typed `"Skip to content"` rather than `string` — and the Kurdish
 * dictionary could then never satisfy it. Keys are what needs enforcing here;
 * values are content.
 */
export type Dictionary = typeof en;

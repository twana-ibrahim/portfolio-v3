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
    present: "Present",
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
  },

  footer: {
    pages: "Pages",
    elsewhere: "Elsewhere",
    localTime: "local",
    builtWith: "Next.js · TypeScript · Tailwind",
  },

  notFound: {
    code: "404",
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

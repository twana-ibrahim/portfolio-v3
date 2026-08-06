import type { Localized } from "@/lib/i18n/localized";
import { parseProjects } from "./schema";

/**
 * THE WORK.
 *
 * Ordered newest first. `featured: true` promotes a project to the home page —
 * keep that to four. Everything else lives on /work.
 *
 * Summaries say what the software *did* and who used it. No adjectives, no
 * "cutting-edge", no "seamless". A reader deciding whether to interview you
 * wants the noun and the verb; everything else is noise they have read a
 * hundred times today.
 *
 * ── ON THE KURDISH SUMMARIES ────────────────────────────────────────────────
 * Not translations. The two audiences do not know the same things, so the two
 * versions do not say the same things.
 *
 * An English reader has never heard of Fastlink, so the summary has to carry
 * the category — "telecom sales" — to mean anything. A Kurdish reader has a
 * Fastlink SIM in their pocket, so spending words on the category is spending
 * them on what they already know. The Kurdish text uses that room for the part
 * they cannot guess: what the thing actually did, in concrete nouns.
 *
 * The same trade runs the other way for `mytv-plus-app`, where the English
 * says "content delivery ecosystem" and the Kurdish says "the small screen and
 * the big one" — because to someone who has used MyTV+, that is the whole
 * distinction, and it is a sentence rather than a diagram.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ── STILL NEEDED ────────────────────────────────────────────────────────────
 * `metrics` are empty everywhere. This is the single highest-value thing you
 * can add: users, agents, records, transactions/day, load time before and
 * after. Left blank rather than guessed — a wrong figure in an interview is
 * far worse than no figure. Years are inferred from the employment timeline
 * and are worth a check.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** The four role strings that repeat, so a wording change happens once. */
const FRONTEND = {
  en: "Frontend Developer",
  ku: "گەشەپێدەری Frontend",
};

const PERSONAL = {
  en: "Personal project",
  ku: "پڕۆژەی کەسی",
};

export const projects = parseProjects([
  {
    slug: "fib",
    title: "FIB",
    client: "First Iraqi Bank",
    year: 2026,
    summary: {
      en: "Customer-facing features for a digital bank, built against a regulated backend where validation, access control and an auditable trail are requirements.",
      ku: "ئەو بەشانەی بانکی دیجیتاڵ کە کڕیار خۆی بەکاریان دەهێنێت — لەسەر سیستەمێک کە پشکنینی داتا، کۆنترۆڵی دەستڕاگەیشتن و تۆماری هەموو کردارێکی تێدا مەرجن.",
    },
    role: FRONTEND,
    domain: "fintech",
    surface: "web-app",
    stack: ["React", "TypeScript", "Next.js", "Design systems"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: false,
  },
  {
    slug: "fast-sim-pwa",
    title: "Fast SIM",
    client: "Fastlink Telecom",
    year: 2024,
    summary: {
      en: "Digitised telecom sales covering physical SIM and eSIM workflows, with custom filtering, reporting and real-time agent management.",
      ku: "سیستەمی فرۆشتنی SIM و eSIM بۆ نوێنەرەکان: داواکاری، چالاککردن، فلتەری تایبەت، ڕاپۆرت و بەڕێوەبردنی نوێنەران بە کاتی ڕاستەقینە.",
    },
    role: FRONTEND,
    domain: "telecom",
    surface: "pwa",
    stack: ["React", "TypeScript", "PWA", "TanStack Query", "Role-based access"],
    metrics: [],
    confidential: true,
    featured: true,
    // Was true, with a template at case-studies/fast-sim-pwa.mdx. Removed in
    // favour of no case study at all: the work here was spec-and-ticket
    // delivery, so the decision narrative the format needs would have had to
    // be invented. Template recoverable at commit a85418b.
    caseStudy: false,
  },
  {
    slug: "fast-sim-web",
    title: "Fast SIM Portal",
    client: "Fastlink Telecom",
    year: 2024,
    summary: {
      en: "Back-office portal where dealers and distributors manage agents, allocate stock and report across the whole sales network.",
      ku: "پۆرتاڵی ناوخۆیی کە فرۆشیار و دابەشکەرەکان نوێنەرەکانیان پێ بەڕێوە دەبەن، کۆگا دابەش دەکەن و ڕاپۆرتی تۆڕی فرۆشتن بە تەواوی دەبینن.",
    },
    role: FRONTEND,
    domain: "telecom",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "Data tables"],
    confidential: true,
  },
  {
    slug: "smart-offers",
    title: "Smart Offers",
    client: "Fastlink Telecom",
    year: 2024,
    summary: {
      en: "Targeted marketing system with geo-fencing — builds subscriber offers by segment and location, then tracks take-up per campaign.",
      ku: "سیستەمی پێشکەشکراوی ئامانجدار بەپێی ناوچە — پێشنیار بۆ بەشێکی دیاریکراوی بەکارهێنەران دروست دەکات و وەڵامدانەوەی هەر هەڵمەتێک دەپێوێت.",
    },
    role: FRONTEND,
    domain: "telecom",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "Geo-fencing"],
    confidential: true,
  },
  {
    slug: "fast-serve",
    title: "Fast Serve",
    client: "Fastlink Telecom",
    year: 2024,
    summary: {
      en: "Restaurant and inventory management: menus, orders, stock levels and daily reconciliation in a single operations console.",
      ku: "بەڕێوەبردنی چێشتخانە و کۆگا: مێنیو، داواکاری، ئاستی کۆگا و لێکدانەوەی ڕۆژانە، هەمووی لە یەک شوێندا.",
    },
    role: FRONTEND,
    domain: "hospitality",
    surface: "web-app",
    stack: ["React", "TypeScript", "Zustand", "TailwindCSS"],
    confidential: true,
  },
  {
    slug: "mytv-plus-app",
    title: "MyTV+",
    client: "Gateway ICT",
    year: 2023,
    summary: {
      en: "Streaming interfaces for web and television, covering live channels, films and series across the MyTV+ content delivery ecosystem.",
      ku: "ڕووکاری ستریمینگ بۆ وێب و تەلەفزیۆن — کەناڵی ڕاستەوخۆ، فیلم و زنجیرە، لەسەر شاشەی بچووک و گەورە بە یەک ئەزموون.",
    },
    role: FRONTEND,
    domain: "media",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "TV interfaces"],
    metrics: [],
    confidential: true,
    featured: true,
    // Flip to true once src/content/case-studies/mytv-plus-app.mdx exists.
    caseStudy: false,
  },
  {
    slug: "mytv-plus-ads",
    title: "MyTV+ Ads Platform",
    client: "Gateway ICT",
    year: 2023,
    summary: {
      en: "Advertising operations console covering ad inventory, brand partnerships and campaign execution against streaming channels.",
      ku: "سیستەمی بەڕێوەبردنی ڕیکلام: شوێنی ڕیکلام، هاوبەشی براندەکان و جێبەجێکردنی هەڵمەت بەسەر کەناڵە ستریمینگەکاندا.",
    },
    role: FRONTEND,
    domain: "media",
    surface: "platform",
    stack: ["React", "TypeScript", "TanStack Query"],
    confidential: true,
  },
  {
    slug: "hotel-system",
    title: "Hotel System",
    client: "Gateway ICT",
    year: 2023,
    summary: {
      en: "Hotel management platform for rooms, guests and billing, integrated with in-room MyTV+ content delivery.",
      ku: "پلاتفۆرمی بەڕێوەبردنی هوتێل بۆ ژوور، میوان و حیساب، بەستراوە بە خزمەتگوزاری MyTV+ ی ناو ژوورەکان.",
    },
    role: FRONTEND,
    domain: "hospitality",
    surface: "web-app",
    stack: ["React", "TypeScript", "MaterialUI"],
    confidential: true,
  },
  {
    slug: "mytv-plus-website",
    title: "MyTV+ Brand Site",
    client: "Gateway ICT",
    year: 2023,
    summary: {
      en: "Public marketing site for the MyTV+ service, presenting packages and subscription plans with scroll-led motion.",
      ku: "ماڵپەڕی فەرمی MyTV+ — پاکێج و پلانەکانی بەشداری پیشان دەدات، بە جووڵەیەک کە بە سکڕۆڵی بەکارهێنەر دەبزوێت.",
    },
    role: FRONTEND,
    domain: "media",
    surface: "website",
    stack: ["Next.js", "React", "GSAP", "TailwindCSS"],
  },
  {
    slug: "heart-beats",
    title: "Heart Beats",
    client: "Heart Beats",
    year: 2023,
    summary: {
      en: "Brand and services site for a healthcare provider, covering treatments, clinicians and patient enquiries.",
      ku: "ماڵپەڕی ناوەندێکی تەندروستی: چارەسەرەکان، پزیشکەکان و داواکاری نەخۆشەکان.",
    },
    role: FRONTEND,
    domain: "healthcare",
    surface: "website",
    stack: ["React", "TypeScript", "SASS"],
  },
  {
    slug: "authentication-server",
    title: "Authentication Server",
    client: "iQ Group",
    year: 2022,
    summary: {
      en: "Identity and access management for a family of internal products: registration, role-based access control and granular per-resource permissions.",
      ku: "بەڕێوەبردنی ناسنامە و دەستڕاگەیشتن بۆ کۆمەڵێک بەرنامەی ناوخۆیی: خۆتۆمارکردن، دەستڕاگەیشتن بەپێی ڕۆڵ، و مۆڵەتی ورد بۆ هەر سەرچاوەیەک.",
    },
    role: {
      en: "Frontend Developer — console and auth flows",
      ku: "گەشەپێدەری Frontend — کۆنسۆڵ و پرۆسەکانی چوونەژوورەوە",
    },
    domain: "identity",
    surface: "platform",
    stack: ["Angular", "TypeScript", "RxJS", "RBAC", "REST APIs"],
    metrics: [],
    confidential: true,
    featured: true,
    // Flip to true once src/content/case-studies/authentication-server.mdx exists.
    caseStudy: false,
  },
  {
    slug: "ksc-system",
    title: "KSC System",
    client: "iQ Group",
    year: 2022,
    summary: {
      en: "Mission-critical platform for multi-branch operations — case management, funder relations and event coordination for an NGO.",
      ku: "پلاتفۆرمی سەرەکی ڕێکخراوێکی نافەرمی بە چەند لقەوە — بەڕێوەبردنی دۆسیە، پەیوەندی لەگەڵ پاڵپشتان و ڕێکخستنی چالاکییەکان.",
    },
    role: FRONTEND,
    domain: "ngo",
    surface: "platform",
    stack: ["Angular", "TypeScript", "RxJS", "MaterialUI"],
    confidential: true,
  },
  {
    slug: "government-report-system",
    title: "Government Report System",
    client: "iQ Group",
    year: 2022,
    summary: {
      en: "Internal regional analytics tool — structured data collection and aggregated reporting for recharge and subscription workflows.",
      ku: "ئامرازی شیکاری ناوخۆیی بۆ ناوچەکان — کۆکردنەوەی داتای ڕێکخراو و ڕاپۆرتی گشتی بۆ شەحنکردن و بەشداری.",
    },
    role: FRONTEND,
    domain: "government",
    surface: "web-app",
    stack: ["Angular", "TypeScript", "RxJS", "SCSS"],
    confidential: true,
  },
  {
    slug: "mashqi-hawina",
    title: "Mashqi Hawina",
    client: "Salahaddin University",
    year: 2021,
    summary: {
      en: "Placement platform matching university students to internships, with application tracking for students and host organisations.",
      ku: "پلاتفۆرمێک کە قوتابی زانکۆ بە شوێنی مەشقی هاوینە دەگەیەنێت، لەگەڵ بەدواداچوونی داواکاری بۆ قوتابی و لایەنی میوانداری.",
    },
    // Named as coursework rather than as a client engagement. It is real work
    // and it predates the first job, so calling it "Frontend Developer" next
    // to a university's name reads as something it was not.
    role: {
      en: "Final-year university project",
      ku: "پڕۆژەی ساڵی کۆتایی زانکۆ",
    },
    domain: "education",
    surface: "web-app",
    stack: ["React", "JavaScript", "Redux"],
  },
  {
    slug: "movie-app",
    title: "Movie App",
    client: "",
    year: 2026,
    summary: {
      en: "React Native client for browsing current cinema releases, with search, detail views and cached results.",
      ku: "ئەپێکی مۆبایل بۆ گەڕان بەناو فیلمە نوێیەکانی سینەمادا — گەڕان، وردەکاری و کاشکردنی ئەنجامەکان.",
    },
    role: PERSONAL,
    domain: "personal",
    surface: "mobile",
    stack: ["React Native", "Expo", "TypeScript", "TanStack Query"],
    links: { repo: "https://github.com/twana-ibrahim/movie-app" },
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    client: "",
    year: 2025,
    summary: {
      en: "React Native social app with dynamic feeds, image posting, notifications and the usual engagement mechanics.",
      ku: "ئەپێکی سۆشیاڵ بە React Native: فیدی جووڵاو، بڵاوکردنەوەی وێنە، ئاگادارکردنەوە و کارلێکی نێوان بەکارهێنەران.",
    },
    role: PERSONAL,
    domain: "personal",
    surface: "mobile",
    stack: ["React Native", "Expo", "TypeScript", "Convex"],
    links: { repo: "https://github.com/twana-ibrahim/spotlight-app" },
  },
]);

/** Home page selection. Ordered as authored, capped defensively. */
export const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/**
 * Human-readable industry labels, used wherever a project is listed.
 *
 * Kept here rather than in the UI dictionary: this is the vocabulary of the
 * content, and the enum it keys off lives in this folder. A label that drifts
 * from its enum should be one file to fix, not two.
 */
export const domainLabels: Record<(typeof projects)[number]["domain"], Localized<string>> = {
  telecom: { en: "Telecom", ku: "تەلەکۆم" },
  fintech: { en: "Banking", ku: "بانک" },
  media: { en: "Streaming", ku: "ستریمینگ" },
  identity: { en: "Identity", ku: "ناسنامە" },
  government: { en: "Government", ku: "حکومی" },
  healthcare: { en: "Healthcare", ku: "تەندروستی" },
  hospitality: { en: "Hospitality", ku: "میوانداری" },
  ngo: { en: "NGO", ku: "ڕێکخراو" },
  education: { en: "Education", ku: "پەروەردە" },
  personal: { en: "Personal", ku: "کەسی" },
};

/** Distinct industries shipped into — the "six industries" stat on the hero. */
export const industryCount = new Set(
  projects.filter((project) => project.domain !== "personal").map((project) => project.domain),
).size;

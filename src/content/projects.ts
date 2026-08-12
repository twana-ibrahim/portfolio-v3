import type { Localized } from "@/lib/i18n/localized";
import { parseProjects } from "./schema";

/**
 * Newest first. `featured: true` promotes to the home page — keep it to four.
 * Summaries name what the software did and who used it, with no adjectives.
 *
 * The Kurdish is not a translation. English has to carry the category
 * ("telecom sales") because Fastlink means nothing to that reader; Kurdish
 * spends those words on what the thing actually did instead, since the
 * category is already known.
 *
 * STILL NEEDED: `metrics` are empty everywhere, and are the highest-value
 * thing left to add. Blank rather than guessed — a wrong figure in an
 * interview is worse than none. Years are inferred and worth a check.
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
    slug: "fib-backoffice",
    title: "FIB BackOffice",
    client: "First Iraqi Bank",
    year: 2026,
    summary: {
      en: "The bank's central hub for managing and monitoring FIB data and users — data management, system oversight and user administration, reachable only over a provided VPN.",
      ku: "ناوەندی سەرەکی بانک بۆ بەڕێوەبردن و چاودێریکردنی داتا و بەکارهێنەرانی FIB — بەڕێوەبردنی داتا، سەرپەرشتی سیستەم و کارگێڕی بەکارهێنەران، تەنها لە ڕێگەی VPN ـێکی دیاریکراوەوە دەستی پێ دەگات.",
    },
    role: FRONTEND,
    domain: "fintech",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "SASS"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: false,
  },
  {
    slug: "fib-business",
    title: "FIB Business",
    client: "First Iraqi Bank",
    year: 2026,
    summary: {
      en: "Administration dashboard for FIB Business — the internal console behind the bank's business banking product.",
      ku: "داشبۆردی کارگێڕی بۆ \u2066FIB Business\u2069 — ئەو کۆنسۆڵە ناوخۆییەی لە پشت بەرهەمی بانکی بازرگانییەوەیە.",
    },
    role: FRONTEND,
    domain: "fintech",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "SASS"],
    confidential: true,
  },
  {
    slug: "fib-corporate",
    title: "FIB Corporate",
    client: "First Iraqi Bank",
    year: 2026,
    summary: {
      en: "Administration dashboard for FIB Corporate — the internal console behind the bank's corporate banking product.",
      ku: "داشبۆردی کارگێڕی بۆ \u2066FIB Corporate\u2069 — ئەو کۆنسۆڵە ناوخۆییەی لە پشت بەرهەمی بانکی کۆرپۆرەیتەوەیە.",
    },
    role: FRONTEND,
    domain: "fintech",
    surface: "web-app",
    stack: ["React", "JavaScript", "Redux", "SASS"],
    confidential: true,
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
    stack: ["React", "TypeScript", "PWA", "Role-based access"],
    metrics: [],
    confidential: true,
    featured: true,
    // No case study: the work was spec-and-ticket delivery, so the decision
    // narrative the format needs would have had to be invented. Old template
    // is at commit a85418b.
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
    stack: ["React", "TypeScript", "Redux Toolkit"],
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
    stack: ["React", "TypeScript", "Redux Toolkit"],
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
    stack: ["React", "TypeScript", "Redux Toolkit", "MaterialUI"],
    confidential: true,
  },
  {
    slug: "mytv-plus-app",
    /* "App" and not the bare product name, which reads as the service beside
       "MyTV+ Ads Platform" and "MyTV+ Brand Site". It also fixes a bidi bug:
       titles render without an isolate, so a Latin run *ending* in "+" showed
       as "+MyTV" on /ku. A trailing word puts the plus between two Latin runs,
       where it stays put. */
    title: "MyTV+ App",
    client: "Gateway ICT",
    year: 2025,
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
    slug: "mytv-plus-ims",
    title: "MyTV+ IMS",
    client: "Gateway ICT",
    year: 2025,
    summary: {
      en: "Information management system for MyTV+ — the internal, web-based console where the team organises and publishes everything the streaming service serves to its apps.",
      ku: "سیستەمی بەڕێوەبردنی زانیاری بۆ \u2066MyTV+\u2069 — ئەو کۆنسۆڵە ناوخۆییەی لەسەر وێب، کە تیمەکە ناوەڕۆکی خزمەتگوزارییەکەی پێ ڕێک دەخات و بڵاو دەکاتەوە.",
    },
    role: FRONTEND,
    domain: "media",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "MaterialUI"],
    confidential: true,
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
    stack: ["React", "JavaScript", "Redux"],
    confidential: true,
  },
  {
    slug: "hotel-system",
    title: "Hotel System",
    client: "Gateway ICT",
    year: 2023,
    summary: {
      en: "Hotel management platform for rooms, guests and billing, integrated with in-room MyTV+ content delivery.",
      ku: "پلاتفۆرمی بەڕێوەبردنی هوتێل بۆ ژوور، میوان و حیساب، بەستراوە بە خزمەتگوزاری \u2066MyTV+\u2069 ی ناو ژوورەکان.",
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
    year: 2025,
    summary: {
      en: "Public marketing site for the MyTV+ service, presenting packages and subscription plans with scroll-led motion.",
      ku: "ماڵپەڕی فەرمی \u2066MyTV+\u2069 — پاکێج و پلانەکانی بەشداری پیشان دەدات، بە جووڵەیەک کە بە سکڕۆڵی بەکارهێنەر دەبزوێت.",
    },
    role: FRONTEND,
    domain: "media",
    surface: "website",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "TailwindCSS"],
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
    stack: ["Angular", "TypeScript", "RxJS", "RBAC"],
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
    // Coursework, not a client engagement: "Frontend Developer" next to a
    // university's name reads as something it was not.
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
  /* One site rebuilt, not two different ones — hence the versions in the
     titles. v3 is this site and is deliberately absent: its live link would
     return the reader to the page they are already on. */
  {
    slug: "portfolio-v2",
    title: "Portfolio v2",
    client: "",
    year: 2025,
    summary: {
      en: "The second version, rebuilt on Next.js 16 and React 19: a wider project gallery covering web, mobile and brand work, with the experience and skills sections reworked.",
      ku: "دووەم وەشان، لەسەر \u2066Next.js 16\u2069 و \u2066React 19\u2069 لە نوێوە دروستکرا: گەلەریەکی فراوانتری پڕۆژە بۆ وێب، مۆبایل و براند، بە بەشی ئەزموون و شارەزایی نوێکراوەوە.",
    },
    role: PERSONAL,
    domain: "personal",
    surface: "website",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"],
    links: {
      live: "https://twana-ibrahim-v2.vercel.app/",
      repo: "https://github.com/twana-ibrahim/portfolio-v2",
    },
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1",
    client: "",
    year: 2024,
    summary: {
      en: "The first version: projects, skills and employment history on one page, with a contact form wired to Resend and a downloadable CV. Installable as a PWA.",
      ku: "یەکەم وەشانی ماڵپەڕەکە: پڕۆژە، شارەزایی و مێژووی کار لە یەک لاپەڕەدا، لەگەڵ فۆڕمی پەیوەندی و داگرتنی CV. وەک ئەپ دادەمەزرێت.",
    },
    role: PERSONAL,
    domain: "personal",
    surface: "website",
    stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Resend"],
    links: {
      live: "https://twana-ibrahim-v1.vercel.app/",
      repo: "https://github.com/twana-ibrahim/portfolio-v1",
    },
  },
]);

/** Home page selection. Ordered as authored, capped defensively. */
export const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Here rather than in the UI dictionary, so a label and the enum it keys off
 *  are one file to fix rather than two. */
export const domainLabels: Record<(typeof projects)[number]["domain"], Localized<string>> = {
  telecom: { en: "Telecom", ku: "تیلیکۆم" },
  fintech: { en: "Banking", ku: "بانک" },
  /* "Media", not "Streaming": the domain is the sector, and only the App
     streams. IMS is back-office and the Brand Site is marketing. */
  media: { en: "Media", ku: "میدیا" },
  identity: { en: "Identity", ku: "ناسنامە" },
  government: { en: "Government", ku: "حکومی" },
  healthcare: { en: "Healthcare", ku: "تەندروستی" },
  hospitality: { en: "Hospitality", ku: "میوانداری" },
  ngo: { en: "NGO", ku: "ڕێکخراو" },
  education: { en: "Education", ku: "پەروەردە" },
  personal: { en: "Personal", ku: "کەسی" },
};

/**
 * The "projects delivered" stat. Counts everything `/work` lists, because a
 * visitor can count those rows and a hero figure that comes up short reads as
 * either padding or an oversight. The "+" the hero appends carries the rest —
 * the work that was never written up.
 */
export const deliveredCount = projects.length;

/**
 * The "industries" stat. Drops the personal repos, which `deliveredCount`
 * keeps: "personal" is not an industry, and counting it would claim a sector
 * nobody hired for. Currently 9.
 */
export const industryCount = new Set(
  projects.filter((project) => project.domain !== "personal").map((project) => project.domain),
).size;

import { z } from "zod";
import { projects } from "./projects";
import { certificationSchema, educationSchema, languageSchema, parseExperience } from "./schema";

/**
 * Newest first, written from the CV and then cut hard — its own bullets
 * carried the usual filler about clean testable code and agile ceremonies,
 * which every engineer claims and which therefore says nothing.
 *
 * Still worth your pass: where a line reads as a responsibility rather than an
 * achievement, add the number that makes it one.
 *
 * Company names are not localized — transliterating a registered name into
 * Arabic script makes it harder to search for, not easier to read.
 */
export const experience = parseExperience(
  [
    {
      company: "Tailored Applications",
      /* Two adjacent companies with touching dates read as a job change, and
         "left after fifteen months" is a signal a recruiter acts on. Stating
         the transfer is what stops that. */
      formerly: "Gateway ICT",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Erbil, Iraq", ku: "هەولێر، عێراق" },
      arrangement: "remote",
      start: "2026-07",
      end: null,
      highlights: {
        en: [
          "Building customer-facing features for FIB, a digital bank — continuing on the same product after the Gateway ICT team transferred here in July 2026.",
          "Working against a regulated backend, where validation, access control and an auditable trail are requirements rather than refinements.",
          "Extending the shared component library instead of adding one-off components to it, so the design system stays a system.",
        ],
        ku: [
          "ئەو بەشانەی FIB دروست دەکەم کە کڕیار خۆی بەکاریان دەهێنێت — بەردەوامبوون لەسەر هەمان بەرهەم، دوای ئەوەی تیمی Gateway ICT لە تەمووزی 2026دا گوازرایەوە بۆ ئێرە.",
          "لەسەر سیستەمێکی بانکی ڕێکخراو کار دەکەم، کە پشکنینی داتا، کۆنترۆڵی دەستڕاگەیشتن و تۆماری کردارەکان مەرجن، نەک باشترکردنی زیادە.",
          "لەبری زیادکردنی کۆمپۆنێنتی تایبەت بە یەک شوێن، کتێبخانە هاوبەشەکە فراوان دەکەم، تاکو سیستەمی دیزاین بە سیستەم بمێنێتەوە.",
        ],
      },
      projects: ["fib"],
    },
    {
      company: "Gateway ICT",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Erbil, Iraq", ku: "هەولێر، عێراق" },
      arrangement: "remote",
      start: "2025-04",
      end: "2026-07",
      highlights: {
        en: [
          "Moved from the MyTV+ team onto the FIB banking project mid-2026 — an unfamiliar domain and an unfamiliar codebase, with no ramp.",
          "Cut load and interaction cost across large React applications through code splitting, lazy loading and state that stopped re-rendering the world.",
          "Set the component and file conventions the rest of the team built against, and reviewed to them.",
        ],
        ku: [
          "لە ناوەڕاستی 2026 لە تیمی \u2066MyTV+\u2069 ـەوە گواسترامەوە بۆ پڕۆژەی بانکی FIB — بوارێکی نامۆ و کۆدێکی نامۆ، بەبێ هیچ ماوەیەکی ئامادەکاری.",
          "کاتی بارکردن و وەڵامدانەوەم لە ئەپە گەورەکانی React کەم کردەوە، بە دابەشکردنی کۆد، بارکردنی درەنگ، و ڕێکخستنی state بۆ ئەوەی هەموو لاپەڕەکە دووبارە ڕێندەر نەبێتەوە.",
          "ڕێسای کۆمپۆنێنت و فایلم بۆ تیمەکە دانا، و بەپێی هەمان ڕێساکان کۆدەکانم پێداچوونەوە بۆ دەکردن.",
        ],
      },
      projects: ["mytv-plus-app", "mytv-plus-ads"],
    },
    {
      company: "Fastlink Telecom",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Erbil, Iraq", ku: "هەولێر، عێراق" },
      arrangement: "remote",
      start: "2024-03",
      end: "2025-03",
      highlights: {
        en: [
          "Built the dashboards and internal systems telecom agents and operations staff used every day to sell and reconcile.",
          "Designed filtering and reporting interfaces for data-heavy workflows — the kind where a naive table makes the page unusable at real volumes.",
          "Implemented role-based UI rendering that mirrors backend authorization, so the interface never offers an action the API will refuse.",
          "Refactored legacy frontend into modular components, removing duplication across the SIM sales, offers and restaurant products.",
        ],
        ku: [
          "ئەو داشبۆرد و سیستەمە ناوخۆییانەم دروست کرد کە نوێنەر و کارمەندانی بەشی کارگێڕی ڕۆژانە بۆ فرۆشتن و لێکدانەوەی حیساب بەکاریان دەهێنا.",
          "ڕووکاری فلتەرکردن و ڕاپۆرتم بۆ داتای قورس دیزاین کرد — ئەو جۆرەی کە خشتەیەکی سادە لە قەبارەی ڕاستەقینەدا بەکارهێنانی لاپەڕەکە ئەستەم دەکات.",
          "ڕووکارم بەپێی ڕۆڵی بەکارهێنەر پیشان دەدا، بە تەواوی هاوتای مۆڵەتەکانی باکئێند — تاکو ڕووکار هەرگیز کردارێک پێشکەش نەکات کە API ڕەتی دەکاتەوە.",
          "فرۆنتئێندی کۆنم بۆ کۆمپۆنێنتی جیاواز داڕشتەوە و دووبارەبوونەوەم لەنێوان بەرنامەکانی فرۆشتنی SIM، پێشکەشکراوەکان و چێشتخانەدا لابرد.",
        ],
      },
      projects: ["fast-sim-pwa", "fast-sim-web", "smart-offers", "fast-serve"],
    },
    {
      company: "Gateway ICT",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Erbil, Iraq", ku: "هەولێر، عێراق" },
      arrangement: "remote",
      start: "2022-09",
      end: "2024-03",
      highlights: {
        en: [
          "Built the MyTV+ streaming interfaces for both web and television, plus the advertising platform behind ad inventory and campaign delivery.",
          "Standardised the reusable components and patterns shared across products — the reason later platforms were quick to build.",
          "Improved runtime performance with lazy loading, memoisation and tighter state boundaries on interfaces that render a lot at once.",
        ],
        ku: [
          "ڕووکارەکانی ستریمینگی \u2066MyTV+\u2069 م بۆ وێب و تەلەفزیۆن دروست کرد، لەگەڵ ئەو پلاتفۆرمەی کە شوێنی ڕیکلام و گەیاندنی هەڵمەتەکانی بەڕێوە دەبرد.",
          "کۆمپۆنێنت و شێوازە هاوبەشەکانم بەسەر بەرنامەکاندا یەکخست — ئەمە هۆکاری ئەوە بوو کە پلاتفۆرمەکانی دواتر بە خێرایی دروست بکرێن.",
          "کاراییم باشتر کرد بە بارکردنی درەنگ، کاشکردنی ئەنجامەکان و سنووردارکردنی state لەو ڕووکارانەی کە شتی زۆر بە یەکجار پیشان دەدەن.",
        ],
      },
      projects: [
        "mytv-plus-app",
        "mytv-plus-website",
        "mytv-plus-ads",
        "hotel-system",
        "heart-beats",
      ],
    },
    {
      company: "iQ Group",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Sulaymaniyah, Iraq", ku: "سلێمانی، عێراق" },
      arrangement: "on-site",
      start: "2021-10",
      end: "2022-09",
      highlights: {
        en: [
          "Built Angular and TypeScript reporting tools for telecom recharge and subscription analytics across regions.",
          "Delivered the console and auth flows for a central identity provider: registration, role-based access control and granular permissions.",
          "First professional role — where I learned enterprise delivery, code review, and shipping to a specification rather than to taste.",
        ],
        ku: [
          "بە Angular و TypeScript ئامرازی ڕاپۆرتم دروست کرد بۆ شیکاری شەحنکردن و بەشداری بەسەر ناوچەکاندا.",
          "کۆنسۆڵ و پرۆسەکانی چوونەژوورەوەم بۆ سیستەمێکی ناوەندی ناسنامە تەواو کرد: خۆتۆمارکردن، دەستڕاگەیشتن بەپێی ڕۆڵ و مۆڵەتی ورد.",
          "یەکەم کاری فەرمیم — لێرەدا فێری کارکردن لە ژینگەی کۆمپانیا گەورەکان، پێداچوونەوەی کۆد، و کارکردن بەپێی پێوەرێکی دیاریکراو بووم نەک بەپێی حەزی خۆم.",
        ],
      },
      projects: ["authentication-server", "ksc-system", "government-report-system"],
    },
  ],
  projects,
);

export const education = z.array(educationSchema).parse([
  {
    institution: {
      en: "Salahaddin University — Erbil",
      ku: "زانکۆی سەڵاحەددین — هەولێر",
    },
    qualification: {
      en: "BSc, Software & Informatics Engineering",
      ku: "بەکالۆریۆس، ئەندازیاری سۆفتوێر و زانیاری",
    },
    start: "2017-09",
    end: "2021-06",
  },
]);

/**
 * By relevance, not date. The verification URLs matter more than the names:
 * anyone can type "Advanced React" into a list. Jira Fundamentals is last and
 * unlinked because Atlassian issues no public credential — the one item a
 * reader cannot check sits at the bottom rather than dressed up to match.
 *
 * Tracking parameters are stripped from the share URLs, and names stay in
 * English so they match the certificate the link resolves to.
 */
export const certifications = z.array(certificationSchema).parse([
  {
    name: "Advanced React",
    issuer: "Meta",
    awarded: "2023-12",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/QBW39CFN94MT",
  },
  {
    name: "Forward Program",
    issuer: "McKinsey.org",
    verifyUrl: "https://www.credly.com/badges/5e11d54e-34ee-4e94-900a-42fad221cbdf/public_url",
  },
  {
    name: "Foundations of Project Management",
    issuer: "Google",
    awarded: "2022-08",
    verifyUrl: "https://www.coursera.org/account/accomplishments/certificate/BK5V82XH2KNG",
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    verifyUrl: "https://verify.skilljar.com/c/uagd8vi8f2v2",
  },
  { name: "Jira Fundamentals", issuer: "Atlassian" },
]);

export const languages = z.array(languageSchema).parse([
  { name: { en: "Kurdish", ku: "کوردی" }, level: "Native" },
  { name: { en: "English", ku: "ئینگلیزی" }, level: "Professional" },
  { name: { en: "Persian", ku: "فارسی" }, level: "Limited working" },
  { name: { en: "Arabic", ku: "عەرەبی" }, level: "Elementary" },
]);

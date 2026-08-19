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
      /* One tenure, not two. The CV runs this from April 2025 to now under the
         new name and keeps the MyTV+ work inside it, because the company was
         renamed around him rather than left. Splitting it at the rename would
         invent a job change that never happened, and "left after fifteen
         months" is a signal a recruiter acts on. */
      formerly: "Gateway ICT",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Erbil, Iraq", ku: "هەولێر، عێراق" },
      arrangement: "remote",
      start: "2025-04",
      end: null,
      highlights: {
        en: [
          "Contributing to the back office, corporate and business applications for FIB, an Iraqi bank with more than two million app installs, in React and TypeScript.",
          "Contributing to the shared component library and design system rather than one-off screens.",
          "Built large React and TypeScript applications for MyTV+ before moving to the FIB team in June 2026, getting productive in the new codebase quickly.",
          "Cutting load and interaction cost through code splitting, lazy loading and tighter state management.",
          "Owning bug fixes, accessibility and cross-browser behaviour on the features I ship.",
          "Reviewing code and mentoring teammates on patterns, consistency and frontend quality.",
        ],
        ku: [
          "بەشداری لە ئەپلیکەیشنەکانی back office، کۆرپۆرەیت و بزنسی FIB دەکەم، بانکێکی عێراقی کە زیاتر لە دوو ملیۆن جار دابەزێنراوە، بە React و TypeScript.",
          "بەشداری لە کتێبخانەی کۆمپۆنێنتی هاوبەش و سیستەمی دیزایندا دەکەم، نەک دروستکردنی لاپەڕەی تاک.",
          "پێش گواستنەوەم بۆ تیمی FIB لە حوزەیرانی 2026، ئەپلیکەیشنی گەورەی React و TypeScript ـم بۆ \u2066MyTV+\u2069 دروست کرد، و بە خێرایی لە کۆدە نوێیەکەدا بەرهەمدار بووم.",
          "کاتی بارکردن و وەڵامدانەوە کەم دەکەمەوە بە دابەشکردنی کۆد، بارکردنی درەنگ و ڕێکخستنی توندتری state.",
          "بەرپرسیارم لە چاککردنی هەڵەکان، accessibility و ڕەفتاری وێبگەڕە جیاوازەکان لەو تایبەتمەندییانەی خۆم دەیاننێرم.",
          "پێداچوونەوە بە کۆددا دەکەم و ڕێنمایی هاوکارەکانم دەکەم لەسەر شێواز، یەکدەستی و کوالیتی Frontend.",
        ],
      },
      projects: [
        "fib-backoffice",
        "fib-business",
        "fib-corporate",
        "mytv-plus-app",
        "mytv-plus-ims",
        "mytv-plus-website",
      ],
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
          "Built dashboards and internal management systems used daily by agents and operations teams at Newroz Telecom and Fastlink, both part of the Allai Newroz group.",
          "Implemented advanced filtering and reporting interfaces over data-heavy workflows — the kind where a naive table makes the page unusable at real volumes.",
          "Built role-based UI rendering that matched backend authorization, so the interface never offers an action the API will refuse.",
          "Refactored legacy frontend code into modular, reusable components across the SIM sales, offers and restaurant products.",
        ],
        ku: [
          "ئەو داشبۆرد و سیستەمە ناوخۆییانەی بەڕێوەبردنم دروست کرد کە نوێنەران و تیمەکانی کارگێڕی Newroz Telecom و Fastlink ڕۆژانە بەکاریان دەهێنن — هەردووکیان بەشێکن لە گرووپی Allai Newroz.",
          "ڕووکاری فلتەرکردن و ڕاپۆرتم بۆ داتای قورس دیزاین کرد — ئەو جۆرەی کە خشتەیەکی سادە لە قەبارەی ڕاستەقینەدا بەکارهێنانی لاپەڕەکە ئەستەم دەکات.",
          "ڕووکارم بەپێی ڕۆڵی بەکارهێنەر پیشان دەدا، بە تەواوی هاوتای مۆڵەتەکانی باکئێند — تاکو ڕووکار هەرگیز کردارێک پێشکەش نەکات کە API ڕەتی دەکاتەوە.",
          "فرۆنتئێندی کۆنم بۆ کۆمپۆنێنتی جیاواز داڕشتەوە و دووبارەبوونەوەم لەنێوان بەرنامەکانی فرۆشتنی SIM، پێشکەشکراوەکان و چێشتخانەدا لابرد.",
        ],
      },
      projects: ["fast-sim-pwa", "fast-sim-web", "smart-offers", "fast-serve"],
    },
    {
      company: "Gateway ICT",
      /* The same company as the current entry, before the rename. Stated on
         both so a reader scanning the list top-down meets the fact wherever
         they happen to look, rather than only if they read upward. */
      renamedTo: "Tailored Applications",
      role: { en: "Frontend Developer", ku: "گەشەپێدەری Frontend" },
      location: { en: "Erbil, Iraq", ku: "هەولێر، عێراق" },
      arrangement: "remote",
      start: "2022-09",
      end: "2024-03",
      highlights: {
        en: [
          "Delivered internal and client-facing React and TypeScript applications across the product line.",
          "Built streaming platform interfaces and advertising management tools supporting daily business operations.",
          "Standardised UI components and design patterns so teams stopped rebuilding the same pieces.",
          "Improved frontend performance with lazy loading, memoisation and leaner state management.",
        ],
        ku: [
          "ئەپلیکەیشنە ناوخۆیی و ئەوانەی بەردەم کڕیارم بە React و TypeScript بەسەر هێڵی بەرهەمەکاندا تەواو کرد.",
          "ڕووکاری پلاتفۆرمی ستریمینگ و ئامرازی بەڕێوەبردنی ڕیکلامم دروست کرد کە پشتیوانی کاری ڕۆژانەی کۆمپانیاکەن.",
          "کۆمپۆنێنتی ڕووکار و شێوازی دیزاینم یەکخست، تاکو تیمەکان دووبارە هەمان شت دروست نەکەنەوە.",
          "کاراییم باشتر کرد بە بارکردنی درەنگ، کاشکردنی ئەنجامەکان و ڕێکخستنی سووکتری state.",
        ],
      },
      projects: ["mytv-plus-ads", "hotel-system"],
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
          "Built internal Angular and TypeScript applications for telecom reporting and regional analytics.",
          "Built dashboards and data-driven interfaces for recharge and subscription reporting workflows.",
          "Implemented responsive components with SCSS and Material UI, and integrated the REST APIs behind them.",
          "Delivered the console and auth flows for a central identity provider: registration, role-based access control and granular permissions.",
        ],
        ku: [
          "ئەپلیکەیشنی ناوخۆییم بە Angular و TypeScript دروست کرد بۆ ڕاپۆرتی تیلیکۆم و شیکاری ناوچەیی.",
          "داشبۆرد و ڕووکاری داتا-بنەڕەتم دروست کرد بۆ ڕاپۆرتی شەحنکردن و بەشداری.",
          "کۆمپۆنێنتی گونجاو لەگەڵ هەموو شاشەیەکم بە SCSS و Material UI جێبەجێ کرد، و REST API ـەکانی پشتیانم پێوە بەستن.",
          "کۆنسۆڵ و پرۆسەکانی چوونەژوورەوەم بۆ سیستەمێکی ناوەندی ناسنامە تەواو کرد: خۆتۆمارکردن، دەستڕاگەیشتن بەپێی ڕۆڵ و مۆڵەتی ورد.",
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
 * The CV's four, in the CV's order. Jira Fundamentals is last and unlinked
 * because Atlassian issues no public credential — the one item a reader cannot
 * check sits at the bottom rather than dressed up to match.
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
    name: "Foundations of Project Management",
    issuer: "Google",
    awarded: "2022-08",
    verifyUrl: "https://www.coursera.org/account/accomplishments/certificate/BK5V82XH2KNG",
  },
  {
    name: "Forward Program",
    /* "McKinsey & Company", as the CV writes it. The programme is run by
       McKinsey.org, but the name on the credential is what a reader matches
       against, and mismatching them costs more than the precision buys. */
    issuer: "McKinsey & Company",
    verifyUrl: "https://www.credly.com/badges/5e11d54e-34ee-4e94-900a-42fad221cbdf/public_url",
  },
  { name: "Jira Fundamentals", issuer: "Atlassian" },
]);

/**
 * Order and levels both follow the CV. Arabic and Persian share a level
 * because they are the same story — understood far better than spoken — and
 * the CV says so rather than flattening them to "elementary", which would
 * undersell reading a document and oversell joining a call in either.
 */
export const languages = z.array(languageSchema).parse([
  { name: { en: "Kurdish", ku: "کوردی" }, level: "Native" },
  { name: { en: "English", ku: "ئینگلیزی" }, level: "Upper-intermediate" },
  { name: { en: "Arabic", ku: "عەرەبی" }, level: "Receptive" },
  { name: { en: "Persian", ku: "فارسی" }, level: "Receptive" },
]);

import type { Dictionary } from "./en";

/**
 * Kurdish (Sorani) UI strings.
 *
 * Written for a Kurdish reader, not mapped from the English. Where a phrase
 * only works in English it has been replaced rather than forced:
 *
 * - "Years shipping" is a pun on delivering software. There is no Kurdish
 *   equivalent that carries it, and a literal rendering reads as freight, so
 *   the stat reads "ساڵ ئەزموون" — years of experience — which is what the
 *   number actually means.
 * - "Case study" has no settled Kurdish term. "لێکۆڵینەوەی حاڵەت" is academic
 *   and would read like a medical paper, so it is "خوێندنەوەی پڕۆژە".
 * - "Elsewhere" as a footer heading is an English idiom. "شوێنی تر" is the
 *   plain equivalent and reads naturally.
 *
 * NUMERALS: Latin digits throughout, not Arabic-Indic (٠١٢٣). Kurdish
 * technical writing uses both, but the design sets every figure in tabular
 * mono and the CV, phone number and dates are already Latin — mixing systems
 * inside one layout looks like a bug rather than a choice.
 *
 * ── NEEDS TWANA'S OWN PASS ──────────────────────────────────────────────────
 * The facts are right and the grammar is careful, but register is not
 * something a non-native gets to be confident about. Read it aloud. Anywhere
 * it sounds like a translation rather than like you, change the words.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const ku: Dictionary = {
  listSeparator: "، ",

  a11y: {
    skipToContent: "بازدان بۆ ناوەڕۆک",
    mainNav: "سەرەکی",
    footerNav: "پێڕستی خوارەوە",
    mobileNav: "مۆبایل",
    openMenu: "کردنەوەی پێڕست",
    closeMenu: "داخستنی پێڕست",
    navigationDialog: "پێڕست",
    switchTheme: "گۆڕینی ڕووکار",
    switchToDark: "گۆڕین بۆ ڕووکاری تاریک",
    switchToLight: "گۆڕین بۆ ڕووکاری ڕووناک",
    switchLanguage: "گۆڕینی زمان",
    home: "سەرەتا",
  },

  nav: {
    home: "سەرەتا",
    work: "کارەکان",
    about: "دەربارە",
    contact: "پەیوەندی",
  },

  home: {
    selectedWork: "کاری هەڵبژێردراو",
    getInTouch: "پەیوەندیم پێوە بکە",
    allProjects: "هەموو {count} پڕۆژەکە",
    experience: "ئەزموون",
    yearsShipping: "ساڵ ئەزموون",
    projectsDelivered: "پڕۆژەی تەواوکراو",
    industries: "کەرتی جیاواز",
  },

  work: {
    eyebrow: "کارەکان",
    readCaseStudy: "خوێندنەوەی پڕۆژە",
    visitSite: "سەردانی ماڵپەڕ",
    viewSource: "بینینی کۆد",
    internal: "ناوخۆیی",
    personalProject: "پڕۆژەی کەسی",
    // Both forms identical: Kurdish does not inflect the noun after a number,
    // unlike English which needs the singular special-cased.
    projectCount: { one: "{count} پڕۆژە", other: "{count} پڕۆژە" },
    allWork: "هەموو کارەکان",
    client: "کڕیار",
    role: "ڕۆڵ",
    year: "ساڵ",
    read: "خوێندنەوە",
    readingMinutes: "{count} خولەک",
    withheld: "سیستەمی ناوخۆیی — وێنە و بەستەر بڵاو ناکرێنەوە",
    arrangement: {
      remote: "لە دوورەوە",
      "on-site": "لە شوێنی کار",
      hybrid: "تێکەڵ",
    },
  },

  about: {
    eyebrow: "دەربارە",
    education: "خوێندن",
    certifications: "بڕوانامەکان",
    languages: "زمانەکان",
    capabilities: "توانستەکان",
    whatIReachFor: "ئەوەی بەکاری دەهێنم",
    fullHistory: "مێژووی تەواو",
    downloadCv: "داگرتنی CV",
    alsoWorkedWith: "هەروەها کارم لەگەڵ ئەمانە کردووە",
    formerly: "پێشتر {name}",
    languageLevels: {
      Native: "زمانی دایک",
      Professional: "ئاستی پیشەیی",
      "Limited working": "ئاستی سنووردار",
      Elementary: "سەرەتایی",
    },
  },

  contact: {
    eyebrow: "پەیوەندی",
    direct: "ڕاستەوخۆ",
    where: "لە کوێوە",
    email: "ئیمەیڵ",
    phone: "تەلەفۆن",
    name: "ناو",
    company: "کۆمپانیا",
    message: "نامە",
    optional: "ئارەزوومەندانە",
    namePlaceholder: "ناوت",
    emailPlaceholder: "you@company.com",
    companyPlaceholder: "لە کوێ کار دەکەیت",
    messagePlaceholder: "چی دروست دەکەیت، و لە چیدا پێویستت بە یارمەتییە؟",
    send: "ناردنی نامە",
    sending: "دەنێردرێت…",
    sendingAnnouncement: "نامەکەت دەنێردرێت",
    orEmail: "یان ئیمەیڵم بۆ بنێرە",
    sent: "نامەکە نێردرا.",
    sentBody:
      "سوپاس بۆ پەیوەندیکردن — هەموو نامەکان دەخوێنمەوە و بەزۆری لە ماوەی ڕۆژێک تا دوو ڕۆژدا وەڵام دەدەمەوە.",
    ctaLabel: "دەست بە گفتوگۆ بکە",

    validation: {
      name: "تکایە ناوت بنووسە.",
      nameTooLong: "ئەم ناوە لەوە درێژترە کە ئەم فۆرمە هەڵیدەگرێت.",
      email: "تکایە ئیمەیڵێک بنووسە کە بتوانم وەڵامت بدەمەوە.",
      message: "کەمێک وردەکاری زیاتر یارمەتی دەدات — لانیکەم 20 پیت.",
      messageTooLong: "ئەمە لەوە درێژترە کە ئەم فۆرمە وەریدەگرێت. تکایە ڕاستەوخۆ ئیمەیڵم بۆ بنێرە.",
      checkFields: "تکایە خانەکانی خوارەوە بپشکنە.",
      failed: "هەڵەیەک ڕوویدا لە ناردنی نامەکە. تکایە ڕاستەوخۆ ئیمەیڵم بۆ بنێرە: {email}",
    },
  },

  footer: {
    pages: "لاپەڕەکان",
    elsewhere: "شوێنی تر",
    localTime: "کاتی ناوخۆیی",
    builtWith: "Next.js · TypeScript · Tailwind",
  },

  notFound: {
    code: "404",
    title: "ئەم لاپەڕەیە بوونی نییە.",
    body: "لەوانەیە بەستەرەکە کۆن بێت، یان لاپەڕەکە لابرابێت. هەرچی هەیە یەکێکە لەمانەی خوارەوە.",
    backHome: "گەڕانەوە بۆ سەرەتا",
  },
};

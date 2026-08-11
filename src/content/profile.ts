import { parseProfile } from "./schema";

/**
 * The person, in prose. Facts live in `lib/config/site.ts`; sentences live
 * here, because they exist twice and `site.ts` is `as const`.
 *
 * The two versions are not translations of each other. English names the
 * category ("banks and operators") because FIB and Fastlink mean nothing to
 * that reader; Kurdish names the companies outright and drops the category,
 * because to that reader the category is throat-clearing and the names are the
 * whole point.
 *
 * NEEDS TWANA'S PASS: the facts are from the CV, but the Kurdish register is
 * one I chose, and register is not something a non-native should be confident
 * about. Read it aloud; where it sounds translated, change the words.
 */
export const profile = parseProfile({
  name: {
    en: "Twana Ibrahim",
    ku: "توانا ئیبراهیم",
  },

  /** Matches the CV header exactly. Change both together or neither. */
  role: {
    en: "Software Engineer (Frontend)",
    // "Frontend" stays in Latin. It is the word Kurdish developers use, and
    // the transliteration ("فرۆنتئێند") is longer, uglier, and unsearchable.
    ku: "ئەندازیاری سۆفتوێر (Frontend)",
  },

  /** One line, used in the footer and structured data. */
  tagline: {
    en: "Frontend engineer building the internal systems banks and operators run on.",
    ku: "ئەندازیاری Frontend، دروستکەری ئەو سیستەمە ناوخۆییانەی کە بانک و تیلیکۆم پێیان کار دەکەن.",
  },

  /**
   * Lines are authored, never measured: each is its own clipped box in the
   * hero's mask reveal, so a line that wraps breaks the effect. Keep them
   * short — "run their business on" wrapped at 1440px and was cut for it.
   */
  headline: {
    en: {
      lead: "I build the systems",
      emphasis: "people rely on",
      trail: "every day.",
    },
    ku: {
      lead: "ئەو سیستەمانە دروست دەکەم",
      emphasis: "کە ڕۆژانە",
      trail: "بەکاریان دەهێنیت.",
    },
  },

  /**
   * `{years}` resolves from `siteConfig.careerStart` at render, so the prose
   * cannot drift from the hero's stat every January.
   *
   * The `⁦…⁩` are bidi isolates and are load-bearing: a Latin run
   * ending in a neutral character renders "MyTV+" as "+MyTV", because the
   * algorithm hands the plus to the surrounding Kurdish. Written as escapes —
   * the characters themselves are invisible in an editor and get deleted.
   */
  summary: {
    en: "{years} years of frontend work on software other businesses depend on to operate — digital banking, telecom sales, streaming and advertising, identity and access management. Mostly React and TypeScript, mostly systems where being right matters more than being pretty.",
    ku: "{years} ساڵە ئەو سۆفتوێرە دروست دەکەم کە کۆمپانیاکان ڕۆژانە کاری پێ دەکەن — بانکی FIB، سیستەمی فرۆشتنی فاستلینک، ستریمینگی \u2066MyTV+\u2069 و سیستەمی ناسنامەی iQ Group. زۆربەی بە React و TypeScript، لەو سیستەمانەی کە ڕاستی تێدا گرنگترە لە جوانی.",
  },

  availability: {
    label: {
      en: "Available for work",
      ku: "ئامادەم بۆ کار",
    },
    /* Roles, not engagements: this is employment history, not a freelance
       book, and leading with "contract" undersells it. */
    detail: {
      en: "Open to remote roles, GMT+3",
      ku: "ئامادەم بۆ کارکردن لە دوورەوە، \u2066GMT+3\u2069",
    },
  },

  location: {
    city: { en: "Kalar", ku: "کەلار" },
    region: { en: "Sulaymaniyah", ku: "سلێمانی" },
    country: { en: "Iraq", ku: "عێراق" },
  },

  /**
   * Skills and named projects rather than an employment history — the full
   * Experience list renders directly beneath this on /about, and the project
   * detail lives on /work, which the third paragraph points at instead of
   * repeating. The skills named here are the spine only; SkillGrid, further
   * down the same page, carries the full list.
   */
  bio: {
    en: [
      "I'm a frontend engineer in Kalar, in the Sulaymaniyah region of Iraq, working remotely with teams in Erbil. React and TypeScript are where I'm strongest, and I've pointed them mostly at operational software — the systems a company runs on rather than the ones it advertises.",
      "In practice that comes down to a specific set of things: role-based interfaces that mirror backend permissions exactly, filtering and reporting that stay quick once the dataset is real rather than seeded, and shared component libraries that hold a product together as more people commit to it. I've built in Next.js, Redux Toolkit, Zustand and TanStack Query, and in Angular and RxJS before that. On the server side I'm comfortable in Node and Express, designing REST endpoints and modelling schemas in Postgres and Mongo — enough to know what I'm asking the backend for and what it costs to answer.",
      "Right now I'm building the internal web applications behind FIB, a digital bank — a BackOffice hub for its data, users and system oversight, plus admin dashboards for the Business and Corporate products. Before that: the MyTV+ streaming apps for web and television and the advertising platform behind them, the SIM and eSIM sales systems Fastlink's agents and dealers use daily, and the identity server that handled registration and permissions across a family of internal products at iQ Group. Each of those, and the rest of the work, is on the work page.",
      "What matters to me on a team is that the next person can follow what I did — fewer clever solutions, more agreed ones, and the reasoning written down wherever the code can't carry it.",
    ],
    ku: [
      "ئەندازیاری Frontend ـم، لە کەلارەوە بۆ تیمەکانی هەولێر لە دوورەوە کار دەکەم. React و TypeScript ئەو شوێنەن کە بەهێزترم تێیاندا، و زۆربەی کارەکانم لەسەر سۆفتوێری کارگێڕی بووە — ئەو سیستەمانەی کۆمپانیایەک پێیان کار دەکات، نەک ئەوانەی ڕیکلامیان بۆ دەکات.",
      "بە کردەوە ئەمە چەند شتێکی دیاریکراو دەگرێتەوە: ڕووکارێک کە بەپێی ڕۆڵ کار دەکات و بە تەواوی هاوتای مۆڵەتەکانی باکئێندە، فلتەر و ڕاپۆرتێک کە خێرا دەمێنێتەوە کاتێک داتاکە ڕاستەقینەیە نەک نموونە، و کتێبخانەی کۆمپۆنێنتی هاوبەش کە بەرهەمەکە یەکدەست ڕادەگرێت کاتێک کەسی زیاتر کاری تێدا دەکات. لە ⁦Next.js⁩، ⁦Redux Toolkit⁩، Zustand و ⁦TanStack Query⁩ کارم کردووە، و پێشتر لە Angular و RxJS. لەلای سێرڤەرەوەش لە Node و Express ئاسوودەم، لە دیزاینکردنی REST و داڕشتنی سکیما لە Postgres و Mongo — ئەوەندەی بزانم داوای چی لە باکئێند دەکەم و بەرهەمهێنانی چەند تێدەچێت.",
      "ئێستا ئەو ئەپلیکەیشنە ناوخۆییانەی وێب دروست دەکەم کە لە پشت FIB ـەوەن — ناوەندێکی BackOffice بۆ داتا، بەکارهێنەران و سەرپەرشتی سیستەم، لەگەڵ داشبۆردی کارگێڕی بۆ بەرهەمەکانی Business و Corporate. پێش ئەوە: ئەپەکانی ستریمینگی ⁦MyTV+⁩ بۆ وێب و تەلەفزیۆن و ئەو پلاتفۆرمە ڕیکلامییەی لە پشتیانەوەیە، سیستەمەکانی فرۆشتنی SIM و eSIM کە نوێنەر و فرۆشیارەکانی فاستلینک ڕۆژانە بەکاریان دەهێنن، و ئەو سێرڤەری ناسنامەیەی خۆتۆمارکردن و مۆڵەتەکانی چەند بەرنامەیەکی ناوخۆیی ⁦iQ Group⁩ ی بەڕێوە دەبرد. هەریەکەیان، لەگەڵ کارەکانی تر، لە لاپەڕەی کارەکاندا هەن.",
      "ئەوەی لەناو تیمدا لای من گرنگە، ئەوەیە کە کەسی دواتر بتوانێت شوێن کارەکەم بکەوێت — چارەسەری زیرەک کەمتر، ڕێسای هاوبەش زیاتر، و نووسینەوەی هۆکارەکە هەر کاتێک کۆدەکە خۆی نەیتوانی هەڵیبگرێت.",
    ],
  },
});

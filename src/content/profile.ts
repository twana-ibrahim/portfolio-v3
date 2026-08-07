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
      emphasis: "banks and operators",
      trail: "run on.",
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

  bio: {
    en: [
      "I'm a frontend engineer in Kalar, in the Sulaymaniyah region of Iraq. Five years in, almost all of it spent on software that other businesses run on — the dashboard a telecom operations team opens at the start of every shift, the app an agent uses to sell a SIM, the identity server that decides what six internal products will let you see.",
      "That kind of work has a particular shape. Nobody is delighted by an internal tool. They need it to be right, to stay responsive when the table has ten thousand rows in it, and to never offer a button the backend is going to refuse. So most of my effort goes into things that don't photograph well: access control that mirrors the API exactly, filtering that survives real data volumes, and structure the next person can change without breaking three screens they've never opened.",
      "Frontend is where I specialise, not where I stop. Node and Express, REST design, schemas in Postgres and Mongo — knowing what a response costs to produce changes what you ask for, and it is most of the difference between an interface that fits the system and one the backend team has to work around.",
      "Right now I'm building customer-facing features for FIB, a digital bank. Before banking it was telecom sales platforms at Fastlink, streaming and advertising at Gateway, and Angular reporting systems at iQ Group, where I learned what shipping to a specification actually means.",
    ],
    ku: [
      "ئەندازیاری Frontend ـم و لە کەلارەوە کار دەکەم. پێنج ساڵە، زۆربەی ئەو ماوەیە لەسەر ئەو سۆفتوێرەی کە کۆمپانیاکان پێی کار دەکەن — ئەو داشبۆردەی تیمی کارگێڕی تیلیکۆم لە سەرەتای هەر شیفتێکدا دەیکاتەوە، ئەو ئەپەی نوێنەر SIM ی پێ دەفرۆشێت، و ئەو سێرڤەری ناسنامەیەی دیاری دەکات کە هەر بەکارهێنەرێک لە شەش بەرنامەی ناوخۆییدا دەتوانێت چی ببینێت.",
      "ئەم جۆرە کارە تایبەتمەندی خۆی هەیە. کەس چاوەڕێی ئەوە ناکات ئامرازێکی ناوخۆیی سەرسامی بکات؛ ئەوەی لێی دەوێت ئەوەیە کە دروست کار بکات، خێرا بمێنێتەوە کاتێک خشتەکە دە هەزار ڕیزی تێدایە، و هەرگیز دوگمەیەک پیشان نەدات کە باکئێند ڕەتی دەکاتەوە. بۆیە زۆربەی هەوڵم لەو شتانەدایە کە وێنەیان لێ ناگیرێت: کۆنترۆڵی دەستڕاگەیشتن کە بە تەواوی هاوتای API ـیە، فلتەرێک کە لە قەبارەی داتای ڕاستەقینەدا دەمێنێتەوە، و پێکهاتەیەک کە گەشەپێدەری دواتر بتوانێت بیگۆڕێت بەبێ ئەوەی سێ شاشەی تر تێک بدات کە هەرگیز نەیکردوونەتەوە.",
      "Frontend بواری تایبەتمەندیمە، نەک سنووری زانیاریم. Node و Express، دیزاینی REST، سکیمای Postgres و Mongo — کاتێک بزانیت وەڵامێک چەند تێچوونی هەیە، ئەوە شێوەی داواکردنت دەگۆڕێت. ئەمەش زۆربەی ئەو جیاوازییەیە لەنێوان ڕووکارێک کە لەگەڵ سیستەمەکەدا دەگونجێت و ئەوەی کە تیمی باکئێند دەبێت بەدەوریدا بسووڕێتەوە.",
      "ئێستا لەسەر ئەو بەشانەی FIB کار دەکەم کە کڕیار خۆی بەکاریان دەهێنێت. پێش بانک، پلاتفۆرمەکانی فرۆشتنی فاستلینک بوو، ستریمینگ و ڕیکلام لە Gateway، و سیستەمی ڕاپۆرتی Angular لە iQ Group — لەوێ فێربووم کە کارکردن بەپێی پێوەرێکی دیاریکراو واتە چی.",
    ],
  },
});

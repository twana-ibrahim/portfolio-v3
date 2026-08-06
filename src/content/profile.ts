import { parseProfile } from "./schema";

/**
 * THE PERSON, IN PROSE.
 *
 * Facts live in `lib/config/site.ts`. Sentences live here, because sentences
 * have to exist in both languages and `site.ts` is `as const`.
 *
 * ── HOW THE KURDISH DIFFERS, AND WHY ────────────────────────────────────────
 * The two versions are written for two readers who do not know the same
 * things, so they do not say the same things.
 *
 * The English headline is "I build the systems banks and operators run on".
 * It works because FIB and Fastlink are unknown to that reader, so naming the
 * *category* is the only way to convey scale. To a Kurdish reader, "banks and
 * operators" is corporate throat-clearing — they already know which companies
 * are here. What they cannot guess is that the app they topped their SIM up
 * with this morning was built by someone from Kalar. So the Kurdish headline
 * makes that the claim, and the summary underneath it drops the categories and
 * names FIB, Fastlink, MyTV+ and iQ Group outright — names that mean nothing
 * in English and everything here.
 *
 * The bio opens the same way. English needs "in Kalar, in the Sulaymaniyah
 * region of Iraq" to place him. Kurdish needs "لە کەلارەوە" and nothing more;
 * the rest would read as explaining Kurdistan to Kurds.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * ── NEEDS TWANA'S OWN PASS ──────────────────────────────────────────────────
 * Every fact here is from your CV, so nothing is invented. But the Kurdish is
 * written in a register I chose, and register is not something a non-native
 * gets to be confident about — least of all in your own professional voice.
 * Read it aloud. Anywhere it sounds like a translation, change the words.
 * ────────────────────────────────────────────────────────────────────────────
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
    ku: "ئەندازیاری Frontend، دروستکەری ئەو سیستەمە ناوخۆییانەی کە بانک و تەلەکۆم پێیان کار دەکەن.",
  },

  /**
   * The hero statement.
   *
   * Concrete on purpose. "Passionate developer crafting beautiful digital
   * experiences" describes nobody; naming what is at stake describes exactly
   * one person. `emphasis` is the only phrase on the page that gets set apart,
   * so it has to be the phrase worth remembering.
   *
   * Lines are authored, never measured — each is its own clipped box in the
   * hero's mask reveal, so a line that wraps breaks the effect. Keep them
   * short. "run their business on" wrapped at 1440px and was cut for it.
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
   * Two or three sentences maximum. Anything longer belongs on /about.
   *
   * `{years}` is resolved from `siteConfig.careerStart` at render. It used to
   * read "Five years" as a literal, which agreed with the hero's derived stat
   * until the first of January and then quietly stopped.
   *
   * `⁦…⁩` are bidi isolates, and they are load-bearing. A Latin word
   * inside RTL text is placed correctly on its own, but one ending in a
   * *neutral* character is not: "MyTV+" rendered as "+MyTV", because the
   * algorithm hands the plus to the surrounding Kurdish. The isolate fences the
   * run off. Written as escapes rather than as the characters themselves, which
   * are invisible in an editor and get deleted by accident.
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
    /**
     * Roles, not engagements. The career is five years of employment at
     * companies, not a freelance book — leading with "contract" invites
     * questions about a track record that is not there, and undersells the
     * one that is.
     */
    detail: {
      en: "Open to remote roles, GMT+3",
      ku: "ئامادەم بۆ کاری دوورەوە، \u2066GMT+3\u2069",
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
      "Right now I'm building customer-facing features for FIB, a digital bank — a project I moved onto at Gateway ICT and carried with me to Tailored Applications. Before banking it was telecom sales platforms at Fastlink, streaming and advertising at Gateway, and Angular reporting systems at iQ Group, where I learned what shipping to a specification actually means.",
    ],
    ku: [
      "ئەندازیاری Frontend ـم و لە کەلارەوە کار دەکەم. پێنج ساڵە، زۆربەی ئەو ماوەیە لەسەر ئەو سۆفتوێرەی کە کۆمپانیاکان پێی کار دەکەن — ئەو داشبۆردەی تیمی کارگێڕی تەلەکۆم لە سەرەتای هەر شیفتێکدا دەیکاتەوە، ئەو ئەپەی نوێنەر SIM ی پێ دەفرۆشێت، ئەو سێرڤەری ناسنامەیەی بڕیار دەدات شەش بەرنامەی ناوخۆیی چیت پیشان بدەن.",
      "ئەم جۆرە کارە شێوەی خۆی هەیە. کەس بە ئامرازێکی ناوخۆیی دڵخۆش نابێت. پێویستە ڕاست بێت، پێویستە خێرا بمێنێتەوە کاتێک خشتەکە دە هەزار ڕیزی تێدایە، و پێویستە هەرگیز دوگمەیەک پیشان نەدات کە باکئێند ڕەتی دەکاتەوە. بۆیە زۆربەی هەوڵم لەو شتانەدایە کە وێنەیان لێ ناگیرێت: کۆنترۆڵی دەستڕاگەیشتن کە بە تەواوی هاوتای API ـیە، فلتەرێک کە لە قەبارەی ڕاستەقینەدا دەمێنێتەوە، و پێکهاتەیەک کە کەسی دواتر بتوانێت بیگۆڕێت بەبێ ئەوەی سێ شاشەی تر بشکێنێت.",
      "Frontend بواری تایبەتمەندیمە، نەک سنووری زانیاریم. Node و Express، دیزاینی REST، سکیمای Postgres و Mongo — کاتێک بزانیت وەڵامێک چەند تێچوونی هەیە، ئەوە شێوەی داواکردنت دەگۆڕێت. ئەمەش زۆربەی ئەو جیاوازییەیە لەنێوان ڕووکارێک کە لەگەڵ سیستەمەکەدا دەگونجێت و ئەوەی کە تیمی باکئێند دەبێت بەدەوریدا بسووڕێتەوە.",
      "ئێستا لەسەر ئەو بەشانەی FIB کار دەکەم کە کڕیار خۆی بەکاریان دەهێنێت — پڕۆژەیەک کە لە Gateway ICT دەستم پێکرد و لەگەڵ خۆم هێنایە Tailored Applications. پێش بانک، پلاتفۆرمەکانی فرۆشتنی فاستلینک بوو، ستریمینگ و ڕیکلام لە Gateway، و سیستەمی ڕاپۆرتی Angular لە iQ Group، کە لەوێ فێربووم کارکردن بەپێی پێوەر واتە چی.",
    ],
  },
});

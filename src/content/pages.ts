import { parsePageCopy } from "./schema";

/**
 * PER-PAGE PROSE.
 *
 * The heading and the opening paragraph each page leads with, plus the closing
 * call to action shared by three of them. Kept out of the UI dictionary on
 * purpose: the dictionary is labels, and letting real writing in there is how
 * it turns into a second content store with none of the rules of this one.
 *
 * ── WHERE THE KURDISH DEPARTS FROM THE ENGLISH ──────────────────────────────
 * `contact.where` is the clearest case. The English sells the timezone —
 * "a working day that overlaps comfortably with Europe and the Gulf" — because
 * for a reader in London or Dubai, whether this person is awake when they are
 * is a real question. A reader in Sulaymaniyah is in the same timezone, so
 * selling it to them is absurd. The Kurdish states the location plainly and
 * mentions the overlap only as evidence of who else he works with.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const pageCopy = parsePageCopy({
  work: {
    /* Was "Systems that businesses actually run on." "Actually" argued with an
       accusation nobody made, and "businesses" is contradicted by the paragraph
       below it — the list carries government, NGO and university work. */
    title: {
      en: { lead: "Systems that organisations", emphasis: "run on", trail: "." },
      ku: {
        lead: "ئەو سیستەمانەی دامەزراوەکان",
        emphasis: "کاریان پێ دەکەن",
        trail: ".",
      },
    },
    /**
     * The last sentence used to be "The detail lives in the case studies."
     * There are no case studies — every project carries `caseStudy: false` —
     * so the page was promising a reader something that does not exist.
     */
    intro: {
      en: "Most of this is internal software — back-office portals, agent tools, reporting systems and identity infrastructure, running inside banks, telecom operators and public bodies. None of it is public, so a missing link here is deliberate rather than an oversight.",
      ku: "زۆربەی ئەمانە سۆفتوێری ناوخۆین — پۆرتاڵی کارگێڕی، ئامرازی نوێنەران، سیستەمی ڕاپۆرت و ژێرخانی ناسنامە، کە لەناو بانک، کۆمپانیای تیلیکۆم و دامەزراوە حکومییەکاندا کار دەکەن. هیچیان بۆ گشتی کراوە نین، بۆیە نەبوونی بەستەر لێرەدا بە ئەنقەستە، نەک لەبیرکرابێت.",
    },
    description: {
      en: "Selected engineering work across digital banking, telecom, streaming, identity and government systems — built between 2021 and today.",
      ku: "کاری هەڵبژێردراو لە بانکی دیجیتاڵ، تیلیکۆم، ستریمینگ، ناسنامە و سیستەمە حکومییەکاندا — لە 2021 ـەوە تا ئێستا.",
    },
  },

  about: {
    title: {
      en: { lead: "{years} years building software people", emphasis: "have to", trail: "use." },
      // Deliberately not the English claim. "have to" is the whole thesis of
      // the English line — internal tools nobody chooses. Twana asked for
      // "حەز دەکەن" (want to), which is warmer and reads better in Kurdish,
      // so the two versions now argue slightly different things on purpose.
      ku: {
        lead: "{years} ساڵ دروستکردنی ئەو سۆفتوێرەی",
        emphasis: "خەڵک حەز دەکەن",
        trail: "بەکاری بهێنن.",
      },
    },
    description: {
      en: "Frontend engineer in Kalar, Iraq. Five years on digital banking, telecom, streaming and identity systems — mostly React and TypeScript.",
      ku: "ئەندازیاری Frontend لە کەلار. پێنج ساڵ کارکردن لەسەر سیستەمی بانکی، تیلیکۆم، ستریمینگ و ناسنامە — زۆربەی بە React و TypeScript.",
    },
  },

  contact: {
    title: {
      en: "Let's talk about what you're building.",
      ku: "با قسە لەسەر ئەوە بکەین کە تۆ دروستی دەکەیت.",
    },
    where: {
      /**
       * Overlap only. An earlier draft ended the Kurdish with "لەگەڵ
       * هەردووکیان کارم کردووە" — "I have worked with both of them" — which is
       * not true: every employer on the CV is Iraq-based. The English
       * overclaimed more quietly, saying the day reaches "the morning in North
       * America"; at GMT+3 against Eastern the gap is 7–8 hours, so 17:00 here
       * is 09:00–10:00 there and only the last hour or two touches it.
       *
       * Both now say what a clock says and nothing about who has hired him.
       */
      en: "Kalar, Sulaymaniyah, Iraq — GMT+3. A full working day's overlap with the Gulf, most of one with Europe, and the end of mine meets the start of the morning on the US East Coast.",
      ku: "کەلار، سلێمانی، عێراق — ⁦GMT+3⁩. ڕۆژی کارم بە تەواوی لەگەڵ کەنداودا دەگونجێت، زۆربەی لەگەڵ ئەوروپا، و کۆتایی ڕۆژەکەم دەکەوێتە سەرەتای بەیانی کەناری ڕۆژهەڵاتی ئەمریکا.",
    },
    description: {
      en: "Get in touch about remote frontend engineering roles. Based in Kalar, Sulaymaniyah, Iraq and open to new work.",
      ku: "پەیوەندیم پێوە بکە بۆ کاری ئەندازیاری Frontend. لە کەلارەوە کار دەکەم و ئامادەم بۆ کاری نوێ.",
    },
  },

  cta: {
    title: {
      en: { lead: "Have something that needs building", emphasis: "properly", trail: "?" },
      ku: {
        lead: "شتێکت هەیە کە پێویستە",
        emphasis: "بە شێوەی دروست",
        trail: "دروست بکرێت؟",
      },
    },
    body: {
      en: "Open to remote frontend roles. Tell me what you're building and I'll come back with a straight answer about whether I'm the right person for it — including when I'm not.",
      ku: "ئامادەم بۆ کاری Frontend لە دوورەوە. پێم بڵێ چی دروست دەکەیت، وەڵامێکی ڕاستەوخۆت دەدەمەوە لەسەر ئەوەی من کەسی گونجاوم بۆی یان نا — تەنانەت کاتێک نەبم.",
    },
  },
});

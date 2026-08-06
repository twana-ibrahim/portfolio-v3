import { defaultLocale, type Locale } from "@/lib/config/i18n";

/**
 * Calendar vocabulary, per locale.
 *
 * Hand-written rather than delegated to `Intl.DateTimeFormat`. Node's ICU data
 * for `ckb` is not guaranteed to be present in every build environment, and a
 * month name that silently falls back to English on Vercel but renders in
 * Kurdish locally is the worst possible failure mode — it looks fine in review
 * and wrong in production.
 *
 * The Kurdish names are the Levantine set used in Iraq (شوبات, ئازار, نیسان),
 * not the Persian-influenced alternatives. Unabbreviated, because Kurdish has
 * no settled three-letter forms and inventing them would look like a typo.
 */
const MONTHS: Record<Locale, readonly string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ku: [
    "کانوونی دووەم",
    "شوبات",
    "ئازار",
    "نیسان",
    "ئایار",
    "حوزەیران",
    "تەمووز",
    "ئاب",
    "ئەیلوول",
    "تشرینی یەکەم",
    "تشرینی دووەم",
    "کانوونی یەکەم",
  ],
};

/**
 * Duration units and the open-ended end date.
 *
 * Kurdish does not inflect a noun after a numeral — "1 ساڵ" and "5 ساڵ" use
 * the same form — so the plural suffix is empty rather than absent, which
 * keeps both locales on one code path instead of branching on language.
 */
const UNITS: Record<
  Locale,
  { year: string; years: string; month: string; months: string; present: string }
> = {
  en: { year: "yr", years: "yrs", month: "mo", months: "mos", present: "Present" },
  ku: { year: "ساڵ", years: "ساڵ", month: "مانگ", months: "مانگ", present: "ئێستا" },
};

/**
 * Parses a schema-validated "YYYY-MM" string.
 *
 * The schema guarantees the shape, but `noUncheckedIndexedAccess` does not
 * know that, so the split is checked rather than asserted with `!`.
 */
function parseYearMonth(value: string): { year: number; month: number } {
  const [rawYear, rawMonth] = value.split("-");
  if (!rawYear || !rawMonth) {
    throw new Error(`Malformed year-month: "${value}"`);
  }
  return { year: Number(rawYear), month: Number(rawMonth) };
}

/**
 * "2024-03" → "Mar 2024" / "ئازار 2024"
 *
 * Latin digits in both locales. Kurdish technical writing uses Arabic-Indic
 * (٢٠٢٤) and Latin interchangeably, but every figure on this site is set in
 * tabular mono and the phone number and credential dates are already Latin —
 * mixing numeral systems inside one layout reads as a bug, not a choice.
 */
export function formatYearMonth(value: string, locale: Locale = defaultLocale): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[locale][month - 1]} ${year}`;
}

/** `end: null` means the role is current. */
export function formatDateRange(
  start: string,
  end: string | null,
  locale: Locale = defaultLocale,
): string {
  const to = end ? formatYearMonth(end, locale) : UNITS[locale].present;
  return `${formatYearMonth(start, locale)} — ${to}`;
}

/**
 * "1 yr 5 mos". Rendered next to each role so the reader does not have to do
 * date arithmetic to see how long something lasted.
 */
export function formatDuration(
  start: string,
  end: string | null,
  locale: Locale = defaultLocale,
  now = new Date(),
): string {
  const from = parseYearMonth(start);
  const to = end ? parseYearMonth(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };

  // Inclusive of both endpoints: Mar 2024 → Mar 2025 reads as 13 months.
  const months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const unit = UNITS[locale];

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? unit.year : unit.years}`);
  if (remainder > 0) parts.push(`${remainder} ${remainder === 1 ? unit.month : unit.months}`);

  return parts.join(" ") || `1 ${unit.month}`;
}

/**
 * Whole years elapsed since a "YYYY-MM" start.
 *
 * Floored, never rounded. The result is rendered as "N+", and rounding up
 * makes that claim false for half of every year — at 4 yrs 7 mos, "5+" says
 * five or more when it is neither.
 *
 * Not inclusive of the start month, unlike formatDuration: "how long did this
 * role last" and "how long have you been doing this" count differently at the
 * boundary.
 */
export function yearsSince(start: string, now = new Date()): number {
  const from = parseYearMonth(start);
  const months = (now.getFullYear() - from.year) * 12 + (now.getMonth() + 1 - from.month);
  return Math.max(0, Math.floor(months / 12));
}

/** Zero-pads an ordinal for editorial numbering: 1 → "01". */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

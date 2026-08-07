import { defaultLocale, type Locale } from "@/lib/config/i18n";

/**
 * Hand-written rather than `Intl.DateTimeFormat`: Node's ICU data for `ckb` is
 * not guaranteed in every build environment, and a month name that renders in
 * Kurdish locally and English on Vercel looks fine in review and wrong in
 * production.
 *
 * The Levantine set used in Iraq, unabbreviated — Kurdish has no settled
 * three-letter forms and inventing them would read as a typo.
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

/** Kurdish does not inflect a noun after a numeral, so both forms are equal —
 *  which keeps the two locales on one code path. */
const UNITS: Record<
  Locale,
  { year: string; years: string; month: string; months: string; present: string }
> = {
  en: { year: "yr", years: "yrs", month: "mo", months: "mos", present: "Present" },
  ku: { year: "ساڵ", years: "ساڵ", month: "مانگ", months: "مانگ", present: "ئێستا" },
};

/** The schema guarantees the shape; `noUncheckedIndexedAccess` does not know
 *  that, so this is checked rather than asserted with `!`. */
function parseYearMonth(value: string): { year: number; month: number } {
  const [rawYear, rawMonth] = value.split("-");
  if (!rawYear || !rawMonth) {
    throw new Error(`Malformed year-month: "${value}"`);
  }
  return { year: Number(rawYear), month: Number(rawMonth) };
}

/**
 * "2024-03" → "Mar 2024" / "ئازار 2024". Latin digits in both locales: Kurdish
 * uses Arabic-Indic and Latin interchangeably, and mixing the two systems in
 * one layout reads as a bug rather than a choice.
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

/** "1 yr 5 mos", so the reader does not have to do the date arithmetic. */
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
 * Floored, never rounded: the result renders as "N+", and rounding up makes
 * that false for half of every year. Not inclusive of the start month, unlike
 * formatDuration — "how long did this role last" and "how long have you done
 * this" count differently at the boundary.
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

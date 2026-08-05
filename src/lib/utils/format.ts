const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

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

/** "2024-03" → "Mar 2024" */
export function formatYearMonth(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** `end: null` means the role is current. */
export function formatDateRange(start: string, end: string | null): string {
  return `${formatYearMonth(start)} — ${end ? formatYearMonth(end) : "Present"}`;
}

/**
 * "1 yr 5 mos". Rendered next to each role so the reader does not have to do
 * date arithmetic to see how long something lasted.
 */
export function formatDuration(start: string, end: string | null, now = new Date()): string {
  const from = parseYearMonth(start);
  const to = end ? parseYearMonth(end) : { year: now.getFullYear(), month: now.getMonth() + 1 };

  // Inclusive of both endpoints: Mar 2024 → Mar 2025 reads as 13 months.
  const months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  const years = Math.floor(months / 12);
  const remainder = months % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (remainder > 0) parts.push(`${remainder} mo${remainder === 1 ? "" : "s"}`);

  return parts.join(" ") || "1 mo";
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

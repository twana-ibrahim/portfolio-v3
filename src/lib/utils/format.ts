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

/** Zero-pads an ordinal for editorial numbering: 1 → "01". */
export function ordinal(index: number): string {
  return String(index + 1).padStart(2, "0");
}

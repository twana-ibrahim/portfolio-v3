import { describe, expect, it } from "vitest";
import { formatDateRange, formatDuration, formatYearMonth, ordinal, yearsSince } from "./format";

describe("formatYearMonth", () => {
  it("formats a year-month as an abbreviated month and year", () => {
    expect(formatYearMonth("2024-03")).toBe("Mar 2024");
  });

  it("handles both boundary months", () => {
    expect(formatYearMonth("2021-01")).toBe("Jan 2021");
    expect(formatYearMonth("2021-12")).toBe("Dec 2021");
  });

  it("throws on a malformed value rather than rendering NaN", () => {
    expect(() => formatYearMonth("2024")).toThrow(/Malformed year-month/);
  });
});

describe("formatDateRange", () => {
  it("renders a closed range", () => {
    expect(formatDateRange("2024-03", "2025-03")).toBe("Mar 2024 — Mar 2025");
  });

  it("renders a null end date as Present", () => {
    expect(formatDateRange("2026-07", null)).toBe("Jul 2026 — Present");
  });
});

describe("formatDuration", () => {
  // A fixed clock — otherwise the open-ended cases drift as time passes.
  const now = new Date("2026-08-04T00:00:00Z");

  it("counts inclusively across both endpoints", () => {
    // Mar 2024 through Mar 2025 is 13 months worked, not 12.
    expect(formatDuration("2024-03", "2025-03", now)).toBe("1 yr 1 mo");
  });

  it("omits the year part below twelve months", () => {
    expect(formatDuration("2022-09", "2023-02", now)).toBe("6 mos");
  });

  it("omits the month part on a whole number of years", () => {
    expect(formatDuration("2021-01", "2022-12", now)).toBe("2 yrs");
  });

  it("measures an open-ended role against the current date", () => {
    expect(formatDuration("2026-07", null, now)).toBe("2 mos");
  });

  it("never returns an empty string", () => {
    expect(formatDuration("2026-08", "2026-08", now)).toBe("1 mo");
  });
});

describe("yearsSince", () => {
  it("floors rather than rounding, so the rendered N+ is never a lie", () => {
    // 5 yrs 7 mos. Rounding would give 6, and "6+" would claim six or more.
    expect(yearsSince("2021-01", new Date("2026-08-05T00:00:00Z"))).toBe(5);
  });

  it("ticks over on the anniversary month, not before it", () => {
    expect(yearsSince("2021-01", new Date("2026-12-31T00:00:00Z"))).toBe(5);
    expect(yearsSince("2021-01", new Date("2027-01-01T00:00:00Z"))).toBe(6);
  });

  it("does not count the start month, unlike formatDuration", () => {
    expect(yearsSince("2026-08", new Date("2026-08-31T00:00:00Z"))).toBe(0);
  });

  it("clamps a future start to zero instead of going negative", () => {
    expect(yearsSince("2027-01", new Date("2026-08-05T00:00:00Z"))).toBe(0);
  });
});

describe("ordinal", () => {
  it("zero-pads single digits for editorial numbering", () => {
    expect(ordinal(0)).toBe("01");
    expect(ordinal(9)).toBe("10");
    expect(ordinal(11)).toBe("12");
  });
});

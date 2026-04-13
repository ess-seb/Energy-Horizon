import { describe, it, expect } from "vitest";
import { resolveComparisonAxisLabelHints } from "../../src/card/labels/comparison-label-hints";
import type { ResolvedWindow } from "../../src/card/types";

const w = (
  start: Date,
  end: Date,
  role: "current" | "reference" = "current",
  index: 0 | 1 = 0
): ResolvedWindow => ({
  index,
  id: `w${index}`,
  role,
  start,
  end,
  aggregation: "day"
});

describe("resolveComparisonAxisLabelHints", () => {
  it("returns false/false without reference window", () => {
    expect(
      resolveComparisonAxisLabelHints(
        w(new Date(Date.UTC(2026, 3, 1)), new Date(Date.UTC(2026, 3, 30))),
        undefined,
        "UTC"
      )
    ).toEqual({ omitYearOnAxis: false, dayOfMonthOnlyOnAxis: false });
  });

  it("YoY/MoY: different start years → omit year on axis", () => {
    const h = resolveComparisonAxisLabelHints(
      w(new Date(Date.UTC(2026, 3, 1)), new Date(Date.UTC(2026, 3, 13))),
      w(new Date(Date.UTC(2025, 3, 1)), new Date(Date.UTC(2025, 3, 30)), "reference", 1),
      "UTC"
    );
    expect(h.omitYearOnAxis).toBe(true);
    expect(h.dayOfMonthOnlyOnAxis).toBe(false);
  });

  it("MoM: same year, different months → day-of-month only", () => {
    const h = resolveComparisonAxisLabelHints(
      w(new Date(Date.UTC(2026, 3, 1)), new Date(Date.UTC(2026, 3, 30))),
      w(new Date(Date.UTC(2026, 2, 1)), new Date(Date.UTC(2026, 2, 31)), "reference", 1),
      "UTC"
    );
    expect(h.omitYearOnAxis).toBe(false);
    expect(h.dayOfMonthOnlyOnAxis).toBe(true);
  });
});

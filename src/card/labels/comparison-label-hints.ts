import { DateTime } from "luxon";
import type { ResolvedWindow } from "../types";

/**
 * Derived from resolved windows (structural — not preset-keyed): which calendar fields to
 * suppress on the shared comparison X-axis / default tooltip so labels match the comparison story.
 */
export interface ComparisonAxisLabelHints {
  /** Windows start in different calendar years → omit year on axis (YoY, MoY, etc.). */
  omitYearOnAxis: boolean;
  /** Same calendar year, different start months → day-of-month only for `day` aggregation (MoM). */
  dayOfMonthOnlyOnAxis: boolean;
}

export function resolveComparisonAxisLabelHints(
  w0: ResolvedWindow,
  w1: ResolvedWindow | undefined,
  zone: string
): ComparisonAxisLabelHints {
  if (!w1) {
    return { omitYearOnAxis: false, dayOfMonthOnlyOnAxis: false };
  }
  const a = DateTime.fromJSDate(w0.start, { zone }).startOf("day");
  const b = DateTime.fromJSDate(w1.start, { zone }).startOf("day");
  const omitYearOnAxis = a.year !== b.year;
  const dayOfMonthOnlyOnAxis =
    !omitYearOnAxis && a.year === b.year && a.month !== b.month;
  return { omitYearOnAxis, dayOfMonthOnlyOnAxis };
}

import { describe, it, expect } from "vitest";
import { formatTooltipHeader } from "../../src/card/axis/tooltip-format";

const zone = "UTC";

describe("formatTooltipHeader", () => {
  it("uses month-only for month aggregation", () => {
    const ms = Date.UTC(2026, 2, 15);
    const s = formatTooltipHeader({
      slotIndex: 0,
      fullTimeline: [ms],
      zone,
      labelLocale: "en-US",
      primaryAggregation: "month",
      mergedDurationMs: 86400000 * 90
    });
    expect(s).toMatch(/March/i);
    expect(s).not.toMatch(/2026/);
  });

  it("uses day + month without year for day aggregation", () => {
    const ms = Date.UTC(2026, 2, 15);
    const s = formatTooltipHeader({
      slotIndex: 0,
      fullTimeline: [ms],
      zone,
      labelLocale: "en-US",
      primaryAggregation: "day",
      mergedDurationMs: 86400000 * 30
    });
    expect(s).toMatch(/15/);
    expect(s).toMatch(/March/i);
    expect(s).not.toMatch(/2026/);
  });

  it("EC2: hour aggregation + duration > 1 day appends day disambiguation", () => {
    const ms = Date.UTC(2026, 2, 15, 14, 0, 0);
    const s = formatTooltipHeader({
      slotIndex: 0,
      fullTimeline: [ms],
      zone,
      labelLocale: "en-US",
      primaryAggregation: "hour",
      mergedDurationMs: 3 * 86400000
    });
    expect(s).toContain(",");
    expect(s).toMatch(/Mar/i);
  });

  it("hour aggregation within one day shows time only", () => {
    const ms = Date.UTC(2026, 2, 15, 14, 0, 0);
    const s = formatTooltipHeader({
      slotIndex: 0,
      fullTimeline: [ms],
      zone,
      labelLocale: "en-US",
      primaryAggregation: "hour",
      mergedDurationMs: 12 * 3600000
    });
    expect(s).not.toContain(",");
  });

  it("dayOfMonthOnly comparison hint shows day number only", () => {
    const ms = Date.UTC(2026, 2, 15);
    const s = formatTooltipHeader({
      slotIndex: 0,
      fullTimeline: [ms],
      zone,
      labelLocale: "en-US",
      primaryAggregation: "day",
      mergedDurationMs: 86400000 * 30,
      comparisonHints: {
        omitYearOnAxis: false,
        dayOfMonthOnlyOnAxis: true
      }
    });
    expect(s).toBe("15");
  });

  it("respects forced Luxon tooltip_format", () => {
    const ms = Date.UTC(2026, 2, 15, 14, 30, 0);
    const s = formatTooltipHeader({
      slotIndex: 0,
      fullTimeline: [ms],
      zone,
      labelLocale: "en-US",
      primaryAggregation: "day",
      mergedDurationMs: 86400000,
      tooltipFormatPattern: "yyyy-MM-dd"
    });
    expect(s).toBe("2026-03-15");
  });

  it("FR-H: default Intl header uses HA zone, not browser default", () => {
    // April 1 02:00 UTC = still March 31 evening in New York (calendar day differs).
    const ms = Date.UTC(2026, 3, 1, 2, 0, 0, 0);
    const base = {
      slotIndex: 0,
      fullTimeline: [ms],
      labelLocale: "en-US",
      primaryAggregation: "day" as const,
      mergedDurationMs: 86400000 * 30
    };
    const utcHeader = formatTooltipHeader({ ...base, zone: "UTC" });
    const nyHeader = formatTooltipHeader({ ...base, zone: "America/New_York" });
    expect(utcHeader).toMatch(/April/);
    expect(utcHeader).toMatch(/1/);
    expect(nyHeader).toMatch(/March/);
    expect(nyHeader).toMatch(/31/);
    expect(utcHeader).not.toBe(nyHeader);
  });
});

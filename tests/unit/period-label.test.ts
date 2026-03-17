import { describe, it, expect } from "vitest";
import { buildPeriodSuffix } from "../../src/card/cumulative-comparison-chart";

describe("buildPeriodSuffix", () => {
  it("returns year string for year_over_year mode with 2026-01-01", () => {
    const date = new Date("2026-01-01");
    const result = buildPeriodSuffix(date, "year_over_year", "en");
    expect(result).toBe("2026");
  });

  it("returns month+year for month_over_year mode with 2026-03-01 in English", () => {
    const date = new Date("2026-03-01");
    const result = buildPeriodSuffix(date, "month_over_year", "en");
    expect(result).toBe("March 2026");
  });

  it("returns month+year for month_over_year mode with 2026-03-01 in Polish", () => {
    const date = new Date("2026-03-01");
    const result = buildPeriodSuffix(date, "month_over_year", "pl");
    expect(result).toMatch(/2026/);
  });

  it("returns year string for year_over_year mode with period_offset -2 (2024-01-01)", () => {
    const date = new Date("2024-01-01");
    const result = buildPeriodSuffix(date, "year_over_year", "en");
    expect(result).toBe("2024");
  });

  it("returns empty string for unknown mode", () => {
    const date = new Date("2026-01-01");
    const result = buildPeriodSuffix(date, "unknown_mode", "en");
    expect(result).toBe("");
  });
});

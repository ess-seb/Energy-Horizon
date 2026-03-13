import { describe, it, expect } from "vitest";
import { computeSummary, computeForecast } from "../../src/card/ha-api";
import type { ComparisonSeries } from "../../src/card/types";

function makeSeriesFromDaily(values: number[]): ComparisonSeries {
  const start = new Date("2024-01-01T00:00:00Z").getTime();

  const points = values.map((v, idx) => ({
    timestamp: start + idx * 24 * 60 * 60 * 1000,
    value: v
  }));

  return {
    current: {
      points,
      unit: "kWh",
      periodLabel: "Bieżący okres",
      total: points[points.length - 1]?.value ?? 0
    },
    aggregation: "day",
    time_zone: "UTC"
  };
}

describe("computeSummary (edge cases)", () => {
  it("treats very small difference as similar in downstream text summary", () => {
    const base = makeSeriesFromDaily([10, 20]);
    const ref = makeSeriesFromDaily([10, 20.005]);

    const series: ComparisonSeries = {
      ...base,
      reference: ref.current
    };

    const summary = computeSummary(series);

    expect(summary.current_cumulative).toBeCloseTo(20, 3);
    expect(summary.reference_cumulative).toBeCloseTo(20.005, 3);
    expect(Math.abs(summary.difference ?? 0)).toBeLessThan(0.01);
  });
});

describe("computeForecast", () => {
  it("disables forecast when there are not enough points", () => {
    const series = makeSeriesFromDaily([1, 2, 3, 4]); // 4 < MIN_POINTS_FOR_FORECAST

    const forecast = computeForecast(series);

    expect(forecast.enabled).toBe(false);
  });

  it("enables forecast and sets confidence based on number of points", () => {
    const seriesLow = makeSeriesFromDaily([1, 2, 3, 4, 5]); // 5 -> low/medium threshold
    const forecastLow = computeForecast(seriesLow);
    expect(forecastLow.enabled).toBe(true);
    expect(forecastLow.confidence === "low" || forecastLow.confidence === "medium").toBe(
      true
    );

    const seriesMedium = makeSeriesFromDaily(Array.from({ length: 8 }, () => 2));
    const forecastMedium = computeForecast(seriesMedium);
    expect(forecastMedium.enabled).toBe(true);
    expect(forecastMedium.confidence === "medium" || forecastMedium.confidence === "high").toBe(
      true
    );

    const seriesHigh = makeSeriesFromDaily(Array.from({ length: 20 }, () => 2));
    const forecastHigh = computeForecast(seriesHigh);
    expect(forecastHigh.enabled).toBe(true);
    expect(forecastHigh.confidence).toBe("high");
  });
});


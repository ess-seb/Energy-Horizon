import { describe, it, expect } from "vitest";
import {
  computeSummary,
  computeTextSummary,
  mapLtsResponseToSeries
} from "../../src/card/ha-api";
import type {
  ComparisonSeries,
  LtsStatisticsResponse
} from "../../src/card/types";

function makeSeries(values: number[]): ComparisonSeries {
  const points = values.map((v, idx) => ({
    timestamp: idx,
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

describe("computeSummary", () => {
  it("computes difference and percent when reference is available", () => {
    const current = makeSeries([10, 20]);
    const reference = makeSeries([5, 15]);

    const series: ComparisonSeries = {
      ...current,
      reference: reference.current
    };

    const summary = computeSummary(series);

    expect(summary.current_cumulative).toBe(20);
    expect(summary.reference_cumulative).toBe(15);
    expect(summary.difference).toBe(5);
    expect(summary.differencePercent).toBeCloseTo(33.33, 1);
  });

  it("does not set reference_cumulative when reference series is shorter", () => {
    const current = makeSeries([5, 10, 15]);
    const reference = makeSeries([4, 8]);

    const series: ComparisonSeries = {
      ...current,
      reference: reference.current
    };

    const summary = computeSummary(series);

    expect(summary.current_cumulative).toBe(15);
    expect(summary.reference_cumulative).toBeUndefined();
    expect(summary.difference).toBeUndefined();
    expect(summary.differencePercent).toBeUndefined();
  });
});

describe("mapLtsResponseToSeries", () => {
  it("maps LTS response to ComparisonSeries with cumulative points", () => {
    const response: LtsStatisticsResponse = {
      results: {
        "sensor.energy": [
          {
            start: "2024-01-01T00:00:00+00:00",
            sum: 2,
            unit_of_measurement: "kWh"
          },
          {
            start: "2024-01-02T00:00:00+00:00",
            sum: 3,
            unit_of_measurement: "kWh"
          }
        ]
      }
    };

    const series = mapLtsResponseToSeries(
      response,
      "sensor.energy",
      {
        current_start: new Date("2024-01-01T00:00:00Z"),
        current_end: new Date("2024-01-03T00:00:00Z"),
        reference_start: new Date("2023-01-01T00:00:00Z"),
        reference_end: new Date("2023-01-03T00:00:00Z"),
        aggregation: "day",
        time_zone: "UTC"
      }
    );

    expect(series).toBeDefined();
    expect(series!.current.unit).toBe("kWh");
    expect(series!.current.points).toHaveLength(2);
    expect(series!.current.points[0].value).toBe(2);
    expect(series!.current.points[1].value).toBe(5);
  });

  it("returns undefined when units are inconsistent", () => {
    const response: LtsStatisticsResponse = {
      results: {
        "sensor.energy": [
          {
            start: "2024-01-01T00:00:00+00:00",
            sum: 2,
            unit_of_measurement: "kWh"
          },
          {
            start: "2024-01-02T00:00:00+00:00",
            sum: 3,
            unit_of_measurement: "Wh"
          }
        ]
      }
    };

    const series = mapLtsResponseToSeries(
      response,
      "sensor.energy",
      {
        current_start: new Date("2024-01-01T00:00:00Z"),
        current_end: new Date("2024-01-03T00:00:00Z"),
        reference_start: new Date("2023-01-01T00:00:00Z"),
        reference_end: new Date("2023-01-03T00:00:00Z"),
        aggregation: "day",
        time_zone: "UTC"
      }
    );

    expect(series).toBeUndefined();
  });
});

describe("computeTextSummary", () => {
  it("reports higher usage correctly", () => {
    const summary = {
      current_cumulative: 20,
      reference_cumulative: 10,
      difference: 10,
      differencePercent: 100,
      unit: "kWh"
    };

    const text = computeTextSummary(summary);

    expect(text.trend).toBe("higher");
    expect(text.heading).toContain("wyższe");
  });

  it("reports lower usage correctly", () => {
    const summary = {
      current_cumulative: 5,
      reference_cumulative: 10,
      difference: -5,
      differencePercent: -50,
      unit: "kWh"
    };

    const text = computeTextSummary(summary);

    expect(text.trend).toBe("lower");
    expect(text.heading).toContain("niższe");
  });

  it("handles missing reference data", () => {
    const summary = {
      current_cumulative: 5,
      reference_cumulative: undefined,
      difference: undefined,
      differencePercent: undefined,
      unit: "kWh"
    };

    const text = computeTextSummary(summary as any);

    expect(text.trend).toBe("unknown");
  });
});


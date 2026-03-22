import { describe, it, expect } from "vitest";
import type { HomeAssistant } from "../../src/ha-types";
import type {
  CardConfig,
  ComparisonPeriod,
  ComparisonSeries,
  CardState
} from "../../src/card/types";
import { EnergyHorizonCard } from "../../src/card/cumulative-comparison-chart";

function createBaseHass(language: string): HomeAssistant {
  return {
    language,
    locale: {
      language,
      number_format: "language"
    },
    config: {
      time_zone: "Europe/Warsaw"
    },
    connection: {
      sendMessagePromise: async <T>() => Promise.resolve({} as T)
    }
  };
}

function buildMinimalPeriod(): ComparisonPeriod {
  return {
    current_start: new Date(2024, 0, 1),
    current_end: new Date(2024, 11, 31),
    reference_start: new Date(2023, 0, 1),
    reference_end: new Date(2023, 11, 31),
    aggregation: "day",
    time_zone: "Europe/Warsaw"
  };
}

function buildMinimalComparisonSeries(): ComparisonSeries {
  return {
    current: {
      points: [{ timestamp: Date.UTC(2024, 0, 1), value: 100 }],
      unit: "kWh",
      periodLabel: "2024",
      total: 100
    },
    reference: {
      points: [{ timestamp: Date.UTC(2023, 0, 1), value: 90 }],
      unit: "kWh",
      periodLabel: "2023",
      total: 90
    },
    aggregation: "day",
    time_zone: "Europe/Warsaw"
  };
}

describe("EnergyHorizonCard renderer config vs _state", () => {
  const baseConfig: CardConfig = {
    type: "custom:energy-horizon-card",
    entity: "sensor.energy",
    comparison_mode: "year_over_year"
  };

  /**
   * Regression: `_buildRendererConfig()` must not assign to `this._state` (or otherwise
   * mutate card state). Doing so from `updated()` caused an infinite Lit update loop and
   * a frozen tab. This test locks in read-only behavior for the renderer config path.
   */
  it("_buildRendererConfig does not mutate _state when series and period are present", () => {
    const card = new EnergyHorizonCard();
    card.hass = createBaseHass("en");
    card.setConfig(baseConfig);

    const ready: CardState = {
      status: "ready",
      period: buildMinimalPeriod(),
      comparisonSeries: buildMinimalComparisonSeries(),
      summary: {
        current_cumulative: 100,
        reference_cumulative: 90,
        difference: 10,
        differencePercent: 11.1,
        unit: "kWh"
      },
      forecast: {
        enabled: true,
        forecast_total: 120,
        reference_total: 90,
        confidence: "medium",
        unit: "kWh"
      }
    };

    card._state = ready;
    const before = structuredClone(card._state);

    (card as unknown as { _buildRendererConfig: () => unknown })._buildRendererConfig();

    expect(structuredClone(card._state)).toEqual(before);
  });

  it("_buildRendererConfig does not mutate _state in the early-return branch (missing period)", () => {
    const card = new EnergyHorizonCard();
    card.hass = createBaseHass("en");
    card.setConfig(baseConfig);

    const ready: CardState = {
      status: "ready",
      forecast: {
        enabled: false,
        confidence: "low",
        unit: "kWh"
      }
    };

    card._state = ready;
    const before = structuredClone(card._state);

    (card as unknown as { _buildRendererConfig: () => unknown })._buildRendererConfig();

    expect(structuredClone(card._state)).toEqual(before);
  });
});

/**
 * Contract: computeForecast
 *
 * Dokument definiuje publiczne sygnatury TypeScript dla zmian
 * wprowadzanych przez feature `001-compute-forecast`.
 *
 * Plik jest TYLKO dokumentacją kontraktu (nie jest importowany przez produkcję).
 * Rzeczywista implementacja znajduje się w `src/card/ha-api.ts`.
 */

// ---------------------------------------------------------------------------
// Zmieniony typ: ForecastStats (src/card/types.ts)
// ---------------------------------------------------------------------------

export interface ForecastStats {
  /** Czy prognoza jest dostępna i ma sens dla bieżących danych. */
  enabled: boolean;

  /**
   * Prognozowane całkowite zużycie dla okresu (A + C * trend).
   * Obecne gdy enabled = true.
   * Gdy C = 0: forecast_total = A.
   */
  forecast_total?: number;

  /** Suma całkowita serii referencyjnej (B + C). Obecne gdy enabled = true. */
  reference_total?: number;

  /**
   * Poziom zaufania do prognozy.
   * - "low"    → pct < 0.20  (lub anomalousReference = true)
   * - "medium" → 0.20 <= pct < 0.40
   * - "high"   → pct >= 0.40
   *
   * Zawsze ustawione, niezależnie od wartości `enabled`.
   */
  confidence: "low" | "medium" | "high";

  /** Jednostka miary (np. "kWh", "m³"). */
  unit: string;

  /**
   * Flaga anomalnego roku referencyjnego.
   * true gdy rawTrend < 0.3 lub rawTrend > 3.3.
   * Nieobecność pola jest równoznaczna z false.
   *
   * NOWE POLE (FR-014).
   */
  anomalousReference?: boolean;
}

// ---------------------------------------------------------------------------
// Zmieniona sygnatura: computeForecast (src/card/ha-api.ts)
// ---------------------------------------------------------------------------

import type { ComparisonSeries } from "../../../src/card/types";

/**
 * Oblicza prognozę zużycia energii na koniec bieżącego okresu.
 *
 * @param series            Dane porównawcze (bieżące + referencyjne punkty).
 * @param periodTotalBuckets Całkowita liczba bucketów w pełnym okresie
 *                           (= fullTimeline.length przed wywołaniem).
 *                           Musi być > 0; w przeciwnym razie zwraca enabled: false.
 * @returns ForecastStats
 *
 * Kontrakty wejściowe (preconditions):
 * - series.current.points posortowane rosnąco po timestamp (gwarantowane przez normalizePoints)
 * - series.reference?.points posortowane rosnąco po timestamp (gwarantowane przez normalizePoints)
 * - Każdy punkt ma pole rawValue (ustawiane przez normalizePoints → toCumulativeSeries)
 *
 * Kontrakty wyjściowe (postconditions):
 * - Jeśli enabled = false: forecast_total i anomalousReference mogą być nieobecne
 * - Jeśli enabled = true: forecast_total zawsze ustawione (>= 0)
 * - confidence zawsze ustawione
 * - Brak mutacji argumentów wejściowych
 *
 * Usunięcie stałej:
 * - MIN_POINTS_FOR_FORECAST (= 5) zostaje usunięta; nowy wbudowany próg = 3 (nie eksportowany)
 */
export declare function computeForecast(
  series: ComparisonSeries,
  periodTotalBuckets: number
): ForecastStats;

// ---------------------------------------------------------------------------
// Zmieniony call-site (src/card/cumulative-comparison-chart.ts, metoda _loadData)
// ---------------------------------------------------------------------------

/**
 * W metodzie `_loadData()` klasy `EnergyHorizonCard`:
 *
 * PRZED zmianą (linia ~256):
 *   const forecast = computeForecast(series);
 *
 * PO zmianie:
 *   const fullEnd = this._computeFullEnd(period);
 *   const fullTimeline = buildFullTimeline(period, fullEnd);
 *   const forecast = computeForecast(series, fullTimeline.length);
 *
 * Uwaga: `buildFullTimeline` jest już importowane z `./ha-api` (linia 11 pliku).
 *        `_computeFullEnd` jest metodą prywatną istniejącej klasy — dostępna w `_loadData`.
 */

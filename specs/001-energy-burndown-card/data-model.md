# Data Model: Energy Burndown Cumulative Comparison Card

## Overview

Karta operuje na:
- Konfiguracji użytkownika (YAML/Storage UI).
- Agregowanych statystykach długoterminowych (LTS) z Home Assistant (`recorder/statistics_during_period`).
- Wewnętrznym modelu serii czasowych do wizualizacji i obliczeń (skumulowane wartości, porównanie okresów, prognoza).

---

## 1. Card Configuration

### Entity: `CardConfig`

Reprezentuje konfigurację pojedynczej instancji karty w dashboardzie Lovelace.

Fields:
- `type: string`  
  - Identyfikator karty Lovelace (np. `"custom:energy-burndown-card"`).
- `entity: string`  
  - Id encji energii (np. `sensor.house_total_energy`), dla której mają być pobierane statystyki LTS.
- `title?: string`  
  - Opcjonalny tytuł karty wyświetlany w nagłówku.
- `comparison_mode: "year_over_year" | "month_over_year"`  
  - Typ porównania:
    - `"year_over_year"` – bieżący rok vs poprzedni rok.
    - `"month_over_year"` – bieżący miesiąc vs ten sam miesiąc rok wcześniej.
- `aggregation?: "day" | "week" | "month"`  
  - Poziom agregacji żądany od LTS:
    - Domyślnie `"day"` dla year-over-year i `"day"` lub `"week"` dla month-over-year.
- `period_offset?: number`  
  - Opcjonalne przesunięcie okresu referencyjnego (np. -1 rok przy customowych okresach).
- `show_forecast?: boolean`  
  - Czy prezentować prognozę końcowego zużycia bieżącego okresu.
- `precision?: number`  
  - Liczba miejsc po przecinku do prezentacji wartości.
- `debug?: boolean`  
  - Opcjonalne włączenie dodatkowych logów w konsoli.

Validation rules:
- `entity` nie może być pusty.
- `comparison_mode` musi być jedną z dozwolonych wartości.
- Jeśli `aggregation` nie jest podane:
  - Dla `year_over_year` → `"day"`.
  - Dla `month_over_year` → `"day"` domyślnie, z możliwością późniejszej zmiany.

---

## 2. Comparison Periods

### Entity: `ComparisonPeriod`

Opisuje parę porównywanych okresów czasu.

Fields:
- `current_start: Date`  
- `current_end: Date`  
- `reference_start: Date`  
- `reference_end: Date`  
- `aggregation: "day" | "week" | "month"`  
- `time_zone: string`  (np. `Europe/Warsaw`)

Validation rules:
- `current_start < current_end`, `reference_start < reference_end`.
- `aggregation` spójne z zapytaniami LTS i oczekiwaną rozdzielczością wykresu.

State transitions:
- Wyznaczane na podstawie:
  - Bieżącej daty (`now` z HA).
  - Wybranego `comparison_mode`.
  - Opcjonalnego `period_offset`.

---

## 3. Long-Term Statistics (LTS) API Model

### Entity: `LtsStatisticsQuery`

Reprezentuje zapytanie wysyłane przez `ha-api.ts`.

Fields (uproszczone):
- `type: "recorder/statistics_during_period"`  
- `start_time: string`  (ISO 8601, w strefie `time_zone` lub UTC)
- `end_time: string`  
- `statistic_ids: string[]`  (np. `[entity]`)
- `period?: "5minute" | "hour" | "day" | "week" | "month"`  
  - Ustalona na podstawie `aggregation`.
- `units?: "kWh" | string` (opcjonalnie, zależnie od API HA / konfiguracji).

### Entity: `LtsStatisticPoint`

Przykładowy kształt pojedynczego punktu odpowiedzi LTS (uproszczony):

Fields:
- `start: string`  (timestamp początku przedziału)
- `mean?: number`  
- `sum?: number`  
- `state?: number`  
- `unit_of_measurement?: string`

Uwagi:
- W zależności od konfiguracji statystyk HA:
  - Energię często otrzymujemy w polu `sum` lub `state`.
  - `mean` może być użyteczna dla mocy, ale tutaj zwykle opieramy się na `sum`.

### Entity: `LtsStatisticsResponse`

Fields:
- `results: Record<string, LtsStatisticPoint[]>`  
  - Indeksowane po `statistic_id` (zwykle identyczne z `entity`).

Validation rules:
- Sprawdzenie, że `results[entity]` istnieje i zawiera co najmniej jeden punkt.
- Sprawdzenie spójności jednostek (`unit_of_measurement`).

---

## 4. Internal Time Series Model

### Entity: `TimeSeriesPoint`

Reprezentuje pojedynczy punkt serii do wizualizacji.

Fields:
- `timestamp: number`  (ms od epoch, do łatwego użycia w Chart.js)
- `value: number`      (wartość w jednostkach energii, np. kWh)
- `rawValue?: number`  (opcjonalnie oryginalna wartość z LTS)
- `label?: string`     (np. sformatowana data dla osi X)

### Entity: `CumulativeSeries`

Fields:
- `points: TimeSeriesPoint[]`  
  - Posortowane rosnąco po `timestamp`.
- `unit: string`       (np. `"kWh"`)
- `periodLabel: string`  
  - Opis, np. `"Bieżący rok"`, `"Poprzedni rok"`, `"Bieżący miesiąc"`.
- `total: number`      (skumulowana wartość na końcu okresu, jeśli kompletna)

Validation rules:
- `points` rosnące po `timestamp`.
- Brakujące punkty mogą być:
  - albo pomijane (dziury w serii),
  - albo wypełniane przy budowaniu serii skumulowanej (z ostatnią znaną wartością) – decyzja implementacyjna w `ha-api` / warstwie przetwarzania.

### Entity: `ComparisonSeries`

Fields:
- `current: CumulativeSeries`
- `reference?: CumulativeSeries`  (może być `undefined`, jeśli brak danych porównawczych)
- `aggregation: "day" | "week" | "month"`
- `time_zone: string`

---

## 5. Summary and Forecast Model

### Entity: `SummaryStats`

Fields:
- `current_cumulative: number`        (wartość skumulowana do „dziś” w bieżącym okresie)
- `reference_cumulative?: number`     (skumulowana wartość do analogicznego dnia w okresie referencyjnym)
- `difference?: number`               (`current_cumulative - reference_cumulative` jeśli obie dostępne)
- `differencePercent?: number`        (procentowa różnica, jeśli możliwa do wyliczenia)
- `unit: string`

Validation rules:
- `reference_cumulative` i pola zależne są ustawiane tylko, jeśli dane referencyjne są kompletne dla porównywanego dnia.

### Entity: `ForecastStats`

Fields:
- `enabled: boolean`
- `forecast_total?: number`
- `reference_total?: number`
- `confidence: "low" | "medium" | "high"`  (heurystyczna ocena na bazie liczby punktów)
- `unit: string`

Business rules:
- `enabled == true` tylko, jeśli:
  - liczba punktów w `current` >= minimalny próg (np. 5).
  - istnieje sensowna estymacja średniego dziennego zużycia.

---

## 6. UI State Model

### Entity: `CardState`

Fields:
- `status: "loading" | "error" | "no-data" | "ready"`  
- `errorMessage?: string`
- `comparisonSeries?: ComparisonSeries`
- `summary?: SummaryStats`
- `forecast?: ForecastStats`

State transitions:
- `loading` → przy zmianie konfiguracji (`setConfig`) lub odświeżeniu `hass`.
- `loading` → `ready` gdy dane LTS zostały poprawnie pobrane i przetworzone.
- `loading` → `no-data` gdy brak danych dla obu okresów.
- `loading` → `error` przy błędach API, nieprawidłowej konfiguracji, braku `entity`.

---

## 7. Mapping to Chart.js

### Entity: `ChartSeriesConfig`

Fields:
- `label: string`
- `data: { x: number; y: number }[]`  (timestamp/value)
- `borderColor: string`
- `backgroundColor: CanvasGradient | string`
- `pointRadius: number`
- `borderWidth: number`
- `tension: number`  (wygładzenie linii)

### Entity: `ChartConfig`

Fields:
- `datasets: ChartSeriesConfig[]`
- `xAxisConfig: object`  (konkretny typ z Chart.js w implementacji)
- `yAxisConfig: object`
- `tooltipConfig: object`
- `legendConfig: object`

Źródło:
- `ComparisonSeries` + dane z `theme-utils` → `ChartConfig`.


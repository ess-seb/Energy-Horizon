# Quickstart: Implementacja `computeForecast` (001-compute-forecast)

**Dla**: Junior Developer / Tańszy model AI  
**Date**: 2026-03-19  
**Pełna spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Model danych**: [data-model.md](./data-model.md) | **Kontrakt**: [contracts/compute-forecast.ts](./contracts/compute-forecast.ts)

---

## Cel w jednym zdaniu

Zmodyfikować funkcję `computeForecast` i typ `ForecastStats` tak, żeby progi aktywacji prognozy
były oparte na procencie okresu, punkt podziału serii referencyjnej był wyznaczany po czasie
(nie indeksie), a anomalny rok referencyjny był wykrywany i flagowany.

---

## Pliki do zmodyfikowania (tylko te 4)

| Plik | Co zmienić |
|------|-----------|
| `src/card/types.ts` | Dodać `anomalousReference?: boolean` do `ForecastStats` |
| `src/card/ha-api.ts` | Nowa implementacja `computeForecast`; usunąć `MIN_POINTS_FOR_FORECAST` |
| `src/card/cumulative-comparison-chart.ts` | Zaktualizować call-site w `_loadData()` |
| `tests/unit/ha-api.test.ts` | Rozszerzyć o testy `computeForecast` (min. 10 przypadków) |

**NIE modyfikować**: `computeSummary`, `computeTextSummary`, `buildFullTimeline`, chart renderer, echarts-renderer.

---

## Krok 1: `src/card/types.ts`

Dodać pole do interfejsu `ForecastStats`:

```typescript
export interface ForecastStats {
  enabled: boolean;
  forecast_total?: number;
  reference_total?: number;
  confidence: "low" | "medium" | "high";
  unit: string;
  anomalousReference?: boolean;   // ← DODAJ TO
}
```

---

## Krok 2: `src/card/ha-api.ts`

### 2a. Usuń stałą (linia 15)

```typescript
// USUŃ tę linię:
const MIN_POINTS_FOR_FORECAST = 5;
```

### 2b. Zastąp całą implementację `computeForecast`

Nowa sygnatura: `computeForecast(series: ComparisonSeries, periodTotalBuckets: number): ForecastStats`

Pseudokod implementacji (zgodny z kolejnością z `research.md`):

```typescript
export function computeForecast(
  series: ComparisonSeries,
  periodTotalBuckets: number
): ForecastStats {
  const disabled = (unit: string): ForecastStats =>
    ({ enabled: false, confidence: "low", unit });

  const currentPoints = series.current.points;
  const unit = series.current.unit;

  // Guard 1: brak sensu obliczeń
  if (periodTotalBuckets <= 0 || currentPoints.length === 0) {
    return disabled(unit);
  }

  // Guard 2: próg procentowy
  const completedBuckets = currentPoints.length - 1;
  const pct = completedBuckets / periodTotalBuckets;
  if (completedBuckets < 3 || pct < 0.05) {
    return disabled(unit);
  }

  // Guard 3: seria referencyjna
  const referencePoints = series.reference?.points;
  if (!referencePoints || referencePoints.length === 0) {
    return disabled(unit);
  }

  // splitIdx — wyznaczanie po czasie
  const currentRangeMs =
    currentPoints[completedBuckets - 1].timestamp - currentPoints[0].timestamp;
  const cutoffTs = currentPoints[0].timestamp + currentRangeMs;
  let splitIdx = -1;
  for (let i = referencePoints.length - 1; i >= 0; i--) {
    if (referencePoints[i].timestamp <= cutoffTs) {
      splitIdx = i;
      break;
    }
  }
  if (splitIdx === -1) return disabled(unit);

  // B — suma referencji do splitIdx
  const B = referencePoints
    .slice(0, splitIdx + 1)
    .reduce((acc, p) => acc + (p.rawValue ?? 0), 0);
  if (!Number.isFinite(B) || B <= 0) return disabled(unit);

  // A — suma bieżąca
  const A = currentPoints
    .slice(0, completedBuckets)
    .reduce((acc, p) => acc + (p.rawValue ?? 0), 0);

  const rawTrend = A / B;
  const anomalousReference = rawTrend < 0.3 || rawTrend > 3.3;

  // confidence
  let confidence: ForecastStats["confidence"] =
    pct >= 0.40 ? "high" : pct >= 0.20 ? "medium" : "low";
  if (anomalousReference) confidence = "low";

  const trend = Math.min(5, Math.max(0.2, rawTrend));

  // C — reszta referencji
  const C = referencePoints
    .slice(splitIdx + 1)
    .reduce((acc, p) => acc + (p.rawValue ?? 0), 0);

  const referenceTotal = B + C;
  const forecast_total = A + C * trend;

  const result: ForecastStats = {
    enabled: true,
    forecast_total,
    reference_total: referenceTotal,
    confidence,
    unit
  };
  if (anomalousReference) result.anomalousReference = true;
  return result;
}
```

---

## Krok 3: `src/card/cumulative-comparison-chart.ts`

W metodzie `_loadData()` — zaktualizować wywołanie `computeForecast` (okolice linii 256):

```typescript
// PRZED:
const forecast = computeForecast(series);

// PO:
const fullEnd = this._computeFullEnd(period);
const fullTimeline = buildFullTimeline(period, fullEnd);
const forecast = computeForecast(series, fullTimeline.length);
```

`buildFullTimeline` jest już importowane z `./ha-api` (linia 11). `_computeFullEnd` jest już metodą
prywatną klasy — dostępna wewnątrz `_loadData`.

---

## Krok 4: `tests/unit/ha-api.test.ts`

Dodać describe block `computeForecast` z min. 10 przypadkami pokrywającymi:

| # | Scenariusz | Expected |
|---|-----------|----------|
| 1 | 2/365 bucketów (pct ≈ 0.003) | `enabled: false` |
| 2 | 4/30 bucketów (pct ≈ 0.13) | `enabled: true`, `confidence: "low"` |
| 3 | 7/30 bucketów (pct ≈ 0.23) | `enabled: true`, `confidence: "medium"` |
| 4 | 13/30 bucketów (pct ≈ 0.43) | `enabled: true`, `confidence: "high"` |
| 5 | rawTrend = 4.0 (anomalny) | `anomalousReference: true`, `confidence: "low"`, `enabled: true` |
| 6 | rawTrend = 0.2 (anomalny) | `anomalousReference: true`, `confidence: "low"`, `enabled: true` |
| 7 | rawTrend = 1.1 (normalny) | `anomalousReference` nieobecne/false |
| 8 | C = 0 (ref kończy się na splitIdx) | `enabled: true`, `forecast_total = A` |
| 9 | seria bieżąca z luką czasową | `splitIdx` poprawny (czas, nie indeks) |
| 10 | brak serii referencyjnej | `enabled: false` |
| 11 | periodTotalBuckets = 0 | `enabled: false` |
| 12 | B = 0 (rawTrend = Infinity) | `enabled: false` |
| 13 | completedBuckets = 2 (< 3) | `enabled: false` |
| 14 | splitIdx = -1 (wszystkie ref późniejsze) | `enabled: false` |
| 15 | rawTrend = 3.3 dokładnie (granica) | `anomalousReference` nieobecne/false |

---

## Weryfikacja

```bash
npm test
npm run lint
```

Wszystkie testy muszą przejść. Brak nowych błędów TypeScript. Brak zmian w testach
`computeSummary`, `computeTextSummary`, `buildFullTimeline`.

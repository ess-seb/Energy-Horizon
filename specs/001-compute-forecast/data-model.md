# Data Model: Ulepszone obliczanie prognozy (computeForecast)

**Phase**: 1 | **Date**: 2026-03-19 | **Plan**: [plan.md](./plan.md)

---

## Encje i typy

### `ForecastStats` — ZMIENIONY (plik: `src/card/types.ts`)

Wynik funkcji `computeForecast`. Zmiany względem obecnej wersji: dodanie opcjonalnego pola `anomalousReference`.

```typescript
export interface ForecastStats {
  enabled: boolean;
  forecast_total?: number;
  reference_total?: number;
  confidence: "low" | "medium" | "high";
  unit: string;
  anomalousReference?: boolean;   // NEW — true gdy rawTrend < 0.3 || rawTrend > 3.3
}
```

**Validation rules**:
- `enabled: false` → `forecast_total` i `anomalousReference` mogą być nieobecne
- `enabled: true` → `forecast_total` zawsze ustawione
- `anomalousReference` nieobecne ≡ `false` (kontrakt dla kodu UI — spec Assumptions)
- `confidence` jest zawsze ustawione niezależnie od `enabled`

**State transitions**:

```
[wejście] periodTotalBuckets <= 0 OR completedBuckets < 3 OR pct < 0.05
  → { enabled: false, confidence: "low", unit }

[wejście] brak referencePoints OR splitIdx = -1 OR B = 0
  → { enabled: false, confidence: "low", unit }

[obliczenia OK, C >= 0]
  → { enabled: true, forecast_total, confidence, unit, anomalousReference? }
```

---

### `TimeSeriesPoint` — BEZ ZMIAN (plik: `src/card/types.ts`)

```typescript
export interface TimeSeriesPoint {
  timestamp: number;   // Unix ms
  value: number;       // wartość skumulowana
  rawValue?: number;   // wartość surowa (niezsumowana) bucketu
  label?: string;
}
```

**Uwaga dla `computeForecast`**: Funkcja używa wyłącznie `timestamp` i `rawValue` z punktów.
`rawValue` w istniejącym kodzie jest zawsze ustawiane przez `normalizePoints()` przed
przekazaniem do `toCumulativeSeries` — `rawValue ?? 0` jest bezpiecznym fallback'iem.

---

### `ComparisonSeries` — BEZ ZMIAN (plik: `src/card/types.ts`)

```typescript
export interface ComparisonSeries {
  current: CumulativeSeries;       // punkty bieżące (posortowane rosnąco po timestamp)
  reference?: CumulativeSeries;    // punkty referencyjne (posortowane rosnąco po timestamp)
  aggregation: "day" | "week" | "month";
  time_zone: string;
}
```

---

## Wewnętrzne zmienne algorytmu `computeForecast`

Nie są częścią publicznego API — udokumentowane dla implementatora.

| Zmienna | Typ | Opis |
|---------|-----|------|
| `completedBuckets` | `number` | `currentPoints.length - 1` — liczba pełnych bucketów |
| `pct` | `number` | `completedBuckets / periodTotalBuckets` — procent okresu |
| `currentRangeMs` | `number` | `currentPoints[completedBuckets-1].timestamp - currentPoints[0].timestamp` |
| `splitIdx` | `number` | Największy indeks `i` w `referencePoints` gdzie `ref[i].timestamp <= currentPoints[0].timestamp + currentRangeMs`; `-1` gdy brak |
| `A` | `number` | `sum(currentPoints[0..completedBuckets-1].rawValue)` |
| `B` | `number` | `sum(referencePoints[0..splitIdx].rawValue)` |
| `C` | `number` | `sum(referencePoints[splitIdx+1..end].rawValue)` |
| `rawTrend` | `number` | `A / B` — surowy współczynnik trendu (przed clampem) |
| `trend` | `number` | `Math.min(5, Math.max(0.2, rawTrend))` — po clampie |
| `anomalousReference` | `boolean` | `rawTrend < 0.3 \|\| rawTrend > 3.3` |

---

## Diagram przepływu algorytmu

```
computeForecast(series, periodTotalBuckets)
│
├─ periodTotalBuckets <= 0 ──────────────────────────────► { enabled: false }
├─ currentPoints.length = 0 ─────────────────────────────► { enabled: false }
│
├─ completedBuckets = length - 1
├─ pct = completedBuckets / periodTotalBuckets
│
├─ completedBuckets < 3 ─────────────────────────────────► { enabled: false }
├─ pct < 0.05 ───────────────────────────────────────────► { enabled: false }
│
├─ referencePoints empty/null ───────────────────────────► { enabled: false }
│
├─ currentRangeMs = ref[0].ts + (cur[last].ts - cur[0].ts)
│  splitIdx = findLastIndex(ref, ts <= currentRangeMs limit)
├─ splitIdx = -1 ────────────────────────────────────────► { enabled: false }
│
├─ B = sum(ref[0..splitIdx].rawValue)
├─ B <= 0 ───────────────────────────────────────────────► { enabled: false }
│
├─ A = sum(cur[0..completedBuckets-1].rawValue)
├─ rawTrend = A / B
├─ anomalousReference = rawTrend < 0.3 || rawTrend > 3.3
│
├─ confidence = pct >= 0.40 ? "high" : pct >= 0.20 ? "medium" : "low"
│  jeśli anomalousReference → confidence = "low"  (nadpisanie)
│
├─ trend = clamp(rawTrend, 0.2, 5)
├─ C = sum(ref[splitIdx+1..end].rawValue)
├─ forecast_total = A + C * trend
│
└─► { enabled: true, forecast_total, confidence, anomalousReference?, unit }
```

---

## Usunięte encje

| Nazwa | Lokalizacja | Powód usunięcia |
|-------|------------|-----------------|
| `MIN_POINTS_FOR_FORECAST` (stała = 5) | `src/card/ha-api.ts` linia 15 | FR-016: zastąpiona wbudowanym floor = 3 (nie-eksportowanym) |

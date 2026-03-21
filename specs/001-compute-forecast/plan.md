# Implementation Plan: Ulepszone obliczanie prognozy (computeForecast)

**Branch**: `001-compute-forecast` | **Date**: 2026-03-19 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-compute-forecast/spec.md`

## Summary

Przebudowa funkcji `computeForecast` w `src/card/ha-api.ts`: zastąpienie progu bezwzględnego (stała `MIN_POINTS_FOR_FORECAST = 5`) progiem procentowym (completedBuckets / periodTotalBuckets), wyrównanie serii referencyjnej po czasie (nie indeksie), detekcja anomalnego roku referencyjnego oraz obsługa przypadku C = 0. Zmiana obejmuje typ `ForecastStats` (+pole `anomalousReference?`), sygnaturę `computeForecast` (+arg `periodTotalBuckets`) oraz call-site w `cumulative-comparison-chart.ts`.

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020+, `strict` enabled)  
**Primary Dependencies**: Lit 3.1 (LitElement) — bez nowych zależności  
**Storage**: N/A — przetwarzanie in-browser, dane read-only z HA  
**Testing**: Vitest 2 (`tests/unit/`)  
**Target Platform**: Przeglądarka (Home Assistant Lovelace card)  
**Project Type**: Biblioteka/Web Component (karta Lovelace HA)  
**Performance Goals**: Obliczenia <1 ms (kilkaset punktów max); brak blokowania głównego wątku  
**Constraints**: Żadnych nowych zależności NPM; zmiany tylko w `ha-api.ts`, `types.ts`, `cumulative-comparison-chart.ts`; brak regresji w `computeSummary`, `computeTextSummary`, chart renderer  
**Scale/Scope**: 1 plik logiki (`ha-api.ts`), 1 plik typów (`types.ts`), 1 call-site (`cumulative-comparison-chart.ts`), 1 plik testów (`tests/unit/ha-api.test.ts` — rozszerzony)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| I. Zgodność z HA/HACS API | ✅ PASS | Zmiana czysto in-browser; żaden publiczny API kart HA nie jest dotknięty |
| II. Bezpieczeństwo — sanityzacja wejść | ✅ PASS | `periodTotalBuckets <= 0` → `enabled: false`; dzielenie przez zero wyeliminowane |
| II. Defensywne operacje na danych | ✅ PASS | Wszystkie edge cases pokryte w spec (C=0, B=0, splitIdx=-1, pusta seria) |
| III. TypeScript strict | ✅ PASS | Nowe pole `anomalousReference?: boolean` jest opcjonalne; brak `any` |
| III. Pokrycie testami | ✅ PASS | Testy jednostkowe wymagane dla wszystkich FR (min. 10 przypadków wg SC-002) |
| III. Brak zmian łamiących public API | ✅ PASS | SC-005: `computeSummary`, `computeTextSummary`, renderer bez zmian |
| V. Prostota | ✅ PASS | Jeden plik logiki, zero nowych zależności, algorytm w ~60 wierszach |

**Post-design re-check** (po fazie 1): Patrz sekcja Complexity Tracking — brak naruszeń.

## Project Structure

### Documentation (this feature)

```text
specs/001-compute-forecast/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── compute-forecast.ts   # Phase 1 output — TypeScript signature contract
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (affected files only)

```text
src/card/
├── types.ts                         # MODIFY: ForecastStats += anomalousReference?: boolean
├── ha-api.ts                        # MODIFY: computeForecast (logika + sygnatura)
└── cumulative-comparison-chart.ts   # MODIFY: call-site computeForecast (przekazanie fullTimeline.length)

tests/unit/
└── ha-api.test.ts                   # MODIFY: rozszerzone testy computeForecast (min. 10 przypadków)
```

**Structure Decision**: Single project — Option 1. Zmiany dotyczą wyłącznie 3 plików źródłowych i 1 pliku testowego. Brak nowych plików źródłowych.

## Complexity Tracking

> Brak naruszeń konstytucji — sekcja niewymagana.

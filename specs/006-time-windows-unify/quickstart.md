# Quickstart: 006-time-windows-unify

## Pre-flight (przed zmianą osi / timeline)

Sprawdź spójność z kontraktem **[contracts/unified-time-windows-axis.md](./contracts/unified-time-windows-axis.md)**:

- **FR-B**: Tablica `timeline[]` (ms): **prefix** z okna 0, potem **tail** ordinalny do osiągnięcia FR-C; etykiety zgodne z tym łańcuchem; wymiary etykiet porównawczych (rok / dzień) — `comparison-label-hints` + adaptive axis/tooltip.
- **FR-C**: Dla `windows.length >= 2`, `timeline.length` = **max** liczby slotów nominalnych przy `windows[0].aggregation` (nie wall-clock jako jedyne kryterium).
- **„Now” / FR-G**: indeks i carry-forward z bucketa okna 0 (`findNowSlotIndexOnComparisonAxis`, prefix `buildTimelineSlots` dla okna bieżącego), nie z `contains(now)` na złym kalendarzu referencji.
- **FR-D**: `forecastPeriodBuckets` zawsze z okna indeksu **0**; kod prognozy musi działać przy `timeline.length > forecastPeriodBuckets`.
- **Wskaźniki plików**: `src/card/ha-api.ts` (`buildChartTimeline`, `buildFullTimelineForWindows`, `advanceSlotStartMs`, `findNowSlotIndexOnComparisonAxis`), `src/card/cumulative-comparison-chart.ts`, `src/card/echarts-renderer.ts`, `src/card/labels/comparison-label-hints.ts`, `tests/unit/ha-api.test.ts`, [golden-scenarios.md](./golden-scenarios.md).

## Testy

```bash
cd "/Users/admin/Projekty Local/Energy-Horizon"
npm test
npm run lint
```

Priorytetowe pliki testów do rozszerzenia przy tej funkcji:

- `tests/unit/time-windows-*.test.ts` — merge, resolve, walidacja
- `tests/unit/ha-api.test.ts` (lub odpowiednik) — `buildChartTimeline`, `countBucketsForWindow`, `buildFullTimelineForWindows`
- Testy wykresu / renderera — oś, tooltip (tylko 0+1 przy kontekście)

## Kod do przejrzenia przed zmianami

| Obszar | Plik |
|--------|------|
| Merge + strip flag | `src/card/time-windows/merge-config.ts` |
| Resolve legacy / generic | `src/card/time-windows/resolve-windows.ts` |
| Timeline + prognoza buckets | `src/card/ha-api.ts` (`buildChartTimeline`, `buildFullTimelineForWindows`, …) |
| Karta | `src/card/cumulative-comparison-chart.ts` |
| Podpisy okresów | `src/card/labels/compact-period-caption.ts` |

## Dokumentacja

Po zmianach zachowania zsynchronizuj:

- `specs/001-time-windows-engine/` (jeśli konflikt z nową prawdą)
- `specs/001-aggregation-axis-labels/`, `specs/001-compute-forecast/`
- `wiki-publish/Mental-Model-Comparisons-and-Timelines.md` (+ powiązane)
- `README.md`, `README.advanced.md`, `changelog.md`

## Kontrakty tej funkcji

- [contracts/unified-time-windows-axis.md](./contracts/unified-time-windows-axis.md)

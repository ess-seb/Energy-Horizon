# Implementation Plan: Migracja Chart.js → Apache ECharts

**Branch**: `003-echarts-migration` | **Date**: 2026-03-18 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/003-echarts-migration/spec.md`

---

## Summary

Migracja warstwy renderowania wykresu w `EnergyHorizonCard` z Chart.js 4 (z custom canvas-pluginem dla markera „dziś") na Apache ECharts 5.6 (modularny import, natywne `markLine` / `markPoint` / `areaStyle`). Nowa klasa `EChartsRenderer` implementuje ten sam publiczny interfejs co `ChartRenderer` (`update` / `destroy`); logika biznesowa w `cumulative-comparison-chart.ts` pozostaje niezmieniona poza zamianą konstruktora renderera i zmiany selektora z `canvas` na div kontenera.

---

## Technical Context

**Language/Version**: TypeScript 5.6 (ES2020+, `strict` enabled)  
**Primary Dependencies**: Lit 3.1 (LitElement), Apache ECharts 5.6.0 (modularny — `echarts/core`, `echarts/charts`, `echarts/components`, `echarts/renderers`), Vite 6 (bundler), Vitest 2 (testy)  
**Storage**: N/A — przetwarzanie in-browser, dane read-only z HA  
**Testing**: Vitest 2 z jsdom; testy jednostkowe dla: cyklu życia instancji ECharts, braku Canvas API, struktury ECOption  
**Target Platform**: Home Assistant Lovelace (nowoczesna przeglądarka, Shadow DOM / Lit Web Component)  
**Project Type**: Lovelace card library (Web Component / HACS)  
**Performance Goals**: Czas pierwszego renderowania ≤ czas z Chart.js; brak blokowania głównego wątku  
**Constraints**: Brak global import ECharts; brak Canvas API poza ECharts; bundle nie wzrasta o >50 kB gzip; tooltip działający w Shadow DOM  
**Scale/Scope**: 1 nowy plik renderera (~200–300 LOC), minimalna modyfikacja `cumulative-comparison-chart.ts` (1–2 linie), usunięcie 2 zależności npm

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| **I. Zgodność z HA/HACS** | ✅ PASS | Renderer działa in-browser przez Lit Web Component; nie narusza żadnych wzorców HA API |
| **II. Bezpieczeństwo** | ✅ PASS | Brak wstrzykiwania zewnętrznych danych do canvas; dane z HA są typowane i walidowane upstream |
| **III. Jakość kodu** | ✅ PASS | TypeScript strict, modularny ECharts, Vitest unit testy dla logiki ECharts-specyficznej |
| **IV. UX/UI** | ✅ PASS | Zachowanie 1:1 z Chart.js (FR-001–FR-013); responsywność przez ResizeObserver (FR-018) |
| **V. Wydajność i prostota** | ✅ PASS | Eliminacja custom canvas hacków = redukcja złożoności; modularny import = optymalizacja bundle |
| **Zewnętrzne zależności** | ✅ PASS | ECharts jest lekki w trybie modularnym, szeroko stosowany, dobrze utrzymany; zastępuje Chart.js + adapter |

**Post-Phase 1 re-check**: Wymagana po wygenerowaniu data-model.md — patrz sekcja na końcu dokumentu.

---

## Project Structure

### Documentation (this feature)

```text
specs/003-echarts-migration/
├── plan.md              ← Ten plik
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks — NIE generowane przez /speckit.plan)
```

### Source Code (repository root)

```text
src/
└── card/
    ├── echarts-renderer.ts          ← NOWY plik (główny produkt tej migracji)
    ├── chart-renderer.ts            ← USUWANY po migracji (lub pozostaje jako dead code do weryfikacji)
    ├── cumulative-comparison-chart.ts  ← MODYFIKOWANY (2 linie: selektor + konstruktor)
    └── types.ts                     ← BEZ ZMIAN (ChartRendererConfig pozostaje)

tests/
└── unit/
    └── echarts-renderer.test.ts     ← NOWY plik testów jednostkowych
```

**Structure Decision**: Single-project, wariant „library/card". Jedyna znacząca zmiana w source tree to nowy `echarts-renderer.ts` i jego test. Nie ma potrzeby tworzenia nowych katalogów.

---

## Complexity Tracking

> Brak naruszeń konstytucji wymagających uzasadnienia — nie wypełniać.

---

## Post-Phase 1 Constitution Re-check

*(Uzupełnić po wygenerowaniu data-model.md)*

| Gate | Status | Notes |
|------|--------|-------|
| **III. Jakość kodu** | ✅ PASS | Typy ECOption i interfejs `EChartsRenderer` są w pełni typowane; `alignSeriesOnTimeline` przeniesiona 1:1 |
| **V. Prostota** | ✅ PASS | `EChartsRenderer` zastępuje 419-liniowy `chart-renderer.ts` (z canvas hackami) ekwiwalentną implementacją bez żadnych własnych operacji rysowania |

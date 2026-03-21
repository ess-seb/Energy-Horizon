# Data Model: ECharts Migration

**Feature**: `003-echarts-migration` | **Date**: 2026-03-18

---

## Encje / klasy

### 1. `EChartsRenderer` (nowa klasa)

**Plik**: `src/card/echarts-renderer.ts`  
**Zastępuje**: `src/card/chart-renderer.ts` → `ChartRenderer`

```ts
import type { ComparisonSeries, ChartRendererConfig, TimeSeriesPoint } from './types';
import type { ECharts } from 'echarts/core';

class EChartsRenderer {
  // Prywatne pola
  private readonly container: HTMLElement;
  private instance: ECharts | undefined;
  private readonly resizeObserver: ResizeObserver;
  private lastHash: string | undefined;

  // Konstruktor
  constructor(container: HTMLElement): void

  // Publiczne metody (interfejs identyczny z ChartRenderer)
  update(
    series: ComparisonSeries,
    fullTimeline: number[],
    rendererConfig: ChartRendererConfig,
    labels: { current: string; reference: string }
  ): void

  destroy(): void

  // Prywatne metody pomocnicze
  private alignSeriesOnTimeline(
    points: TimeSeriesPoint[],
    timeline: number[],
    referenceStart?: Date
  ): (number | null)[]

  private resolveColor(primaryColorConfig: string): string

  private getThemeColors(): { referenceLine: string; grid: string }

  private buildOption(
    currentValues: (number | null)[],
    referenceValues: (number | null)[],
    fullTimeline: number[],
    rendererConfig: ChartRendererConfig,
    labels: { current: string; reference: string },
    primaryColor: string,
    theme: { referenceLine: string; grid: string }
  ): ECOption

  private niceMax(dataMax: number, splitCount: number): number
}
```

#### Cykl życia

```
constructor(container)
  → echarts.init(container)
  → ResizeObserver.observe(container)

update(series, fullTimeline, rendererConfig, labels)
  → alignSeriesOnTimeline × 2
  → hash check (return early if same)
  → resolveColor + getThemeColors
  → buildOption → ECOption
  → instance.setOption(option, { notMerge: true })

destroy()
  → resizeObserver.disconnect()
  → instance.dispose()
  → instance = undefined
```

---

### 2. `ECOption` — kształt obiektu konfiguracji ECharts

**Typ źródłowy**: `ECOption` z `echarts/core` (alias `EChartsOption`)

```ts
type ECOption = {
  animation: false;

  grid: {
    containLabel: boolean;  // true — labels nie są przycinane
  };

  xAxis: {
    type: 'value';
    min: 0;
    max: number;            // fullTimeline.length - 1
    interval: 1;
    axisLabel: {
      show: boolean;        // true
    };
    splitLine: {
      show: false;          // FR-009: pionowe linie siatki wyłączone
    };
    name: string;           // rendererConfig.periodLabel (FR-022)
    nameLocation: 'end';
  };

  yAxis: {
    type: 'value';
    min: 0;
    max: number;            // niceMax(dataMax, 4) — obliczone przed budowaniem opcji
    splitNumber: 4;         // FR-007: 5 ticków (0 + 4 odstępy)
    axisLabel: {
      formatter: (value: number) => string;  // FR-008: unit przy najwyższym ticku
    };
    splitLine: {
      lineStyle: { color: string };  // theme.grid
    };
  };

  legend: {
    show: true;             // FR-011
  };

  tooltip: {
    trigger: 'axis';
    axisPointer: { type: 'shadow' | 'cross' };
    appendTo: HTMLElement;  // FR-010: Shadow DOM fix
  };

  series: EChartsSeries[];  // patrz poniżej
};
```

---

### 3. `EChartsSeries` — warianty serii

#### 3a. Seria bieżąca (current)

```ts
{
  type: 'line',
  name: string,                        // labels.current
  data: (number | null)[],             // currentValues aligned on timeline
  lineStyle: { color: string, width: 1.5 },
  areaStyle: { opacity: number } | { opacity: 0 },   // FR-005
  connectNulls: false,                 // FR-002
  showSymbol: false,
  smooth: false,
  markLine: MarkLineOption,            // FR-003/FR-004: marker "dziś"
  markPoint: MarkPointOption           // FR-003: kropka na current Y
}
```

#### 3b. Seria referencyjna (reference) — opcjonalna

```ts
{
  type: 'line',
  name: string,                        // labels.reference
  data: (number | null)[],             // referenceValues aligned on timeline
  lineStyle: { color: string, width: 1.5 },
  areaStyle: { opacity: number } | { opacity: 0 },
  connectNulls: false,
  showSymbol: false,
  smooth: false,
  markPoint: MarkPointOption           // FR-003: kropka na reference Y
}
```

#### 3c. Seria prognozy — opcjonalna (FR-006)

```ts
{
  type: 'line',
  name: 'Forecast',
  data: [[todaySlotIndex, todayCurrentY], [lastSlotIndex, forecastTotal]],
  lineStyle: { type: 'dashed', color: string, width: 1.5 },
  areaStyle: { opacity: 0 },
  showSymbol: false,
  connectNulls: false
}
```

Warunek włączenia: `showForecast && todaySlotIndex >= 0 && todayCurrentY !== null && forecastTotal !== undefined`

#### 3d. Dashed null-gap overlay (opcjonalna)

Gdy w YAML ustawiono flagę logiczna `connect_nulls: true` (domyslnie), renderer dodaje dodatkowa serie liniowa "overlay" dla luki `null`:
- przerywana linia (`lineStyle.type: 'dashed'`)
- bez wypelnienia (`areaStyle.opacity: 0`)
- interpolacja liniowa liczona tylko wewnatrz spójnej luki `null` (miedzy dwoma sasiadujacymi punktami non-null)
- poza lukami pozostaja `null`

Uwaga: solid series nadal ma gapy (connectNulls: false), overlay to tylko wizualna wskazowka.

---

### 4. `MarkLineOption` — marker „dziś" (linia przerywana)

Dwa przypadki z `research.md`:

**Wariant A** — przynajmniej jedna seria ma wartość w slocie dzisiejszym:
```ts
markLine: {
  silent: true,
  symbol: ['none', 'none'],
  data: [[
    { coord: [todaySlotIndex, 0] },
    { coord: [todaySlotIndex, yTop] }
  ]],
  lineStyle: { type: 'dashed', color: primaryColor, width: 1.5 }
}
```
`yTop = Math.max(currentY ?? 0, referenceY ?? 0)` (przy czym wartość `null` = 0 w tym porównaniu; `null` oznacza nieobecność, ale linię rysujemy do wartości niezerowej serii jak w FR-004).

Korekta per FR-004: jeśli `currentY === null && referenceY !== null` → `yTop = referenceY`.  
Jeśli `currentY !== null && referenceY === null` → `yTop = currentY`.  
Jeśli oba non-null → `yTop = Math.max(currentY, referenceY)`.

**Wariant B** — obie serie mają `null`:
```ts
markLine: {
  silent: true,
  symbol: ['none', 'none'],
  data: [{ xAxis: todaySlotIndex }],
  lineStyle: { type: 'dashed', color: primaryColor, width: 1.5 }
}
```
(linia biegnie do górnej krawędzi — domyślne zachowanie ECharts xAxis markLine)

---

### 5. `MarkPointOption` — kropki przy wartościach

```ts
markPoint: {
  silent: true,
  symbol: 'circle',
  symbolSize: 6,
  data: [
    { coord: [todaySlotIndex, todayY], itemStyle: { color: seriesColor } }
  ]
  // data jest pusta gdy todayY === null (marker nie jest wyświetlany)
}
```

---

### 6. Funkcja `niceMax(dataMax, splitCount)` — pomocnicza

```ts
function niceMax(dataMax: number, splitCount: number): number
```

**Wejście**: `dataMax: number` — maksimum ze wszystkich non-null wartości serii; `splitCount: number` — liczba odstępów (4 dla 5 ticków)  
**Wyjście**: `number` — zaokrąglona "ładna" wartość max identyczna z tym co ECharts obliczy wewnętrznie

**Algorytm (uproszczony)**:
1. Jeśli `dataMax <= 0`, zwróć `splitCount` (minimum sensowna wartość)
2. Oblicz `step = Math.pow(10, Math.floor(Math.log10(dataMax / splitCount)))`
3. `niceStep = step * (round up dataMax/splitCount/step to [1,2,2.5,5,10])`
4. Zwróć `Math.ceil(dataMax / niceStep) * niceStep`

Implementacja może być prosta i konserwatywna — ważne żeby wartość była ≥ `dataMax` i "ładna".

---

### 7. Relacje między encjami

```
cumulative-comparison-chart.ts
  └─ EChartsRenderer (1 instancja na lifetime karty)
       ├─ ECharts instance (echarts.init)
       ├─ ResizeObserver
       └─ buildOption() → ECOption
            ├─ current series (LineChart)
            │    ├─ markLine (dzisiejsza linia — Wariant A lub B)
            │    └─ markPoint (dzisiejsza kropka — opcjonalna)
            ├─ reference series (LineChart — opcjonalna)
            │    └─ markPoint (dzisiejsza kropka — opcjonalna)
            └─ forecast series (LineChart — opcjonalna)
```

---

### 8. Walidacje i edge cases

| Przypadek | Zachowanie |
|-----------|-----------|
| `fullTimeline.length === 0` | Brak serii w ECOption; wykres pusty bez błędu JS |
| `series.reference === undefined` | Seria referencyjna pominięta; legenda/tooltip 1 pozycja |
| `todaySlotIndex === -1` | `markLine` i `markPoint` pominięte; prognoza pominięta |
| `showForecast && forecastTotal === undefined` | Seria prognozy pominięta |
| `container.offsetWidth === 0` | `echarts.init` wywoływany — ECharts renderuje pusty canvas; przy kolejnym resize automatycznie poprawia |
| `primary_color` z `rgba(...)` + `fill_current_opacity` | `areaStyle.opacity` override jest niezależny od alpha w kolorze bazowym — spełnia edge case ze spec |
| `destroy()` przed `update()` | Bezpieczne — `instance` jest undefined po dispose; update nie zostanie wywołane (guard w cumulative-comparison-chart.ts) |
| Wielokrotny `update()` bez `destroy()` | `setOption` z `notMerge: true` — stara opcja jest zastępowana, nie mergowana; 1 instancja ECharts |

---

### 9. Typy niezmienione (z `types.ts`)

Nie wymagają modyfikacji:

- `ChartRendererConfig` — wejście dla `EChartsRenderer.update()`
- `ComparisonSeries` — wejście dla `EChartsRenderer.update()`
- `TimeSeriesPoint` — wejście dla `alignSeriesOnTimeline()`
- `CumulativeSeries` — pośredni w `ComparisonSeries`

---

### 10. Zmiany w `cumulative-comparison-chart.ts`

Minimalne (FR-017):

| Linia | Przed | Po |
|-------|-------|-----|
| Import | `import { ChartRenderer } from './chart-renderer';` | `import { EChartsRenderer } from './echarts-renderer';` |
| Typ pola | `private _chartRenderer?: ChartRenderer;` | `private _chartRenderer?: EChartsRenderer;` |
| Selektor | `const canvas = this.renderRoot.querySelector("canvas") as HTMLCanvasElement \| null;` | `const container = this.renderRoot.querySelector(".chart-container") as HTMLElement \| null;` |
| Konstruktor | `this._chartRenderer = new ChartRenderer(canvas);` | `this._chartRenderer = new EChartsRenderer(container);` |
| Template | `<canvas></canvas>` | (można usunąć `<canvas>` — ECharts tworzy własny) |

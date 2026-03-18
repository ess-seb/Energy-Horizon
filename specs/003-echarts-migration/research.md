# Research: Migracja Chart.js → Apache ECharts

**Feature**: `003-echarts-migration` | **Date**: 2026-03-18

---

## 1. Modularny import ECharts 5.6

### Decision
ECharts jest importowany wyłącznie przez podścieżki `echarts/core`, a nie przez `import * as echarts from 'echarts'`.

### Wymagane moduły

```ts
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  CanvasRenderer
]);
```

### Rationale
- Vite tree-shaking nie usuwa ECharts automatycznie bez modularnych importów (biblioteka posiada side effects dla rejestracji modułów).
- `echarts.use([...])` rejestruje komponenty jednorazowo (idempotentne — wielokrotne wywołanie jest bezpieczne).
- Wymagane komponenty: `MarkLineComponent` dla pionowej linii „dziś", `MarkPointComponent` dla kropek, `LegendComponent` dla legendy, `TooltipComponent` dla tooltipa.

### Alternatives considered
- **SVGRenderer**: Odrzucony — Canvas jest wystarczający i lżejszy; nie ma potrzeby SVG dla karty HA.
- **Full ECharts import**: Odrzucony — narusza FR-015 i zwiększa bundle.

---

## 2. Oś X: category vs value

### Decision
Oś X: `type: 'value'` z `min: 0`, `max: fullTimeline.length - 1`, `interval: 1`.

### Rationale
- `type: 'value'` mapuje 1:1 na slot indeks (0..N-1) — identycznie z obecnym podejściem w `chart-renderer.ts` (Chart.js `type: 'linear'`).
- `markLine` i `markPoint` używają bezpośrednio wartości liczbowych (`xAxis: todaySlotIndex`, `coord: [todaySlotIndex, y]`) — naturalne dopasowanie.
- `type: 'category'` wymaga tablicy stringów i komplikuje koordynaty markLine/markPoint bez żadnej korzyści.
- `boundaryGap: false` zapewnia brak paddingu po lewej/prawej osi (domyślnie category ma gap — kolejny powód przeciw).

### Alternatives considered
- **`type: 'category'`**: Odrzucony — wymaga `data: ['0','1',...,'N-1']` i sprawia problemy z koordynatami numerycznymi.
- **`type: 'time'`**: Odrzucony — projekt używa slot-index model, nie timestamp model na osi X.

---

## 3. Marker „dziś" — markLine i markPoint

### Decision
Marker „dziś" = `markLine` (linia przerywana) + `markPoint` (kropki) na serii bieżącej. Kropka referencyjna na serii referencyjnej.

### markLine — pionowa linia przerywana

**Wariant A — od y=0 do yTop (co najmniej jedna seria ma wartość):**
```ts
markLine: {
  silent: true,
  symbol: ['none', 'none'],
  data: [[
    { coord: [todaySlotIndex, 0], lineStyle: { type: 'dashed', color: primaryColor, width: 1.5 } },
    { coord: [todaySlotIndex, yTop] }
  ]]
}
```

**Wariant B — obie serie mają null (linia do góry obszaru):**
```ts
markLine: {
  silent: true,
  symbol: ['none', 'none'],
  data: [{ xAxis: todaySlotIndex, lineStyle: { type: 'dashed', color: primaryColor, width: 1.5 } }]
}
```

`yTop = Math.max(currentY ?? 0, referenceY ?? 0)` gdy przynajmniej jedna wartość nie jest null.  
Gdy obie są null: używamy Wariantu B (pełna wysokość).

### markPoint — kropki na wartościach

Na serii **bieżącej** (jeśli todayCurrentY !== null):
```ts
markPoint: {
  silent: true,
  data: [{ coord: [todaySlotIndex, todayCurrentY], symbol: 'circle', symbolSize: 6, itemStyle: { color: primaryColor } }]
}
```

Na serii **referencyjnej** (jeśli todayReferenceY !== null):
```ts
markPoint: {
  silent: true,
  data: [{ coord: [todaySlotIndex, todayReferenceY], symbol: 'circle', symbolSize: 6, itemStyle: { color: referenceColor } }]
}
```

### Rationale
- `markLine` i `markPoint` są oficjalnymi mechanizemami ECharts — spełnia FR-003.
- Coord-based markLine (`[[coord1, coord2]]`) pozwala precyzyjnie kontrolować zakres y=0..yTop — spełnia FR-004.
- `silent: true` — linia/punkty nie reagują na hover (nie wchodzą w tooltip ECharts).
- `symbol: ['none', 'none']` — brak strzałek na końcach linii.

### Alternatives considered
- **`graphic` API**: Możliwe, ale wymaga manualnych koordynatów pixelowych i callbacks — bliskie canvas hackowi; odrzucone.
- **Separate phantom series**: Odrzucone — niepotrzebna złożoność.

---

## 4. Wypełnienie (areaStyle) z niezależnym kryciem

### Decision
```ts
areaStyle: rendererConfig.fillCurrent
  ? { opacity: rendererConfig.fillCurrentOpacity / 100 }
  : { opacity: 0 }
```

`opacity` w `areaStyle` jest niezależny od `lineStyle.opacity` (linia ma zawsze pełne krycie).

### Rationale
- ECharts `areaStyle.opacity` stosuje się wyłącznie do wypełnienia — nie wpływa na linię. Spełnia FR-005.
- Nie potrzeba `colorWithOpacity()` jak w Chart.js — kolor bazowy kopiuje się z `lineStyle.color`, opacity wystarczy.
- Aby wyłączyć wypełnienie: `{ opacity: 0 }` zamiast warunkowego `areaStyle: undefined` (czystsze API).

### Alternatives considered
- **`areaStyle: undefined`** gdy fill=false: Działa, ale `opacity: 0` jest bardziej explicitne i czytelne.
- **`color` w areaStyle**: Można podać kolor bezpośrednio — niepotrzebne, skoro ECharts dziedziczone color z series jest odpowiednie.

---

## 5. Null handling — connectNulls: false

### Decision
```ts
{ connectNulls: false }
```

### Rationale
- ECharts `LineChart` ma opcję `connectNulls` na poziomie serii — domyślnie `false`, ale lepiej jawnie zaznaczyć.
- Wartości `null` w tablicy `data` tworzą przerwy w linii — identycznie z Chart.js `spanGaps: false`. Spełnia FR-002.

---

## 6. Oś Y — dokładnie 5 ticków

### Decision
```ts
yAxis: {
  type: 'value',
  min: 0,
  splitNumber: 4,
  axisLabel: {
    formatter: (value: number, index: number) => {
      // Uwaga: ECharts przekazuje index od 0 (dół) do N (góra)
      // Najwyższy tick = ostatni w formatter
      if (isMaxTick) return `${value} ${unit}`;
      return String(value);
    }
  }
}
```

**Problem**: ECharts `axisLabel.formatter` nie przekazuje informacji „czy to ostatni tick" bezpośrednio. Rozwiązanie: wylicz maksimum z danych przed budowaniem opcji, porównaj wartość `value` z `tickMax`.

```ts
// Przed budowaniem ECOption:
const allValues = [...currentValues, ...referenceValues].filter(v => v !== null) as number[];
const dataMax = allValues.length > 0 ? Math.max(...allValues) : 0;
// ECharts zaokrągli max w górę — używamy 'nice' dla orientacyjnego max
// Formatter: wyświetl unit gdy value jest max tick
```

**Praktyczne podejście** — `axisLabel.formatter` z closurem nad `maxTickValue`:
```ts
let maxTickValue = 0;
const yAxisFormatter = (value: number) => {
  if (value > maxTickValue) maxTickValue = value;
  // Na końcu renderowania maxTickValue = wartość najwyższego ticka
  // Ale formatter jest wywoływany od najmniejszego do największego
  // Więc nie wiemy przy wywołaniu, czy to ostatni tick
};
```

**Rozwiązanie ostateczne**: Użyj `axisLabel.formatter` jako funkcji — ECharts wywołuje ją dla każdego ticka z wartością i indeksem. Ale indeks jest od 0, bez informacji o całkowitej liczbie ticków.

Obejście: cache wszystkich wywołanych wartości w statycznej zmiennej podczas inicjalizacji opcji — `splitNumber: 4` + `min: 0` = 5 ticków (0, 25%, 50%, 75%, max). Używamy `interval` explicite lub polegamy na ECharts, który z `splitNumber: 4` i `min: 0` zwróci ładne wartości.

**Najczystszy pattern bez callback state**:
```ts
axisLabel: {
  formatter: (value: number) => {
    if (value === computedMax) return `${value} ${unit}`;
    return String(value);
  }
}
```
Gdzie `computedMax` = `Math.ceil(dataMax / niceStep) * niceStep` — to samo co ECharts wybierze jako top tick.

**Uproszczenie**: ECharts z `splitNumber: 4` i `min: 0` i `max: 'dataMax'` (domyślnie) wybierze ładną wartość max. Możemy przekazać `max` explicite i użyć go w formatzerze:
```ts
const yMax = computeNiceMax(dataMax, 4); // custom helper
yAxis: { min: 0, max: yMax, splitNumber: 4 }
// formatter: (v) => v === yMax ? `${v} ${unit}` : String(v)
```

Jednak `computeNiceMax` musi być zgodne z tym, co ECharts oblicza wewnętrznie — ryzyko desynchronizacji.

**Rekomendowane rozwiązanie (najprostsze)**: Nie przekazuj `max` explicite. Użyj `axisLabel.formatter` z identyfikacją max na podstawie tego, że ECharts zawsze wywoła formatter od min do max. Skoro ticków jest dokładnie 5 (`splitNumber: 4`), możemy zebrać wszystkie wartości i wybrać ostatnią:

```ts
// Statyczna lista ticków jest znana dopiero po renderze.
// Najprościej: render dwa razy lub użyj 'on' events.
// ALBO: zaakceptuj, że unit etykieta pojawi się przy najwyższej wartości
// danych zaokrąglonej w górę, którą możemy oszacować:
const niceMax = niceNumber(dataMax, true); // ceiling to nice value
axisLabel: {
  formatter: (value: number) => {
    if (value === niceMax && unit.length > 0) return `${value} ${unit}`;
    return String(value);
  }
}
```

Funkcja `niceNumber(n, ceiling)` to standardowy algorytm „nice numbers" — taki sam jak ECharts stosuje wewnętrznie z `splitNumber`. Jeśli nasze `niceMax` = to co ECharts wybierze → formatter zadziała poprawnie.

→ **Ostateczna decyzja**: Implementuj `niceMax(dataMax)` helper odpowiadający logice ECharts. FR-008 jest spełniony bez canvas rysowania.

### Rationale
- `splitNumber: 4` + `min: 0` = 5 ticków (0 + 4 odstępy). Spełnia FR-007.
- `axisLabel.formatter` bez Canvas API. Spełnia FR-008.

---

## 7. Tooltip w Shadow DOM

### Decision
```ts
tooltip: {
  trigger: 'axis',
  axisPointer: { type: 'cross' },
  appendTo: containerElement  // HTMLElement — div kontenera karty
}
```

### Rationale
- ECharts domyślnie renderuje tooltip do `document.body` → tooltip nie jest widoczny lub jest źle pozycjonowany w Shadow DOM.
- `appendTo` (ECharts 5.3+) pozwala wskazać inny element jako cel renderowania tooltip — kontener karty wewnątrz Shadow DOM. Spełnia FR-010.
- `appendTo` przyjmuje `HTMLElement` lub `() => HTMLElement`.

### Alternatives considered
- **`confine: true`**: Pomocne, ale nie rozwiązuje problemu Shadow DOM — tooltip nadal renderowany do body.
- **Własny tooltip (renderMode: 'richText')**: Odrzucony — zbyt skomplikowane.

---

## 8. ResizeObserver — zarządzanie

### Decision
`EChartsRenderer` tworzy własny `ResizeObserver` w konstruktorze i obserwuje element kontenera. `disconnect()` wywoływane w `destroy()`.

```ts
private resizeObserver: ResizeObserver;

constructor(container: HTMLElement) {
  this.container = container;
  this.instance = echarts.init(container);
  this.resizeObserver = new ResizeObserver(() => this.instance?.resize());
  this.resizeObserver.observe(container);
}

destroy(): void {
  this.resizeObserver.disconnect();
  this.instance?.dispose();
  this.instance = undefined;
}
```

### Rationale
- `cumulative-comparison-chart.ts` nie zarządza resize — spełnia FR-018.
- Brak polyfilla dla `ResizeObserver` — dostępny w każdej nowoczesnej przeglądarce obsługiwanej przez HA.
- `instance?.resize()` po każdej zmianie rozmiaru — bez tworzenia nowej instancji. Spełnia SC-006.

---

## 9. Prognoza — oddzielna seria liniowa

### Decision
Forecast = osobna seria `LineChart` z `lineStyle.type: 'dashed'`, bez `areaStyle`, z `data` tylko dla dwóch punktów (dziś i koniec).

```ts
{
  type: 'line',
  name: 'Forecast',
  data: forecastData,  // [[todaySlotIndex, todayCurrentY], [N-1, forecastTotal]]
  lineStyle: { type: 'dashed', color: primaryColor, width: 1.5 },
  symbol: 'none',
  connectNulls: false,
  showSymbol: false
}
```

Warunkowe wstawianie: tylko gdy `showForecast && todaySlotIndex >= 0 && todayCurrentY != null && forecastTotal != null`.

### Rationale
- Odrębna seria jest czystszym podejściem niż `markLine` dla prognozy wielopunktowej — linia jest dłuższa niż marker.
- `lineStyle.type: 'dashed'` — natywna ECharts opcja. Spełnia FR-006.
- Brak `areaStyle` dla prognozy — nie wymaga wypełnienia.

---

## 10. Zamiana konstruktora — HTMLElement vs HTMLCanvasElement

### Decision
`EChartsRenderer` przyjmuje `HTMLElement` (div kontenera), nie `HTMLCanvasElement`.  
Zmiana w `cumulative-comparison-chart.ts`:

```ts
// Przed:
const canvas = this.renderRoot.querySelector("canvas") as HTMLCanvasElement | null;
if (canvas) { this._chartRenderer = new ChartRenderer(canvas); }

// Po:
const container = this.renderRoot.querySelector(".chart-container") as HTMLElement | null;
if (container) { this._chartRenderer = new EChartsRenderer(container); }
```

Typ pola `_chartRenderer` zmieniamy na wspólny interfejs `IChartRenderer` lub bezpośrednio `EChartsRenderer`.

### Rationale
- ECharts inicjalizuje się na dowolnym `HTMLElement`, nie na `<canvas>` (tworzy własny canvas wewnętrznie).
- `<canvas>` w template jest zbędny po migracji — można go usunąć lub zastąpić `<div class="chart-container">`.
- `.chart-container` jest już w template `cumulative-comparison-chart.ts` (linia ~593) — selektor dostępny.
- Zmiana jest minimalna (1–2 linie) — spełnia FR-017 (logika biznesowa niezmieniona).

---

## 11. Kolory — resolveColor i colorWithOpacity

### Decision
- `resolveColor()` przeniesiona 1:1 do `EChartsRenderer` (logika CSS variable lookup).
- `colorWithOpacity()` z Chart.js renderer **NIE** jest potrzebna — ECharts `areaStyle.opacity` eliminuje potrzebę konwersji koloru.
- Kolor referencyjny: `getComputedStyle(container)` — ta sama logika CSS `--secondary-text-color`.

### Rationale
- ECharts przyjmuje `color` jako string CSS i `opacity` jako float 0–1 — separacja czystsza niż w Chart.js.
- Usunięcie `colorWithOpacity()` redukuje złożoność i eliminuje potrzebę tworzenia tymczasowego canvas do parsowania koloru.

---

## 12. Hash-based update guard

### Decision
Zachować mechanizm `lastHash` z `chart-renderer.ts` — porównuj JSON hash danych wejściowych; jeśli hash identyczny → `return` (skip `setOption`).

### Rationale
- `setOption` w ECharts jest droższe niż porównanie stringa — warto skip gdy dane się nie zmieniły.
- Logika identyczna z `chart-renderer.ts` — low-risk.

---

## 13. Wersja ECharts i instalacja

### Decision
```
npm install echarts@^5.6.0
npm uninstall chart.js chartjs-adapter-date-fns
```

### Rationale
- `^5.6.0` — najnowsze stabilne ECharts 5.x z `appendTo` tooltip i pełnym zestawem modularnych komponentów.
- `date-fns` pozostaje w `dependencies` (używane przez inne moduły np. `buildComparisonPeriod`).
- `chartjs-adapter-date-fns` usuwamy bo jest wrapper Chart.js → date-fns, niepotrzebny po migracji.

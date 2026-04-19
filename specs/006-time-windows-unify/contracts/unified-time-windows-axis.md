# Contract: Unified time windows & chart axis (006)

**Consumers**: `cumulative-comparison-chart.ts`, `ha-api.ts`, `echarts-renderer.ts`, testy Vitest  
**Spec**: [spec.md](../spec.md)

## Purpose

Utrwalić **jedną** semantykę budowy osi czasu wykresu, wyrównania serii, mianownika prognozy oraz carry-forward przy „now”, zgodnie z **FR-B** (etykiety, ziarno, wyrównanie ordinalne), **FR-C** (**Longest-window axis span** — liczba kroków osi dla `N ≥ 2`), **FR-D**, **FR-G**, **FR-H**.

## `buildChartTimeline` (lub następca)

**Input**:

- `windows: ResolvedWindow[]` (posortowane po `index`, length ≥ 1)
- `merged: MergedTimeWindowConfig`
- `timeZone: string` — strefa instancji HA (FR-H)
- `comparisonMode: ComparisonMode` — używany wyłącznie tam, gdzie reguły kalendarzowe są **częścią opisu etykiet (FR-B)** (np. koniec roku/miesiąca); **nie** jako ukryty switch „legacy vs generic” bez testów złotych scenariuszy

**Output**:

```ts
{
  timeline: number[];           // ms początków slotów osi X
  alignStartsMs: number[];     // jeden start na serię, do mapowania indeksu slotu
  forecastPeriodBuckets: number; // zawsze z okna index 0 (FR-D)
}
```

**Behavior**:

1. **Jedno okno** (`windows.length === 1`): `timeline.length` = liczba slotów okna bieżącego przy `primaryAgg = windows[0].aggregation` i nominalnych `start`/`end`.
2. **Dwa lub więcej okien** (`windows.length >= 2`): **Longest-window axis span** (**FR-C**) — `timeline.length` = **max** po `windows` liczby slotów `buildTimelineSlots(w.start, w.end, primaryAgg, timeZone)` przy `primaryAgg = windows[0].aggregation`; granice `start`/`end` każdego okna **nominalne** (jak w spec / clarify). Krótsze okna: brak wartości serii poza ich nominalnym zakresem (mapowanie jak w teście — null / przerwa), **bez** skracania osi do krótszego okna.
3. **Budowa `timeline[]` (ms)** — **nie** wybierać okna o max slotach jako jedynego źródła kalendarza dla całej tablicy:
   - **Prefix**: `buildTimelineSlots(windows[0].start, windows[0].end, primaryAgg, timeZone)` — dokładnie tyle slotów, ile wynika z nominalnych granic okna 0.
   - **Tail** (gdy `timeline.length` z FR-C > długość prefixu): dopisywać kolejne początki slotów przez **jednokrokowe** przesunięcie agregacji (`advanceSlotStartMs` / równoważnik) od ostatniego ms prefixu, aż uzyska się **max** slotów. To realizuje ordinal continuation przy ziarnie wykresu (FR-H).
4. **Etykiety osi (FR-B)**: ziarno i znaczenie etykiet dla slotów w zakresie nominalnej długości okna bieżącego — jak **okno bieżące** (index 0), dzięki prefixowi z pkt. 3. **Tail**: **ordinal continuation** — etykiety nadal z tego samego łańcucha ms co tail; unikać sugerowania, że ticki należą wyłącznie do kalendarza referencji. Szczegół copy/tooltip: **FR-F**; patrz sesja 2026-04-13 w [spec.md](../spec.md) oraz **Label dimensions** w spec (różne lata / miesiące).
5. **Wskaźnik „now” i FR-G**: indeks slotu „teraz” = bucket zawierający bieżącą chwilę **w obrębie okna 0** (ten sam `buildTimelineSlots` co dla carry-forward prefix), zamapowany na indeks wspólnej osi; **nie** `contains(Date.now())` na surowej tablicy zbudowanej z kalendarza „najdłuższego” okna.
6. **Wyrównanie serii**: jedna udokumentowana reguła ordinalna (np. ten sam indeks dnia w okresie) dla każdej serii względem `alignStartsMs[i]`.
7. **`forecastPeriodBuckets`**: `countBucketsForWindow(windows[0], timeZone)` (lub równoważnie) — **nie** `timeline.length`, gdy się różni (**FR-D**); implementacja prognozy musi tolerować `timeline.length > forecastPeriodBuckets`.

## ECharts: indeks slotu w tooltipie (oś `value`)

Przy `trigger: 'axis'` nagłówek tooltipa **musi** odnosić się do tego samego indeksu co kolumna osi X (`fullTimeline[i]`):

- **Źródło indeksu:** `axisValue` (zaokrąglone, clamp do `[0, timeline.length - 1]`), albo współrzędna **X** z serii bieżącej / referencyjnej (`data[0]` przy punktach `[i, y]`).
- **Unikać:** brania `dataIndex` z „pierwszej” serii w tablicy `params` — seria prognozy ma tylko **dwa** punkty i `dataIndex` 0/1 nie jest indeksem dnia na osi.

## FR-H: `Intl` a kalendarz na osi / w tooltipie

Domyślne ścieżki formatowania osi i nagłówka tooltipa oparte na **`Intl.DateTimeFormat`** muszą przekazywać **`timeZone`** równy IANA strefie instancji HA (ten sam string co dla Luxon / `buildTimelineSlots`), żeby kalendarz nie zależał od strefy przeglądarki.

## ECharts: adaptacyjna oś — rezerwa pionowa dla etykiet „edge” vs „today”

Przy **adaptacyjnym** trybie osi X (seria bieżąca widoczna, rich `axisLabel`), etykieta znacznika **„teraz”** ma wyższy styl niż skrajne ticki. **Grid** (`grid.bottom`) i minimalna wysokość kontenera wykresu muszą uwzględniać te różnice tak, aby **żaden** tick (w tym „dzisiaj” na **środku** osi) nie był obcinany — wartości rezerwy wynikają z **wspólnych** metryk typografii w kodzie (patrz sesja 2026-04-19 w [spec.md](../spec.md)), nie wyłącznie z domyślnego `containLabel`.

## Carry-forward (FR-G)

Po zbudowaniu szeregu skumulowanego dla okna bieżącego: jeśli wykazywany jest znacznik „now” w slocie, wartość w tym slocie musi odzwierciedlać **ostatnią znaną** skumulację w oknie, gdy surowe LTS nie zamknęło jeszcze bucketa — dla ziaren **day**, **week**, **month** (domyślnie analogicznie), o ile technicznie możliwe; w przeciwnym razie jawna semantyka w dokumentacji / błąd (FR-F), nie cicha luka. Wykrywanie slotu „now” dla carry-forward używa **tych samych** granic bucketa co okno 0 (prefix), nie pełnej tablicy osi porównawczej z tail.

## Merge (FR-F / FR-E)

- Jawne pola `time_window` **zastępują** pola presetu; nazwa `comparison_preset` **nie** może być jedynym źródłem geometrii po merge.
- Konfiguracja **nieważna** → throw / stan błędu karty (FR-E), bez cichego przywracania presetu.

## Złote scenariusze (wymagane testami)

Minimalny zestaw (do rozszerzenia w `tasks.md`):

- Presety domyślne YoY, MoY, MoM — granice okien i długość osi vs `forecastPeriodBuckets` zgodnie z tą specyfikacją.
- Merge z nadpisaniem tylko `duration` / `anchor` / `step` — brak „znikania” intencji osi.
- **N = 2** z **nierówną** nominalną liczbą slotów (przy tym samym `primaryAgg`) — `timeline.length` = **max** obu okien; seria krótszego okna kończy się wcześniej; `forecastPeriodBuckets` z okna 0.
- **N ≥ 3** z seriami kontekstowymi — `timeline.length` = max slotów (**Longest-window axis span**), prognoza nadal z okna 0.
- Slot „now” z brakiem punktu LTS w surowym mapowaniu — carry-forward serii bieżącej, bez regresji referencji/prognozy (SC-TODAY-2).

## Wersjonowanie

Zmiany łamiące długość osi lub `forecastPeriodBuckets` dla istniejących YAML **bez** zmian konfiguracji wymagają wpisu w changelog i wskazówki migracji (Konstytucja III).

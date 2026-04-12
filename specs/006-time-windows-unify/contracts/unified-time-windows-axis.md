# Contract: Unified time windows & chart axis (006)

**Consumers**: `cumulative-comparison-chart.ts`, `ha-api.ts`, `echarts-renderer.ts`, testy Vitest  
**Spec**: [spec.md](../spec.md)

## Purpose

Utrwalić **jedną** semantykę budowy osi czasu wykresu, wyrównania serii, mianownika prognozy oraz carry-forward przy „now”, zgodnie z FR-B, FR-C, FR-D, FR-G, FR-H.

## `buildChartTimeline` (lub następca)

**Input**:

- `windows: ResolvedWindow[]` (posortowane po `index`, length ≥ 1)
- `merged: MergedTimeWindowConfig`
- `timeZone: string` — strefa instancji HA (FR-H)
- `comparisonMode: ComparisonMode` — używany wyłącznie tam, gdzie reguły kalendarzowe są **częścią opisu FR-B** (np. koniec roku/miesiąca dla etykiet); **nie** jako ukryty switch „legacy vs generic” bez testów złotych scenariuszy

**Output**:

```ts
{
  timeline: number[];           // ms początków slotów osi X
  alignStartsMs: number[];     // jeden start na serię, do mapowania indeksu slotu
  forecastPeriodBuckets: number; // zawsze z okna index 0 (FR-D)
}
```

**Behavior**:

1. **Dokładnie dwa okna** (`windows.length === 2`): oś i znaczenie etykiet dat/slotów muszą być zgodne z **oknem bieżącym** (FR-B). Seria referencyjna wyrównana jedną udokumentowaną regułą (ordinal w okresie).
2. **Więcej niż dwa okna**: **Longest-window axis span** (FR-C) — `timeline.length` = max po `windows` liczby slotów `buildTimelineSlots(w.start, w.end, primaryAgg, timeZone)` przy `primaryAgg = windows[0].aggregation`; granice `start`/`end` **nominalne** (clarify). Etykiety/siatka slotów: ziarno i numeracja jak dla okna bieżącego (FR-C w spec).
3. **`forecastPeriodBuckets`**: `countBucketsForWindow(windows[0], timeZone)` (lub równoważnie) — **nie** `timeline.length`, gdy się różni (FR-D).

## Carry-forward (FR-G)

Po zbudowaniu szeregu skumulowanego dla okna bieżącego: jeśli wykazywany jest znacznik „now” w slocie, wartość w tym slocie musi odzwierciedlać **ostatnią znaną** skumulację w oknie, gdy surowe LTS nie zamknęło jeszcze bucketa — dla ziaren **day**, **week**, **month** (domyślnie analogicznie), o ile technicznie możliwe; w przeciwnym razie jawna semantyka w dokumentacji / błąd (FR-F), nie cicha luka.

## Merge (FR-F / FR-E)

- Jawne pola `time_window` **zastępują** pola presetu; nazwa `comparison_preset` **nie** może być jedynym źródłem geometrii po merge.
- Konfiguracja **nieważna** → throw / stan błędu karty (FR-E), bez cichego przywracania presetu.

## Złote scenariusze (wymagane testami)

Minimalny zestaw (do rozszerzenia w `tasks.md`):

- Presety domyślne YoY, MoY, MoM — granice okien i długość osi vs `forecastPeriodBuckets` zgodnie z tą specyfikacją.
- Merge z nadpisaniem tylko `duration` / `anchor` / `step` — brak „znikania” intencji osi.
- N≥3 z seriami kontekstowymi — `timeline.length` = max slotów (Longest-window axis span), prognoza nadal z okna 0.
- Slot „now” z brakiem punktu LTS w surowym mapowaniu — carry-forward serii bieżącej, bez regresji referencji/prognozy (SC-TODAY-2).

## Wersjonowanie

Zmiany łamiące długość osi lub `forecastPeriodBuckets` dla istniejących YAML **bez** zmian konfiguracji wymagają wpisu w changelog i wskazówki migracji (Konstytucja III).

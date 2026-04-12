# Data model: 006-time-windows-unify

Źródło wymagań: [spec.md](./spec.md) (FR-A–FR-H, encje).

## 1. MergedTimeWindowConfig (efektywna konfiguracja po merge)

- **Wejście**: `comparison_preset` + opcjonalny `time_window` (YAML) + `period_offset` + domyślne `aggregation` z karty.
- **Zasady**:
  - Deep merge: wartości z `time_window` **nadpisują** pola presetu (FR-F).
  - `stripLegacyWhenGeneric` może usuwać flagi `currentEndIsNow` / `referenceFullPeriod` przy zmianie strukturalnej vs preset — efekt musi być **zgodny** z intencją „generic resolve”, bez ukrytego przywracania geometrii presetu.
- **Pola istotne dla osi**: `count`, `anchor`, `step`, `duration`, `offset`, `aggregation`, flagi presetu (jeśli jeszcze występują), `comparisonMode`.

## 2. ResolvedWindow

- **Pol**: `index`, `id`, `role` (`current` | `reference` | `contextual`), `start`, `end`, `aggregation`.
- **Invarianty**: `start ≤ end` (ISO / Date), zsynchronizowane z FR-H (Luxon w strefie HA).
- **Nominal bounds**: `start`/`end` używane do liczenia długości w slotach **bez** przycinania otwartego okna do „now” wyłącznie dla długości osi (spec + clarify); render „teraz” = FR-G.

## 3. Chart timeline (oś wykresu)

- **Slot**: timestamp ms początku bucketa przy ziarnie **wykresu** (= `windows[0].aggregation` w obecnym kodzie — do utrwalenia w kontrakcie).
- **N = 2 (FR-B)**:
  - Oś i etykiety kalendarzowe = **okno bieżące** (index 0), w tym przypadki gdzie timeline obejmuje **pełny** miesiąc/rok kalendarzowy dla czytelności etykiet — musi być **jednoznacznie opisane** w kontrakcie i testach (parzystość z YoY/MoY).
- **N > 2 (FR-C — Longest-window axis span)**:
  - `timeline.length` = **max** po oknach: liczba slotów z `buildTimelineSlots(w.start, w.end, primaryAgg, timeZone)` (nominalne granice).
  - `alignStartsMs[i]`: start wyrównania serii *i* (jak dziś).
- **Prognoza (FR-D)**:
  - `forecastPeriodBuckets` = liczba slotów **tylko** dla okna bieżącego (`windows[0]`), **nie** `timeline.length` gdy się różni.

## 4. Series point map (LTS → slot)

- Mapowanie statystyk do indeksu slotu na timeline.
- **Carry-forward (FR-G)**: dla serii bieżącej, w slocie „now”, uzupełnienie wartością ostatniej znanej skumulacji w oknie, w granicach okna i timeline.

## 5. Walidacja i błędy

- **FR-E**: merge nieważny → stan błędu karty + komunikat; brak cichego przywrócenia samych wartości presetu.
- **FR-F / grain**: konfiguracja nie do wyrażenia na jednym ziarnie — błąd lub udokumentowana ścieżka (bez heurystyki).

## 6. Strefa czasowa

- **FR-H**: pojedynczy `timeZone: string` (HA) dla resolve, timeline, etykiet i „now”.

## Relacje (skrót)

```text
CardConfig → MergedTimeWindowConfig → ResolvedWindow[]
ResolvedWindow[] + MergedTimeWindowConfig + ComparisonMode → { timeline, alignStartsMs, forecastPeriodBuckets }
LTS responses + timeline → ComparisonSeries (z FR-G na serii bieżącej)
```

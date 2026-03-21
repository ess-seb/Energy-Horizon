# Research: Ulepszone obliczanie prognozy (computeForecast)

**Phase**: 0 | **Date**: 2026-03-19 | **Plan**: [plan.md](./plan.md)

> Specyfikacja `spec.md` została wcześniej zaklaryfikowana (sesja 2026-03-19 w sekcji Clarifications)
> i nie zawiera żadnych `[NEEDS CLARIFICATION]`. Research skupia się na decyzjach architektonicznych
> wynikających z analizy istniejącego kodu.

---

## Decyzja 1: Obliczanie `splitIdx` na podstawie `currentRangeMs`

**Decision**: `splitIdx` wyznaczany jako największy indeks w `referencePoints`, dla którego
`referencePoints[i].timestamp <= currentPoints[0].timestamp + currentRangeMs`,
gdzie `currentRangeMs = currentPoints[completedBuckets - 1].timestamp - currentPoints[0].timestamp`.

**Rationale**: Punkty w `currentPoints` mogą mieć luki (brakujące buckety z powodu restartu HA),
więc indeks `completedBuckets - 1` nie odpowiada temu samemu momentowi w serii referencyjnej.
Wyrównanie czasowe eliminuje ten błąd. Spec (FR-005) jawnie wymaga podejścia opartego na `currentRangeMs`.

**Alternatives considered**:
- Wyrównanie po indeksie tablicy (obecne zachowanie) — odrzucone: powoduje błędne B/C przy lukach (User Story 2).
- Wyszukiwanie binarne po timestamp — zalecane przy dużych seriach, ale dla N ≤ 365 prosta pętla jest wystarczająca i czytelniejsza.

**Implementation note**: `referencePoints` są gwarantowanie posortowane rosnąco (przez `normalizePoints()`).
Wystarczy jedno przejście od końca lub `findLastIndex`.

---

## Decyzja 2: Parametr `periodTotalBuckets` jako drugi argument

**Decision**: Sygnatura `computeForecast(series: ComparisonSeries, periodTotalBuckets: number): ForecastStats`.
Wartość przekazywana z call-site jako `fullTimeline.length`.

**Rationale**: `fullTimeline` jest już obliczane w `cumulative-comparison-chart.ts` (w metodzie `updated()`
oraz dostępne przez `buildFullTimeline` — wystarczy wywołać je też wewnątrz `_loadData()` przed
`computeForecast`). Alternatywa (obliczanie wewnątrz funkcji na podstawie `ComparisonSeries`) wymagałaby
dostępu do `period` / `aggregation`, co wychodzi poza zakres odpowiedzialności czystej funkcji obliczeniowej.

**Alternatives considered**:
- Obliczanie `periodTotalBuckets` wewnątrz `computeForecast` z `series.aggregation` — odrzucone: funkcja
  musiałaby znać logikę kalendarza (ile dni w miesiącu/roku), co komplikuje ją i utrudnia testowanie.
- Przekazanie całego `ComparisonPeriod` — odrzucone: nadmierne sprzężenie; `periodTotalBuckets` jest
  pojedynczą liczbą wystarczającą do celu.

**Call-site change**: W `_loadData()` dodać obliczenie `fullEnd` i `fullTimeline` przed wywołaniem
`computeForecast`, a następnie przekazać `fullTimeline.length`. `_computeFullEnd(period)` jest już
metodą prywatną klasy — można ją wywołać w `_loadData`.

---

## Decyzja 3: Progi aktywacji i confidence — wartości procentowe

**Decision**: Progi zdefiniowane w spec (FR-003, FR-004) nie wymagają konfigurowalności na tym etapie:
- Aktywacja: `completedBuckets >= 3 && pct >= 0.05`
- `"low"`: `pct < 0.20`
- `"medium"`: `0.20 <= pct < 0.40`
- `"high"`: `pct >= 0.40`

**Rationale**: Progi są stałe i nie-eksportowane (FR-016: brak eksportowanej stałej `MIN_POINTS_FOR_FORECAST`).
Wartości literalne bezpośrednio w kodzie są czytelne i wystarczające — nie wymagają named constants.

**Alternatives considered**:
- Eksportowane stałe (jak obecne `MIN_POINTS_FOR_FORECAST`) — odrzucone przez FR-016.
- Konfiguracja w YAML karty — odrzucone: zbyt zaawansowana dla obecnego etapu; poza scope'em featury.

---

## Decyzja 4: Obsługa `anomalousReference` — odrębna flaga, nie zmiana algorytmu

**Decision**: Gdy `rawTrend < 0.3 || rawTrend > 3.3`, funkcja ustawia `anomalousReference: true`
i obniża `confidence` do `"low"`, ale kontynuuje obliczenia (clamp + `forecast_total`).

**Rationale**: Spec (FR-009, User Story 3) wymaga, żeby prognoza nadal była zwracana z `enabled: true`.
Clamp (`Math.min(5, Math.max(0.2, rawTrend))`) i tak ogranicza ekstremalny trend — wynik jest
"bezpieczny" do wyświetlenia, o ile użytkownik widzi ostrzeżenie o niskiej pewności.

**Alternatives considered**:
- `enabled: false` przy anomalii — odrzucone: spec jawnie mówi `enabled: true` (FR-009).
- Osobna flaga `confidence` dla anomalii vs. procentu okresu — odrzucone: spec łączy obie obniżki
  w jedno pole `confidence: "low"`.

---

## Decyzja 5: Obsługa `C = 0` — `forecast_total = A`, brak wyłączania

**Decision**: Gdy `splitIdx + 1 >= referencePoints.length` (tj. C = 0), zwracamy `enabled: true`,
`forecast_total = A`. Detekcja anomalii nadal obowiązuje.

**Rationale**: Spec (FR-012, User Story 4): "znany jest wynik A — nie wyłączamy prognozy".
`forecast_total = A + 0 * trend = A` — wzór działa poprawnie nawet bez specjalnej gałęzi,
ale jawna obsługa `C = 0` czyni intencję czytelną i zapobiega potencjalnym problemom
z `rawTrend === Infinity` (gdyby B było sprawdzane po wyznaczeniu C).

**Alternatives considered**:
- Brak specjalnej obsługi — działa matematycznie, ale `rawTrend` może być `Infinity` jeśli `B = 0`
  i `A > 0`; sprawdzenie `B = 0 → enabled: false` (FR-013) musi nastąpić PRZED obliczeniem C.

---

## Kolejność sprawdzeń (flow guard ordering)

Wynikająca z analizy spec kolejność warunków guard w nowej implementacji:

```
1. periodTotalBuckets <= 0                     → enabled: false
2. currentPoints.length < 1                    → enabled: false
3. completedBuckets = currentPoints.length - 1
4. completedBuckets < 3 || pct < 0.05          → enabled: false
5. referencePoints puste / null                → enabled: false
6. splitIdx = wyznacz po czasie                
7. splitIdx = -1                               → enabled: false
8. B = sum(ref[0..splitIdx].rawValue)
9. B = 0                                       → enabled: false
10. A = sum(current[0..completedBuckets-1].rawValue)
11. rawTrend = A / B
12. anomalousReference = rawTrend < 0.3 || rawTrend > 3.3
13. confidence = pct-based; jeśli anomalous → "low"
14. trend = clamp(rawTrend, 0.2, 5)
15. C = sum(ref[splitIdx+1..end].rawValue)
16. forecast_total = A + C * trend
17. return enabled: true
```

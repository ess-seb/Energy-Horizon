# Feature Specification: Energy Burndown Cumulative Comparison Card

**Feature Branch**: `001-energy-burndown-card`  
**Created**: 2026-03-05  
**Status**: Draft  
**Input**: User description: Energy Burndown – karta do porównania skumulowanego zużycia energii w czasie bieżącym vs okres historyczny (miesiąc/rok) z wizualnym trendem i prostymi wnioskami.

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Dodanie karty do dashboardu w celu lepszego zrozumienia danych (Priority: P1)

Użytkownik Home Assistant, który gromadzi dane o zużyciu energii elektrycznej w domu, chce dodać do swojego dashboardu nową kartę, która pokaże mu, jak bieżące skumulowane zużycie energii w wybranym okresie (np. miesiącu lub roku) wypada na tle tego samego okresu w przeszłości, aby szybko zorientować się, czy zużywa więcej czy mniej niż wcześniej.

**Why this priority**: To jest podstawowy powód istnienia karty – umożliwia użytkownikowi natychmiastowy, wizualny wgląd w to, czy aktualnie zużywa więcej, czy mniej energii niż w porównywalnym okresie historycznym. Bez tej funkcji karta nie dostarcza kluczowej wartości i jest tylko kolejnym wykresem.

**Independent Test**: Można przetestować tę historię, konfigurując kartę na dashboardzie z przykładową encją energii oraz określonym okresem (np. bieżący miesiąc vs ten sam miesiąc rok wcześniej) i sprawdzając, czy użytkownik widzi na jednym wykresie dwie serie skumulowanego zużycia, rozpoznaje bieżący trend i potrafi na podstawie interfejsu odpowiedzieć, czy zużycie jest obecnie wyższe czy niższe.

**Acceptance Scenarios**:

1. **Given** użytkownik posiada działające instancje Home Assistant z encją zużycia energii obejmującą co najmniej dwa analogiczne okresy (np. obecny i poprzedni rok), **When** doda kartę do dashboardu i wskaże encję oraz wariant „rok do roku”, **Then** na jednym wykresie widzi dwie skumulowane serie: bieżący rok i poprzedni rok, czytelnie odróżnione.
2. **Given** użytkownik posiada dane za bieżący i poprzedni miesiąc, **When** wybierze wariant „miesiąc bieżący do tego samego miesiąca roku ubiegłego”, **Then** karta pokazuje skumulowane zużycie w obu miesiącach na wspólnej osi czasu, umożliwiając szybkie porównanie kształtu obu linii.

---

### User Story 2 - Odczyt bieżących i referencyjnych wartości skumulowanych (Priority: P2)

Użytkownik chce w dowolnym momencie odczytać, ile energii skumulował w bieżącym okresie do dnia dzisiejszego oraz ile energii skumulował w analogicznym dniu okresu referencyjnego (np. tego samego dnia miesiąca lub roku wcześniej), aby móc stwierdzić, czy obecnie zużywa więcej czy mniej energii i o ile.

**Why this priority**: Liczbowe wartości skumulowanego zużycia są potrzebne do podejmowania konkretnych decyzji (np. czy zmienić ustawienia ogrzewania lub urządzeń). Wykres ułatwia orientację trendu, ale dokładne liczby pozwalają ocenić skalę różnicy i planować działania.

**Independent Test**: Można przetestować tę historię, mając skonfigurowaną kartę z danymi zawierającymi dane historyczne; następnie w konkretnym dniu sprawdzić, czy karta prezentuje dwie wartości skumulowane (bieżącą i historyczną) w sposób zrozumiały oraz jednoznaczny, bez konieczności odczytywania ich z osi wykresu.

**Acceptance Scenarios**:

1. **Given** karta jest poprawnie skonfigurowana z encją energii i wybranym okresem porównawczym, **When** użytkownik patrzy na sekcję podsumowania, **Then** widzi dwie wyraźnie opisane wartości skumulowane: jedną dla bieżącego okresu do dnia dzisiejszego i jedną dla odpowiadającego mu dnia w okresie referencyjnym, z uwzględnieniem jednostki.
2. **Given** karta ma dostęp do historii encji w obu okresach, **When** bieżący dzień w okresie referencyjnym nie ma pełnych danych (np. czujnik zaczął działać później), **Then** karta wyświetla brakujące dane w sposób czytelny (np. wskazując, że dane są niekompletne) lub pomija porównanie liczby, ale nie wprowadza użytkownika w błąd ani nie powoduje błędu renderowania.

---

### User Story 3 - Odczyt prognozy końcowego zużycia w bieżącym okresie (Priority: P3)

Użytkownik chciałby zobaczyć przewidywaną łączną wartość zużycia energii dla całego bieżącego okresu (np. miesiąca lub roku) oraz łączną wartość z okresu referencyjnego, aby lepiej zrozumieć, jakie będą skutki obecnego tempa zużycia w skali pełnego okresu i szacować przyszłe rachunki.

**Why this priority**: Prognoza przyszłego zużycia na podstawie dotychczasowego trendu pozwala użytkownikowi reagować proaktywnie (np. ograniczyć zużycie w drugiej części miesiąca), zamiast tylko analizować historię po fakcie.

**Independent Test**: Można przetestować tę historię, zakładając dostępność reprezentatywnych danych w bieżącym okresie, a następnie sprawdzając, czy karta prezentuje przewidywaną wartość końcową dla okresu na podstawie dotychczasowego wzorca zużycia oraz historyczną wartość referencyjną w formie, która jest zrozumiała dla użytkownika.

**Acceptance Scenarios**:

1. **Given** użytkownik ma dane o zużyciu energii w bieżącym miesiącu przez co najmniej kilka dni, **When** otwiera kartę, **Then** widzi przewidywaną łączną wartość zużycia dla całego miesiąca wyrażoną w tej samej jednostce co dane źródłowe oraz sumaryczną wartość z analogicznego miesiąca w okresie referencyjnym.
2. **Given** bieżące dane są niestabilne lub bardzo krótkie (np. tylko 1–2 dni historii), **When** karta wylicza prognozę, **Then** prezentuje ją ostrożnie (np. wskazując na niski poziom pewności lub rezygnując z prognozy przy zbyt małej liczbie punktów), tak aby nie wprowadzać użytkownika w błąd.

---

### Edge Cases

- Co się dzieje, gdy wybrana encja ma dane tylko dla jednego z dwóch okresów (np. brak pełnej historii sprzed roku)?
- Jak karta zachowuje się, gdy w ciągu bieżącego okresu występują dłuższe przerwy w danych (brak odczytów), np. z powodu awarii czujnika?
- Co się dzieje, gdy konfiguracja YAML wskazuje nieistniejącą lub niedostępną encję?
- Jak system reaguje, gdy zakres czasu obejmuje rok przestępny, a okres referencyjny – nie (lub odwrotnie)?
- Jak karta zachowuje się na bardzo małych ekranach (telefon) oraz przy bardzo wąskich kafelkach na dashboardzie (np. czytelność etykiet osi czasu)?

### Założenia platformowe i kompatybilność

- Minimalna wspierana wersja Home Assistant to **2024.6** (lub nowsza).
  - Karta **nie gwarantuje kompatybilności wstecznej** z wersjami HA sprzed 2024.6.
- Zakres wsparcia UI:
  - Karta jest projektowana i testowana pod **domyślny interfejs Lovelace**.
  - Integracja z alternatywnymi / customowymi UI (np. niestandardowe dashboardy, frameworki UI spoza core Lovelace) jest **poza zakresem** – brak gwarancji poprawnego działania w takich środowiskach.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: System MUST allow users to add the Energy Burndown Cumulative Comparison Card to any Lovelace dashboard and configure it poprzez wskazanie encji z danymi energii oraz wybranie typu okresu porównawczego (rok do roku lub miesiąc do miesiąca).
- **FR-002**: System MUST compute and display two cumulative series of energy usage over time: one for the current period and one for the corresponding historical period, using wspólną oś czasu, tak aby możliwe było bezpośrednie porównanie kształtu obu linii.
- **FR-003**: Users MUST be able to read current cumulative values for both the current period and the corresponding reference period date in a clear textual summary (np. dwie wartości z opisem okresów i jednostką), niezależnie od tego, czy są w stanie odczytać je z samego wykresu.
- **FR-004**: System MUST provide an estimate of the total cumulative energy usage for the full current period, based on observed data so far, and present it obok łącznej wartości z okresu referencyjnego, w sposób zrozumiały dla użytkownika (wraz z jednostką).
- **FR-005**: System MUST handle incomplete, missing or inconsistent data defensively, tak aby karta nadal się renderowała (z odpowiednimi komunikatami lub uproszczoną wizualizacją) i nie powodowała zawieszenia ani błędów całego dashboardu Lovelace.
- **FR-006**: System MUST respect the user’s locale settings for date and number formatting when presenting dates on the time axis and values in textual summaries.
- **FR-007**: System MUST support YAML-based configuration, including wybór encji, tytułu karty, wariantu okresu do wizualizacji oraz opcjonalnego nadpisania domyślnej agregacji (np. dzień, tydzień, miesiąc), bez wymagania dodatkowych kroków konfiguracyjnych poza standardową konfiguracją Lovelace.
- **FR-008**: System MUST ensure that interaction states such as loading, error and „no comparison data” są komunikowane w sposób zwięzły i zgodny ze stylem Home Assistant, tak aby użytkownik rozumiał, dlaczego nie widzi pełnego porównania.
- **FR-009**: System MUST generate a short, localized textual heading that interprets the comparison between current and reference cumulative usage (np. „Twoje zużycie jest o **X kWh niższe/wyższe** niż w tym samym okresie w poprzednim roku”), przy czym:
  - Dla dodatniej różnicy (`current_cumulative > reference_cumulative`) komunikat używa formy „wyższe” oraz wyświetla wartość różnicy w jednostce energii.
  - Dla ujemnej różnicy (`current_cumulative < reference_cumulative`) komunikat używa formy „niższe” oraz wyświetla wartość bezwzględną różnicy.
  - Dla różnicy bliskiej zeru (np. |różnica| < 0.01 jednostki) komunikat może wskazywać, że zużycie jest „na podobnym poziomie”.
  - Gdy brak wiarygodnych danych referencyjnych, nagłówek nie wprowadza w błąd i wprost komunikuje brak możliwości porównania (np. „Brak wystarczających danych z okresu referencyjnego do porównania zużycia”).

### Key Entities *(include if feature involves data)*

- **Energy Usage Series**: reprezentuje szereg czasowy zużycia energii pochodzący z pojedynczej encji Home Assistant, złożony z punktów (znacznik czasu, wartość, jednostka), który może być transformowany na serię skumulowaną w wybranym okresie.
- **Comparison Period**: opisuje parę okresów czasu, które mają być porównane (np. „bieżący miesiąc” i „ten sam miesiąc rok wcześniej” albo „bieżący rok” i „poprzedni rok”), wraz z informacją o sposobie agregacji (np. dzień, tydzień).
- **Card Configuration**: reprezentuje konfigurację użytkownika dla danej instancji karty, obejmującą wybraną encję, typ porównania okresów, tytuł karty, ustawienia agregacji oraz inne opcje wpływające na sposób prezentacji danych.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Co najmniej 80% użytkowników, którzy mają dane historyczne za analogiczny okres, jest w stanie w mniej niż 30 sekund na podstawie karty poprawnie odpowiedzieć, czy w bieżącym okresie zużywają więcej czy mniej energii niż w okresie referencyjnym.
- **SC-002**: Użytkownicy są w stanie samodzielnie, bez dodatkowych narzędzi czy ręcznych obliczeń, odczytać bieżące skumulowane zużycie oraz wartość referencyjną i opisać różnicę (np. „zużywam o około 10 kWh mniej niż rok temu”) w mniej niż 1 minutę.
- **SC-003**: Dla typowego zakresu danych (co najmniej miesiąc historii) karta renderuje się w czasie akceptowalnym dla użytkownika, tak że interaktywne wyświetlenie porównania nie jest odczuwalne jako opóźnione (subiektywnie „prawie natychmiastowe” przy przejściu na dashboard).
- **SC-004**: W co najmniej 90% przypadków użytkownicy nie potrzebują dodatkowych wyjaśnień ani dokumentacji, aby zrozumieć, jak interpretować dwie serie na wykresie i podstawowe tekstowe podsumowania (w badaniach z obserwacją użytkowników lub feedbackiem jakościowym).  

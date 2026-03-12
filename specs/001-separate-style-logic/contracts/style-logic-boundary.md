# Contract: Granica między warstwą stylów a logiką karty

## Cel kontraktu

Ten dokument definiuje **stabilną granicę** pomiędzy:

- modułem **stylów** karty (`StyleLayer`), a  
- modułami **logiki** (`CardComponent` + `LogicModules`)

w ramach `Energy Burndown Card`.

Ma on pomóc:
- kontrybutorom w zrozumieniu co można, a czego nie należy robić w poszczególnych plikach,  
- uniknąć regresji, w których zmiana w stylach wymusza niepotrzebne zmiany w logice (i odwrotnie),  
- zachować spójność z featurem `001-ha-theming-classes`.

## Zakres

Kontrakt dotyczy następujących plików:

- `src/card/energy-burndown-card-styles.ts` – moduł stylów (`StyleLayer`),  
- `src/card/cumulative-comparison-chart.ts` – główny komponent karty (`CardComponent`),  
- `src/card/ha-api.ts`, `src/card/chart-renderer.ts` – moduły logiki (`LogicModules`).

## Zasady dla StyleLayer (`energy-burndown-card-styles.ts`)

**Dozwolone:**

- Definiowanie styli przy użyciu `css` / `CSSResult` (LitElement).  
- Stylowanie elementów za pomocą klas i selektorów:
  - `.ebc-card` – główny kontener `ha-card`,  
  - `.ebc-content` – wewnętrzny kontener zawartości,  
  - `.ebc-header` – sekcja nagłówka,  
  - `.ebc-stats` – sekcja statystyk liczbowych,  
  - `.ebc-forecast` – sekcja prognozy,  
  - `.ebc-chart` – sekcja wykresu (kontener `<canvas>`).  
- Używanie CSS variables Home Assistanta (np. `--primary-color`, `--accent-color`, `--secondary-text-color`, `--divider-color`) do powiązania wyglądu z motywem.  
- Kontrolowanie layoutu, typografii, spacingu, kolorów, responsywności.

**Zabronione:**

- Importowanie lub wywoływanie kodu z:
  - `cumulative-comparison-chart.ts`,  
  - `ha-api.ts`,  
  - `chart-renderer.ts`,  
  - innych modułów TypeScript odpowiedzialnych za logikę danych.  
- Dostęp do obiektu `hass` lub jakichkolwiek danych encji.  
- Zakodowywanie semantycznych progów i logiki biznesowej (np. „gdy zużycie > X – kolor czerwony”); takie decyzje należą do logiki i mogą być odzwierciedlane np. przez dodatkowe klasy/stany przekazywane z komponentu.

## Zasady dla CardComponent (`cumulative-comparison-chart.ts`)

**Dozwolone:**

- Importowanie `StyleLayer` z `energy-burndown-card-styles.ts` i przypisanie go jako `static styles`.  
- Definiowanie struktury HTML w metodzie `render()` z użyciem klas `.ebc-*`:
  - otaczanie sekcji wewnątrz kontenerów z tymi klasami,  
  - zmiana kolejności sekcji (np. `.ebc-forecast` nad `.ebc-chart`) przy zachowaniu spójności z layoutem.  
- Używanie `LogicModules` do:
  - pobierania i przetwarzania danych,  
  - wyliczania wartości do wyświetlenia,  
  - przygotowania serii do wykresu.  
- Dodawanie dodatkowych klas/states (np. `trend-up`, `trend-down`, `state-partial`) na poziomie HTML, jeśli logika wymaga rozróżnienia stanów.

**Zabronione:**

- Implementowanie rozbudowanych styli inline w `render()` (np. `style="..."` jako główny mechanizm layoutu).  
- Definiowanie długich bloków `css\`...\`` bezpośrednio w tym pliku – całość styli powinna trafić do `energy-burndown-card-styles.ts`, poza ewentualnymi minimalnymi wyjątkami (np. tymczasowe style eksperymentalne, które później zostaną przeniesione).  
- Poleganie na szczegółach implementacji styli (np. „to działa, bo `.ebc-chart` ma konkretny `margin-top`”) przy projektowaniu logiki; logika powinna opierać się na strukturze i danych, nie na numerach pikseli.

## Zasady dla LogicModules (`ha-api.ts`, `chart-renderer.ts`, ... )

**Dozwolone:**

- Odpowiadanie za:
  - składanie zapytań do API HA (np. `recorder/statistics_during_period`),  
  - przetwarzanie i agregację danych (sumy, różnice, forecast),  
  - przygotowanie danych wejściowych dla Chart.js.  
- Ewentualne wykorzystanie klas/selektorów do znalezienia elementu `<canvas>` (np. przez referencję przekazaną z komponentu lub najbliższy kontener), bez zakodowywania layoutu w logice.

**Zabronione:**

- Definiowanie jakichkolwiek styli CSS (`css\`...\``, `style="..."`, manipulacja stylem inline jako główny mechanizm layoutu).  
- Odwoływanie się do konkretnych klas `.ebc-*` w logice biznesowej jako warunku działania (np. „jeśli `.ebc-chart` ma daną klasę, to licz inaczej dane”).  
- Uzależnianie poprawności obliczeń od wyglądu (np. przeliczanie czegoś na podstawie wymiarów elementu z CSS).

## Mapowanie sekcji → klasy CSS

Poniższa tabela opisuje obecne powiązania pomiędzy sekcjami karty a klasami CSS, z których korzysta moduł styli:

| Sekcja karty            | Główny element DOM         | Klasa CSS        | Opis                                                 |
|-------------------------|----------------------------|------------------|------------------------------------------------------|
| Cała karta              | `ha-card`                  | `.ebc-card`      | Styl kontenera karty (tło, ramka, padding)          |
| Zawartość karty         | wewn. `div`                | `.ebc-content`   | Ogólny kontener na sekcje wewnętrzne                |
| Nagłówek                | `div` w `render()`         | `.ebc-header`    | Tytuł, opis trendu                                   |
| Statystyki liczbowe     | `div` w `render()`         | `.ebc-stats`     | Wiersze/kafelki z wartościami bieżącego/ref. okresu |
| Prognoza                | `div` w `render()`         | `.ebc-forecast`  | Tekstowa informacja o prognozie                     |
| Wykres (kontener)       | `div` wokół `<canvas>`     | `.ebc-chart`     | Obszar wykresu, wysokość, marginesy                 |

Zmiany w tej tabeli (np. dodanie nowej głównej sekcji) powinny być synchronizowane pomiędzy:
- `cumulative-comparison-chart.ts` (HTML),  
- `energy-burndown-card-styles.ts` (CSS),  
- dokumentacją (np. `quickstart.md`).

## Przykładowe scenariusze zmian

### 1. Zmiana kolorów i typografii karty

- **Modyfikowane pliki**:  
  - `src/card/energy-burndown-card-styles.ts`  
- **NIE modyfikujemy**:  
  - `cumulative-comparison-chart.ts`,  
  - `ha-api.ts`,  
  - `chart-renderer.ts`.  

### 2. Przeniesienie sekcji prognozy nad wykres

- **Modyfikowane pliki**:  
  - `src/card/cumulative-comparison-chart.ts` (zmiana kolejności bloków w `render()`)  
- **NIE modyfikujemy**:  
  - `ha-api.ts` (algorytm prognozy),  
  - `energy-burndown-card-styles.ts` (poza ewentualną korektą marginesów, jeśli potrzebna).

### 3. Zmiana algorytmu forecastu / obliczeń

- **Modyfikowane pliki**:  
  - `src/card/ha-api.ts` (logika forecastu),  
  - ewentualnie `chart-renderer.ts` (sposób prezentacji serii).  
- **NIE modyfikujemy**:  
  - `src/card/energy-burndown-card-styles.ts` (wygląd),  
  - `cumulative-comparison-chart.ts` (layout sekcji), poza sytuacjami dodania nowej sekcji danych.

## Weryfikacja kontraktu

Przy każdej większej zmianie w karcie, reviewer powinien zadać sobie pytania:

1. Czy w plikach logiki nie pojawił się kod dotyczący styli (CSS, layout)?  
2. Czy w pliku styli nie ma żadnych odniesień do logiki (importy TS, warunki oparte na danych)?  
3. Czy zmiany w strukturze HTML i klasach `.ebc-*` są odzwierciedlone w module styli i dokumentacji?  

Jeśli odpowiedź na którykolwiek punkt jest negatywna, zmiana wymaga korekty przed mergem.


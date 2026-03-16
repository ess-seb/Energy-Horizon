# Data Model: Separacja warstwy stylów od logiki karty

## Overview

Ten feature nie wprowadza nowych bytów domenowych (danych energii), ale definiuje **architektoniczny model** odpowiedzialności wewnątrz karty `Energy Horizon Card`.  
Kluczowe jednostki to:

- `StyleLayer` – moduł stylów karty,  
- `CardComponent` – główny komponent karty (LitElement),  
- `LogicModules` – moduły logiki wspierające kartę.

## Entities

### 1. StyleLayer

- **Nazwa**: `StyleLayer`  
- **Implementacja**: `src/card/energy-horizon-card-styles.ts`  
- **Rola**:  
  - definiuje wygląd karty (`css` / `CSSResult`) na potrzeby LitElement,  
  - korzysta z motywów HA poprzez CSS variables (`--primary-color`, `--accent-color`, `--secondary-text-color`, `--divider-color`, itd.),  
  - styluje główne sekcje karty i ich elementy składowe.

**Pola / aspekty (pojęciowo):**

- `rootCardStyles` – stylizacja elementu `ha-card.ebc-card` (padding, tło, ramka, cienie).  
- `headerStyles` – stylizacja `.ebc-header` (typografia, odstępy).  
- `statsStyles` – stylizacja `.ebc-stats` (układ kolumn, wyrównanie, typografia liczb i jednostek).  
- `forecastStyles` – stylizacja `.ebc-forecast` (sekcja prognozy – marginesy, rozmiar czcionek, kolory pomocnicze).  
- `chartContainerStyles` – stylizacja `.ebc-chart` i elementu `<canvas>` (wysokość, marginesy, responsywność).

**Powiązania:**

- Jest konsumowany przez `CardComponent` jako `static styles`.  
- Używa wyłącznie klas i selektorów zdefiniowanych w strukturze HTML – nie ma bezpośredniej wiedzy o logice.

### 2. CardComponent

- **Nazwa**: `CardComponent`  
- **Implementacja**: `src/card/cumulative-comparison-chart.ts`  
- **Rola**:  
  - reprezentuje główny web component karty (`custom:energy-horizon-card`),  
  - obsługuje konfigurację z HA (`setConfig`, `hass`),  
  - koordynuje pobieranie danych, obliczenia i renderowanie UI (współpracuje z `LogicModules`),  
  - definiuje strukturę HTML i przypisuje semantyczne klasy `.ebc-*`.

**Kluczowe elementy struktury HTML (pojęciowo):**

- `ha-card.ebc-card` – kontener główny karty.  
- `.ebc-content` – wewnętrzny kontener zawartości karty.  
- `.ebc-header` – sekcja nagłówka (tytuł, opis trendu).  
- `.ebc-stats` – sekcja statystyk liczbowych (bieżący okres, okres referencyjny, różnica, procent, opcjonalnie suma referencyjna).  
- `.ebc-forecast` – sekcja prognozy (wartość prognozy, poziom pewności).  
- `.ebc-chart` – sekcja wykresu, zawierająca `<canvas>`.

**Powiązania:**

- Importuje `StyleLayer` (`energy-horizon-card-styles.ts`) i przypisuje go do `static styles`.  
- Korzysta z `LogicModules` do pobierania danych i przygotowania serii wykresu.  
- Nie implementuje własnych styli poza przypisaniem `static styles`.

### 3. LogicModules

- **Nazwa**: `LogicModules` (zbiorczo)  
- **Implementacje**:  
  - `src/card/ha-api.ts` – logika komunikacji z Home Assistant (`recorder/statistics_during_period`, mapowanie danych, normalizacja, forecast),  
  - `src/card/chart-renderer.ts` – logika przygotowania danych do Chart.js, tworzenie/aktualizacja instancji wykresu,  
  - inne pomocnicze moduły TS, jeśli występują.

**Rola:**

- Odpowiadają za operacje na danych – od pobrania LTS po przygotowanie serii do wyświetlenia.  
- Są całkowicie niezależne od modułu styli – ich API operuje na danych, nie na szczegółach CSS.

**Powiązania:**

- Konsumowane przez `CardComponent`, który przekazuje dane/konfigurację i renderuje wynik w strukturze HTML.  
- Nie odnoszą się bezpośrednio do klas `.ebc-*` – ewentualna wiedza o strukturze DOM jest ograniczona do elementów wykresu (np. kontener `<canvas>`).

## Relationships

```text
StyleLayer (energy-horizon-card-styles.ts)
    ↑  (static styles)
CardComponent (cumulative-comparison-chart.ts)
    ↕  (dane, wywołania funkcji)
LogicModules (ha-api.ts, chart-renderer.ts, ...)
```

- Zmiana w **StyleLayer** (np. kolory, marginesy) nie powinna wymagać modyfikacji `LogicModules`.  
- Zmiana w **LogicModules** (np. nowy algorytm forecastu) nie powinna wymuszać zmian w `StyleLayer`.  
- **CardComponent** jest jedynym miejscem, gdzie łączą się: konfiguracja HA, logika danych i struktura HTML/styl.

## Constraints & Invariants

- StyleLayer nie importuje ani nie wywołuje kodu z `LogicModules` ani `CardComponent`.  
- LogicModules nie implementują styli (brak `css\`...\`` w tych plikach).  
- Klasy `.ebc-*` są stabilne i zdefiniowane jako kontrakt (patrz katalog `contracts/`), tak aby StyleLayer i CardComponent mogły być rozwijane niezależnie przy zachowaniu spójności.  
- Granica styl/logika musi pozostać czytelna również po ewentualnych przyszłych rozszerzeniach karty (nowe sekcje, nowe tryby wyświetlania).


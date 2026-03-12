# Quickstart: Jak zmieniać wygląd karty bez dotykania logiki

Ten dokument pokazuje, jak w praktyce korzystać z separacji **stylów** i **logiki** w `Energy Burndown Card` po wdrożeniu feature’u `001-separate-style-logic`.

## 1. Gdzie znajdują się style, a gdzie logika?

- **Styl karty (warstwa wizualna)**  
  - Plik: `src/card/energy-burndown-card-styles.ts`  
  - Zawiera: deklaracje `css\`...\`` / `CSSResult` używane przez LitElement (`static styles`).  
  - Odpowiada za: kolory, typografię, spacing, layout, responsywność.

- **Główny komponent karty (logika + HTML)**  
  - Plik: `src/card/cumulative-comparison-chart.ts`  
  - Zawiera: konfigurację karty, obsługę `hass`, wywołania API, strukturę HTML (sekcje `.ebc-*`).  

- **Logika danych (pobieranie, obliczenia, wykres)**  
  - Pliki:  
    - `src/card/ha-api.ts` – mapowanie i przetwarzanie danych z Home Assistant,  
    - `src/card/chart-renderer.ts` – integracja z Chart.js.  

Jeśli chcesz **tylko zmienić wygląd**, zwykle wystarczy edytować `energy-burndown-card-styles.ts`.

## 2. Zmiana kolorów i typografii karty

1. Otwórz `src/card/energy-burndown-card-styles.ts`.  
2. Zlokalizuj reguły odpowiadające za globalny wygląd karty, np. selektor `.ebc-card` lub `.ebc-header`.  
3. Zmień wartości styli tak, aby korzystały z pożądanych kolorów (najlepiej poprzez CSS variables HA, np. `var(--primary-color)`, `var(--secondary-text-color)`).  
4. Zbuduj projekt (`npm run build`) i przeładuj zasoby karty w HA (lub odśwież stronę z dashboardem).

**Oczekiwany efekt**:  
Wygląd karty (kolory, fonty) zmienia się, ale:
- dane, wykres, tekstowe nagłówki i statystyki działają identycznie jak przed zmianą,  
- konsola przeglądarki nie pokazuje nowych błędów.

## 3. Zmiana layoutu sekcji (np. kolejność prognozy i wykresu)

1. Otwórz `src/card/cumulative-comparison-chart.ts`.  
2. Znajdź metodę `render()`.  
3. Zlokalizuj bloki odpowiadające za poszczególne sekcje:
   - nagłówek – element z klasą `.ebc-header`,  
   - statystyki – element z klasą `.ebc-stats`,  
   - prognoza – element z klasą `.ebc-forecast`,  
   - wykres – element z klasą `.ebc-chart`.  
4. Zmień kolejność tych bloków w `render()`, zgodnie z pożądanym layoutem (np. przesuń sekcję prognozy nad wykres).  
5. Jeśli to konieczne, dopracuj marginesy/wysokości w `energy-burndown-card-styles.ts`.

**Oczekiwany efekt**:  
Kolejność sekcji zmienia się, ale:
- dane, obliczenia i wykres nadal są poprawne,  
- logika w `ha-api.ts` i `chart-renderer.ts` nie wymaga zmian.

## 4. Kiedy **nie** dotykać modułu stylów?

Jeśli pracujesz nad:
- nowym algorytmem forecastu,  
- zmianą sposobu agregacji danych,  
- nową metryką w sekcji statystyk,

to:
- edytuj odpowiednio `ha-api.ts`, `chart-renderer.ts` lub logikę w `cumulative-comparison-chart.ts`,  
- **nie modyfikuj** `energy-burndown-card-styles.ts`, chyba że wprowadzasz zupełnie nową sekcję UI, która wymaga nowych klas.

## 5. Szybki checklist dla bezpiecznych zmian wizualnych

Przed commitem zmian wizualnych:

- [ ] Zmiany wprowadzone wyłącznie w `energy-burndown-card-styles.ts` **lub** w strukturze HTML `render()` (`cumulative-comparison-chart.ts`).  
- [ ] Żaden z plików logiki (`ha-api.ts`, `chart-renderer.ts`) nie został zmodyfikowany, jeśli zmiana dotyczy tylko wyglądu.  
- [ ] Karta buduje się (`npm run build`), a dashboard ładuje się bez błędów JS.  
- [ ] W losowo wybranej konfiguracji karty sprawdziłeś, że dane nadal mają sens (zużycie, porównanie, prognoza).

## 6. Jak to się ma do themingu HA i Card‑Mod?

- Moduł stylów korzysta z CSS variables HA, więc globalne motywy (jasny/ciemny, motywy społecznościowe) nadal działają tak jak opisano w feature’ze `001-ha-theming-classes`.  
- Zaawansowani użytkownicy nadal mogą nadpisywać wygląd poprzez:
  - własne motywy HA,  
  - zewnętrzne dodatki (np. Card‑Mod), korzystając z klas `.ebc-*`.  

Separacja styl/logika ułatwia takie modyfikacje, bo:
- styl jest w jednym pliku,  
- nazwy klas są stabilne i opisane w kontrakcie.


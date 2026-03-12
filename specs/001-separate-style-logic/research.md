# Research: Separacja warstwy stylów od logiki karty

## Cel researchu

Celem tego dokumentu jest:
- doprecyzowanie przyjętego podejścia do rozdzielenia warstwy **stylów** od **logiki** w `Energy Burndown Card`,  
- zebranie minimalnego kontekstu technicznego potrzebnego do bezpiecznej refaktoryzacji istniejącej karty,  
- wyjaśnienie relacji tego feature’u do wcześniejszego `001-ha-theming-classes`.

## 1. Stylowanie web components w kontekście Home Assistant

### Opcje stylowania LitElement/Web Components

Rozważane warianty:

1. **Inline `static styles` w głównym komponencie**  
   - Zalety: prostota, brak dodatkowych importów.  
   - Wady: mieszanie logiki i styli w jednym pliku; trudniejsze code review i edycja wyłącznie wizualna; większe ryzyko konfliktów przy zmianach.

2. **Osobny moduł TS eksportujący `css` (Lit)** ✅ WYBRANE  
   - Zalety:  
     - wyraźna granica między plikiem z logiką a plikiem z warstwą wizualną,  
     - nadal korzysta z tego samego mechanizmu (`static styles = [styles]`),  
     - łatwy import w innych komponentach w przyszłości,  
     - styl pozostaje „blisko” komponentu (lokalny moduł w `src/card/`), ale nie miesza się z logiką.
   - Wady: dodatkowy plik i import, konieczność pilnowania spójności nazw klas.

3. **Globalne arkusze CSS / style w motywie HA**  
   - Zalety: lepsza integracja z instalacją użytkownika.  
   - Wady: mniejsza kontrola nad kapsułkowaniem styli, potencjalne konflikty z innymi kartami; w praktyce i tak stosowane w formie CSS variables dla themingu (obsłużone w `001-ha-theming-classes`).

4. **CSS Modules / inne zaawansowane mechanizmy bundlowania styli**  
   - Zalety: większa modularność, potencjalnie lepsze skalowanie w bardzo dużych projektach.  
   - Wady: dodatkowa złożoność builda, mało uzasadniona w kontekście jednej karty Lovelace.

### Decyzja

**Decyzja**: Używamy **osobnego modułu TS** (`energy-burndown-card-styles.ts`), który eksportuje `css` / `CSSResult` konsumowany przez `cumulative-comparison-chart.ts` jako `static styles`.  
Jest to najprostsze rozwiązanie, które jednocześnie:
- spełnia wymagania separacji stylów od logiki,  
- pozostaje kompatybilne z dotychczasowym sposobem pisania styli w LitElement,  
- dobrze współgra z themingiem HA (CSS variables).

## 2. Relacja do themingu HA (`001-ha-theming-classes`)

Feature `001-ha-theming-classes` już wprowadza:
- wykorzystanie zmiennych HA (`--primary-color`, `--accent-color`, `--secondary-text-color`, `--divider-color`, itp.),  
- semantyczne klasy `.ebc-*` na głównych sekcjach karty,  
- opis możliwości modyfikacji UI przez użytkownika (Card‑Mod, itp.).

`001-separate-style-logic` NIE zmienia sposobu themingu – jedynie:
- porządkuje miejsce, w którym style są trzymane (dedykowany plik),  
- upewnia się, że logika nie miesza się z kodem odpowiedzialnym za wygląd.

Konsekwencje:
- Moduł styli powinien korzystać z **tych samych** CSS variables i klas `.ebc-*`, co zostało zaplanowane w `001-ha-theming-classes`.  
- Refaktoryzacja nie może złamać kontraktu klas i themingu opisanego w tamtym feature’ze.

## 3. Granica odpowiedzialności: Style vs Logika

### StyleLayer (moduł styli)

Stylom wolno:
- używać klas (`.ebc-card`, `.ebc-header`, `.ebc-stats`, `.ebc-forecast`, `.ebc-chart`),  
- korzystać z CSS variables HA (kolory, tła, tekst),  
- kontrolować layout (marginesy, padding, flex/grid),  
- odpowiadać za responsywność i drobne efekty wizualne (np. font-weight, zaokrąglenia).

Stylom NIE wolno:
- odwoływać się do logiki (brak importów z `ha-api.ts`, `chart-renderer.ts`, brak dostępu do `hass`),  
- kodować w CSS konkretnej semantyki danych (np. „gdy zużycie > X – zmień kolor” – takie decyzje należą do logiki i są odzwierciedlane klasami/atrybutami, jeśli to konieczne).

### LogicLayer (komponent i moduły logiki)

Logice wolno:
- decydować o stanie UI (np. który blok wyświetlić, jakie dane przekazać do wykresu, jakie teksty w nagłówkach),  
- wyliczać klasy/stany (np. dodać klasę „trend-up” vs „trend-down”),  
- zarządzać kolejnością sekcji w `render()`.

Logice NIE wolno:
- utrzymywać bloków `css\`...\`` czy `unsafeCSS` wewnątrz modułów danych,  
- polegać na konkretnej implementacji styli (np. „ta logika działa, bo `margin-top` jest takie a takie”).

## 4. Ryzyka i mitigacje

**Ryzyko 1**: Rozjazd między modułem styli a strukturą HTML (np. usunięcie klasy w HTML, która jest nadal stylowana).  
**Mitigacja**:  
- kontrakt w `contracts/style-logic-boundary.md` opisujący mapę „sekcja → klasa”,  
- krótkie checklisty w code review: zmiana struktury HTML → sprawdź moduł styli.

**Ryzyko 2**: Niewidoczne regresje w themingu po przeniesieniu styli.  
**Mitigacja**:  
- smoke‑test w kilku motywach HA po refaktoryzacji (jasny/ciemny + 1–2 motywy społecznościowe),  
- zachowanie istniejących zmiennych i klas, tylko zmiana miejsca ich zdefiniowania.

**Ryzyko 3**: Zwiększenie liczby plików utrudnia orientację początkującym.  
**Mitigacja**:  
- `quickstart.md` wskazuje jednoznacznie, gdzie jest logika, a gdzie style,  
- nazwa modułu styli jest silnie powiązana z kartą (`energy-burndown-card-styles.ts`).

## 5. Podsumowanie decyzji

- **Decyzja 1**: Używamy **osobnego modułu TS z `css`** jako warstwy styli (`energy-burndown-card-styles.ts`).  
- **Decyzja 2**: Główny komponent karty (`cumulative-comparison-chart.ts`) importuje moduł styli i deklaruje go jako `static styles`, nie przechowując styli inline.  
- **Decyzja 3**: Logika (w tym integracja z Chart.js i HA API) pozostaje w osobnych plikach i nie zawiera bezpośrednich styli.  
- **Decyzja 4**: Kontrakt między stylami a logiką (klasy `.ebc-*`, sekcje layoutu) jest udokumentowany w katalogu `contracts/` oraz w `quickstart.md`.


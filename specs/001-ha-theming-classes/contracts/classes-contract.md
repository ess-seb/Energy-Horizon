# UI Contract – CSS klasy karty Energy Horizon

## Cel

Ten kontrakt opisuje, jakie klasy CSS są stabilnie wystawione przez kartę `energy-horizon-card`, tak aby użytkownicy mogli:

- ukrywać wybrane sekcje (np. prognozę),
- zmieniać ich rozmiar (np. wysokość wykresu),
- nadpisywać marginesy, typografię, kolory w zaawansowanych scenariuszach (np. Card‑Mod).

## Stabilne klasy CSS

- `.ehc-card` – główny kontener karty (`ha-card`)
- `.ehc-content` – wnętrze karty zawierające nagłówek, statystyki i wykres
- `.ehc-header` – nagłówek z tekstowym opisem trendu
- `.ehc-stats` – sekcja statystyk liczbowych (bieżący / referencyjny okres, różnice)
- `.ehc-forecast` – sekcja prognozy (jeśli włączona)
- `.ehc-chart` – kontener wykresu (obszar `<canvas>`)

## Przykłady użycia (np. z Card‑Mod)

### Ukrycie sekcji prognozy

```yaml
type: custom:energy-horizon-card
entity: sensor.energy_consumption_total
comparison_mode: year_over_year
card_mod:
  style: |
    .ehc-forecast {
      display: none;
    }
```

### Zwiększenie wysokości wykresu

```yaml
type: custom:energy-horizon-card
entity: sensor.energy_consumption_total
comparison_mode: month_over_year
card_mod:
  style: |
    .ebc-chart {
      height: 260px;
    }
```

### Zmiana marginesów wokół statystyk

```yaml
type: custom:energy-horizon-card
entity: sensor.energy_consumption_total
comparison_mode: year_over_year
card_mod:
  style: |
    .ebc-stats {
      margin-bottom: 20px;
    }
```


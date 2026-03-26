# Configuration and Customization

This page combines full option reference with practical customization notes.

## Core options

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | string | required | Must be `custom:energy-horizon-card` |
| `entity` | string | required | Entity with long-term statistics |
| `comparison_mode` | string | required | `year_over_year` or `month_over_year` |
| `aggregation` | string | `day` | `day`, `week`, `month` |
| `period_offset` | number | `-1` | Reference period shift |

## Display options

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | string | entity name | Custom title |
| `show_title` | boolean | `true` | Show title |
| `icon` | string | entity icon | Custom icon |
| `show_icon` | boolean | `true` | Show icon |
| `show_legend` | boolean | `false` | Show ECharts legend |
| `show_forecast` | boolean | `false` | Show forecast line when forecast is available |

## Units, precision, language

| Option | Type | Default | Description |
|---|---|---|---|
| `precision` | number | `2` | Decimal places |
| `force_prefix` | string | `auto` | `auto`, `none`, `k`, `M`, `G`, `m`, `u` |
| `language` | string | from HA | Language override |
| `number_format` | string | from HA | `comma`, `decimal`, `language`, `system` |

### Smart prefix scaling

- `auto` (default): choose best prefix from data range
- `none`: no scaling, keep raw values from HA
- `k`, `M`, `G`, `m`, `u`: force fixed display prefix

Notes:

- use `u` in YAML for micro prefix,
- non-scalable units like `%`, `degC`, `h`, `min`, `s` remain unchanged.

## Comparison behavior

### `comparison_mode`

- `year_over_year`: compares current period to same period last year
- `month_over_year`: compares current month to same month in previous year

### `aggregation`

- `day`: most detail
- `week`: smoother trend
- `month`: broad trend only

### `period_offset`

Shifts reference period by N comparable periods (`-1` is previous comparable period).

## Theming and Card-Mod

The card follows HA theme variables:

- `--primary-color`
- `--accent-color`
- `--secondary-text-color`
- `--divider-color`

Exposed CSS classes:

- `.ehc-card`
- `.ehc-content`
- `.ehc-header`
- `.ehc-stats`
- `.ehc-forecast`
- `.ehc-chart`

Card-Mod example:

```yaml
type: custom:energy-horizon-card
entity: sensor.energy_consumption_total
comparison_mode: year_over_year
card_mod:
  style: |
    .ehc-chart {
      height: 260px;
    }
```

# Aggregation and axis labels

This page summarizes **automatic aggregation**, **optional forced X-axis format**, **locale**, **mobile-friendly** axis layout, and the **point cap** — aligned with the implementation in the repository.

## Automatic aggregation (`aggregation` omitted)

After **preset → `time_window` → card `aggregation`** merge, if **`aggregation` is still unset**, the card chooses **`hour`**, **`day`**, **`week`**, or **`month`** from the merged window **`duration`** so the number of timeline slots is typically in a **~20–100** readability band (when possible with LTS-supported steps).

If you set **`aggregation`** at card level or under `time_window`, that value wins per the merge rules and auto-selection is **not** applied.

## Optional `x_axis_format` (card-level)

- **Omitted**: adaptive labels (see below).
- **Set**: every visible X tick is formatted with **Luxon** `toFormat` using **Home Assistant’s time zone**. Only a **documented subset** of Luxon tokens is accepted; unsupported patterns produce a **configuration error** when the card loads (no silent fallback to adaptive).

Example:

```yaml
x_axis_format: yyyy-MM-dd HH:mm
```

## Adaptive labels (default)

Without `x_axis_format`, tick text is built with **`Intl.DateTimeFormat`** in the resolved label locale. The **first tick** is always treated as a **calendar boundary** for context. Day / month / year changes along the axis add context when needed.

## Locale cascade (labels)

Order: card **`language`** → **`hass.locale.language`** → **`en`**.

## Time zone

Axis timestamps always use **Home Assistant’s configured time zone** (`hass.config.time_zone`), not the browser’s local zone.

## Point cap

If the shared timeline has **more than 5000** slots, the card shows a **localized error** and does not load the chart. Enable **`debug: true`** on the card to print details (including actual slot count) to the **browser console**.

## Mobile / narrow layout

The X axis keeps labels **horizontal** (`rotate: 0`) and uses **label overlap hiding** so the chart remains readable on small viewports. **Manual smoke**: verify on a phone or narrow panel that an over-cap error still shows **`ha-alert`**, not a white screen.

## See also

- Repository spec: `specs/001-aggregation-axis-labels/spec.md`
- Contract: `specs/001-aggregation-axis-labels/contracts/card-config-axis.md`

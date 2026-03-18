# Implementation Plan: i18n / l10n – Energy Horizon Card

**Spec**: [link]
**Branch**: `002-i18n-localization` | **Date**: 2026-03-10 | **Spec**: [spec.md](./spec.md)

---

## Summary

Add full localization support to the Energy Horizon Card. The card will automatically read language, number format, and time zone from `hass.locale` / `hass.config`, with optional per-card YAML overrides (`language`, `number_format`). All 23 currently hardcoded Polish strings are migrated to per-language JSON dictionaries (`src/translations/en.json`, `src/translations/pl.json`). Dynamic phrases use `{{variable}}` interpolation. A new `localize.ts` module provides the `createLocalize()` factory and `resolveLocale()` helper. Logic code (`ha-api.ts`) is decoupled from UI strings: `computeTextSummary` returns trend enum + numeric diff; the component assembles the display string. The card re-renders reactively on `hass.locale` change; missing translation keys trigger a card error state with optional debug console output.

---

## Technical Context

**Language/Version**: TypeScript 5 (strict mode)  
**Primary Dependencies**: LitElement 4, Vite (bundler), Chart.js  
**Storage**: N/A – translations bundled statically at build time (Vite JSON import)  
**Testing**: Vitest (unit tests for `localize.ts` and refactored `computeTextSummary`)  
**Target Platform**: Home Assistant Lovelace (browser, Web Component)  
**Project Type**: HACS Lovelace card (single-file web component)  
**Performance Goals**: No impact on render performance; translation lookup is O(1) dictionary access  
**Constraints**: All translations bundled in `dist/energy-horizon-card.js`; no runtime fetch  
**Scale/Scope**: ~23 translation keys; 2 mandatory languages (pl, en)

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I. HA/HACS compatibility | ✅ Pass | Reads `hass.locale` and `hass.config` per HA Lovelace card conventions; new YAML keys `language` and `number_format` follow HA naming patterns |
| II. Security & error resilience | ✅ Pass | Translation values are static JSON (no runtime user input); missing keys trigger controlled error state, not a crash |
| III. Code quality & TypeScript | ✅ Pass | New `localize.ts` is a pure function module; strict types for `ResolvedLocale`, `LocalizeFunction`; no `any` |
| IV. UX/UI & HA look & feel | ✅ Pass | Reactivity on locale change is consistent with HA dashboard UX; error state uses existing `ha-alert` pattern |
| V. Performance & simplicity | ✅ Pass | O(1) dictionary lookup; no new NPM dependencies; ~30 lines for `localize.ts` core logic |
| Extra: no unjustified dependencies | ✅ Pass | Variable interpolation implemented with a regex (~5 lines); no i18n library added |


**Gate result**: All principles pass. Proceeding to Phase 1 design. ✅

---

## Project Structure

### Documentation (this feature)

```text
specs/002-i18n-localization/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── localize-api.md  ← Phase 1 output
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Source Code

```text
src/
├── translations/         ← NEW
│   ├── en.json           ← NEW – English dictionary (23 keys)
│   └── pl.json           ← NEW – Polish dictionary (23 keys)
├── card/
│   ├── localize.ts               ← NEW – createLocalize(), resolveLocale(), numberFormatToLocale()
│   ├── types.ts                  ← MODIFIED – CardConfig.language?, CardConfig.number_format?; TextSummary refactor
│   ├── ha-api.ts                 ← MODIFIED – computeTextSummary returns trend + diff (no heading string)
│   ├── cumulative-comparison-chart.ts  ← MODIFIED – resolveLocale() + createLocalize() + replace all hardcoded strings
│   ├── chart-renderer.ts         ← MODIFIED – accept localized period labels as parameters
│   ├── energy-horizon-card-styles.ts  ← unchanged
│   └── (no theme-utils.ts)       ← theming jest częścią `chart-renderer.ts` w aktualnym kodzie
├── ha-types.ts           ← MODIFIED – extend HomeAssistant.locale and add config.time_zone
└── index.ts              ← unchanged
```

**Structure Decision**: Single-project layout preserved. New `src/translations/` folder added at the same level as `src/card/` to keep dictionary files separate from card logic and easy to find for contributors.

---

## Complexity Tracking

No Constitution violations. No complexity tracking entry required.

# Changelog

All notable changes to **Energy Horizon Card** (Home Assistant Lovelace / HACS) are documented in this file.


## [Unreleased]

### Added (documentation)

- Draft feature specification for intelligent aggregation and X-axis labeling (`specs/001-aggregation-axis-labels/spec.md`): auto-interval from `duration`, YAML overrides, adaptive axis labels, locale cascade, no bundled month/day dictionaries for the axis, mobile-friendly horizontal labels, hard cap on points per series, README and Wiki placeholder links.

## [0.4.0-beta] - 2026-03-29

### Added
- Time windows engine: advanced YAML `time_window` support (preset merge, validation, LTS constraints, up to 24 windows).
- Luxon dependency for resolving anchored time ranges and window calculations.

### Changed
- Clarified `comparison_preset` semantics in docs (`year_over_year`, `month_over_year`, `month_over_month`, including “month over month” meaning two consecutive full calendar months).
- Documented forecast default behavior and configuration (`show_forecast`, alias `forecast`).

### Fixed
- ECharts renderer refactors (series layering and legend ordering).


## [0.3.1-beta] - First public beta release 
### Changed
  – Visual configuration form: lovelace visual editor (`getConfigElement` / `getStubConfig`) for common fields: entity, title, comparison preset, and `force_prefix`, with YAML mode preserving YAML-only keys.
  - Chartjs -> ECharts migration


## [0.2.0]
### Added
  - Localization / locale formatting
  - Smart unit scaling
  - Theming and style separation
### Fixed
  – Chart fixies


## [0.1.0]
### Added
  - Base functionality
  – Data visualizing
  - Base card/LTS support
  – Forecasting
  – Statistics


### Notes
The format is based on [Keep a Changelog](https://keepachangelog.com/).
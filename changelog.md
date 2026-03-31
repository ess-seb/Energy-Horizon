# Changelog

User-facing release notes for **Energy Horizon Card** (Home Assistant Lovelace / HACS).

The format is based on [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

- No user-facing changes documented yet.

## [0.4.0] - 2026-03-29

### Added

- **Advanced “time windows” configuration**: you can define one or more custom date ranges in YAML (with validation and safe limits) to control what the card compares and how the timeline is built.

### Changed

- **Clearer comparison presets**: documentation and behavior descriptions were aligned so it’s easier to understand what each `comparison_preset` does (especially `month_over_month` as two consecutive full calendar months).
- **Forecast option clarity**: the forecast line is controlled via `show_forecast` (alias: `forecast`), making it easier to explicitly hide/show it.

## [0.3.2-beta] - 2026-03-26

### Added

- **Visual editor (UI)** in Lovelace for common settings (entity, title, comparison preset, unit prefix). YAML mode remains available and preserves advanced keys.

## [0.3.1-beta] - 2026-03-23

### Changed

- Release/tag housekeeping (no notable user-facing difference vs `0.3.0`).

## [0.3.0] - 2026-03-23

### Added

- Early public beta of the Energy Horizon Card experience: cumulative comparison chart, summary values, and forecast (when available).

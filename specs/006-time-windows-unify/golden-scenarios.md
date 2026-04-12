# Golden scenarios: unified time windows & axis (006)

**Purpose**: Traceable matrix between YAML/presets, resolved windows, `buildChartTimeline`, and Vitest. **SC-1** parity for preset users; **FR-C** / **FR-D** invariants for multi-window.

## Invariants (all multi-window rows)

| ID | Rule | Check |
|----|------|--------|
| I1 | **FR-C** — Longest-window axis span | For `N ≥ 2`, `timeline.length` = max per-window nominal slot count at `windows[0].aggregation` |
| I2 | **FR-D** — Forecast denominator | `forecastPeriodBuckets` = `countBucketsForWindow(windows[0], timeZone)`, not `timeline.length` when they differ |
| I3 | **FR-H** | Resolve, slots, and tests use the same IANA `time_zone` as HA (no browser-local drift) |
| I4 | Shorter series | Values only within each window’s nominal span on the shared axis; nulls after |

## Scenario matrix

| Row | Preset / YAML sketch | N | primaryAgg | Note |
|-----|----------------------|---|------------|------|
| G1 | `year_over_year` default | 2 | day | YoY — boundaries match `buildComparisonPeriod` + `resolveTimeWindows` |
| G2 | `month_over_year` default | 2 | day | MoY |
| G3 | `month_over_month` default | 2 | day | Two consecutive calendar months |
| G4 | Generic multi-window (count≥3) | ≥3 | day | `timeline.length` = max slots; `forecastPeriodBuckets` from window 0 |
| **G5** | **Two calendar months, day grain (unequal length)** | **2** | **day** | **Current = shorter month (e.g. Feb leap), reference = longer month (e.g. Mar). Same `time_zone`. Expect `timeline.length` = **31** (max of 29 and 31), `forecastPeriodBuckets` = **29** (window 0 only). Reference series ends at index 30; current has no points in tail indices ≥ 29. |

## SC-4 — Reader checklist (wiki / YAML mental model)

After updating `wiki-publish/Mental-Model-Comparisons-and-Timelines.md`, confirm:

- [ ] A reader can configure “this month vs previous month” from YAML without reading `src/` paths.
- [ ] MoY and YoY are described with the same axis rules as this doc (**FR-C**, **FR-D**, tail labeling **FR-B**).
- [ ] Links from this file point at the updated wiki pages.

## Test mapping

| Row | Primary test file |
|-----|-------------------|
| G1–G3 | `tests/unit/time-windows-presets-golden.test.ts` |
| G4 | `tests/unit/ha-api.test.ts` (N≥3 timeline) |
| **G5** | **`tests/unit/ha-api.test.ts` (N=2 unequal month lengths)** |

---

description: "Tasks for feature 002-i18n-localization – Energy Burndown Card"
---

# Tasks: i18n / l10n – Energy Burndown Card

**Input**: Design documents from `/specs/002-i18n-localization/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/localize-api.md`, `quickstart.md`

**Tests**: This feature explicitly calls for unit tests for `localize.ts` and refactored `computeTextSummary` (see `plan.md`). Test tasks are therefore included where appropriate.

**Organization**: Tasks are grouped into phases, with one phase per user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- Single project layout: `src/`, `tests/` at repository root
- Source files for this feature live under `src/card/`, `src/translations/`, `src/ha-types.ts`
- Tests live under `tests/unit/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the repository and environment for implementing localization.

- [X] T001 [P] Confirm `002-i18n-localization` branch is checked out and dependencies installed with `npm install` at repo root
- [X] T002 [P] Review existing Energy Burndown Card implementation in `src/card/` and current hardcoded strings inventory from `specs/002-i18n-localization/research.md`
- [X] T003 [P] Verify Vitest test runner is configured and working by running `npm test` at repo root

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core localization infrastructure that MUST be complete before any user story work begins.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T004 Add `src/translations/en.json` with all required keys from `specs/002-i18n-localization/data-model.md` and `contracts/localize-api.md`
- [ ] T005 [P] Add `src/translations/pl.json` mirroring keys from `src/translations/en.json` with Polish translations
- [ ] T006 [P] Update `src/ha-types.ts` to extend `HomeAssistant.locale` with `number_format` and add `config.time_zone` as per `data-model.md`
- [ ] T007 [P] Update `src/card/types.ts` to add `language?` and `number_format?` fields to `CardConfig` and refactor `TextSummary` type to numeric diff fields only
- [ ] T008 Implement `src/card/localize.ts` with `TranslationDictionary` loading, `createLocalize(language)`, `resolveLocale(hass, config)` and `numberFormatToLocale(numberFormat, language)` following `contracts/localize-api.md`
- [ ] T009 [P] Implement variable interpolation in `src/card/localize.ts` using `{{variableName}}` syntax per `research.md` and `data-model.md`
- [ ] T010 [P] Add unit tests for `createLocalize()` and interpolation behaviour in `tests/unit/localize.test.ts`
- [ ] T011 [P] Add unit tests for `resolveLocale(hass, config)` and `numberFormatToLocale()` mapping in `tests/unit/localize-locale-resolution.test.ts`

**Checkpoint**: Localization infrastructure ready – user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 – Automatic locale from Home Assistant (Priority: P1) 🎯 MVP

**Goal**: When a user adds the Energy Burndown Card without any YAML overrides, the card automatically reads language, number format, and time zone from `hass.locale` / `hass.config` and displays all labels, numbers, and dates using that locale.

**Independent Test**: Configure HA with Polish or English locale. Add the card without extra YAML keys. Verify that labels, numbers, and dates appear in the correct language and format, and that unsupported HA locales fall back to English (`en`) without errors.

### Implementation for User Story 1

- [ ] T012 [P] [US1] Refactor `computeTextSummary` in `src/card/ha-api.ts` to return trend and numeric diff fields (no UI strings) as defined in `data-model.md`
- [ ] T013 [P] [US1] Update `src/card/chart-renderer.ts` to accept localized period and dataset labels as parameters instead of using hardcoded strings
- [ ] T014 [US1] Integrate `resolveLocale(hass, config)` into `src/card/cumulative-comparison-chart.ts` to derive language, number format, and time zone for each render
- [ ] T015 [US1] Replace all hardcoded Polish UI strings in `src/card/cumulative-comparison-chart.ts` with calls to `localize()` using descriptive keys from `src/translations/en.json`
- [ ] T016 [US1] Ensure number and date formatting in `src/card/cumulative-comparison-chart.ts` uses `ResolvedLocale` and `numberFormatToLocale()` for `Intl.NumberFormat` and date formatting
- [ ] T017 [US1] Implement error state handling for missing translations in `src/card/cumulative-comparison-chart.ts` using `error.missing_translation` behaviour from `src/card/localize.ts`
- [ ] T018 [P] [US1] Add unit tests for `computeTextSummary` in `tests/unit/ha-api-text-summary.test.ts` verifying logic is locale-agnostic and returns correct numeric diff and trend
- [ ] T019 [P] [US1] Add rendering-level tests or snapshot tests (if feasible) in `tests/unit/cumulative-comparison-chart-localization.test.ts` to verify `hass.locale` changes update labels and formatted values without YAML overrides

**Checkpoint**: User Story 1 fully functional – card respects HA locale automatically, with all UI text sourced from translation dictionaries and logic code free of UI strings.

---

## Phase 4: User Story 2 – YAML config overrides global locale (Priority: P2)

**Goal**: Allow power users to override the global HA language and number format for a single card instance via `language` and `number_format` keys in the card YAML.

**Independent Test**: Set HA locale to `en`. Add `language: pl` and/or `number_format: comma` to the card YAML. Verify that only this card instance uses Polish labels and/or overridden number format, while the rest of the dashboard continues to use the HA global locale.

### Implementation for User Story 2

- [ ] T020 [P] [US2] Extend `resolveLocale(hass, config)` in `src/card/localize.ts` to prioritise `config.language` and `config.number_format` over `hass.locale` values and defaults
- [ ] T021 [US2] Ensure `CardConfig` in `src/card/types.ts` exposes `language?` and `number_format?` to the card component and that `src/card/cumulative-comparison-chart.ts` passes YAML overrides into `resolveLocale`
- [ ] T022 [US2] Implement validation and safe fallback for invalid `language` and `number_format` values in `src/card/localize.ts`, logging warnings when `config.debug === true`
- [ ] T023 [P] [US2] Add unit tests in `tests/unit/localize-locale-resolution.test.ts` covering YAML overrides for `language` and `number_format` and verifying that they take precedence over HA global settings
- [ ] T024 [US2] Update documentation snippet in `specs/002-i18n-localization/quickstart.md` if needed to reflect final `language` and `number_format` override behaviour

**Checkpoint**: User Story 2 complete – per-card locale overrides work independently of global HA settings and can be tested by YAML-only configuration changes.

---

## Phase 5: User Story 3 – Developer adds a new language (Priority: P3)

**Goal**: Enable contributors to add support for a new language by editing only a translation JSON file, without changing card rendering or logic code.

**Independent Test**: Add `src/translations/de.json` by copying `en.json` and translating values. Set `language: de` in card YAML. Verify that the card shows German labels and formats numbers/dates correctly without any code changes outside `src/translations/de.json`.

### Implementation for User Story 3

- [ ] T025 [P] [US3] Verify `createLocalize(language)` in `src/card/localize.ts` loads `src/translations/<language>.json` dynamically and falls back to `src/translations/en.json` if the language file is missing
- [ ] T026 [P] [US3] Add contributor-facing documentation to `specs/002-i18n-localization/quickstart.md` section "Translate the card into a new language" to ensure the workflow matches the implemented `createLocalize` behaviour
- [ ] T027 [P] [US3] Add unit tests in `tests/unit/localize-dictionary-loading.test.ts` verifying that adding a new language file requires no changes outside `src/translations/<lang>.json` and that missing keys fall back to English
- [ ] T028 [US3] Manually validate by adding a sample language file `src/translations/de.json` in a development branch and switching the card to `language: de` via YAML, confirming no rendering code changes are required

**Checkpoint**: User Story 3 complete – new languages can be added by translation contributors without touching card logic or rendering files.

---

## Phase 6: User Story 4 – Readable code with localization keys (Priority: P3)

**Goal**: Ensure rendering code remains readable and maintainable by using descriptive localization keys and inline comments that explain what each key represents.

**Independent Test**: Review `src/card/cumulative-comparison-chart.ts` and `src/card/chart-renderer.ts`. Every user-visible string previously hardcoded must now use a `localize(...)` call with a self-describing key and a short inline comment. No raw user-visible strings remain outside `src/translations/*.json`.

### Implementation for User Story 4

- [ ] T029 [P] [US4] Audit `src/card/cumulative-comparison-chart.ts`, `src/card/chart-renderer.ts`, and related card files for any remaining hardcoded UI strings and map each to a descriptive translation key
- [ ] T030 [US4] Replace remaining hardcoded UI strings in `src/card/cumulative-comparison-chart.ts` with `localize()` calls using descriptive keys and add short inline comments describing each string’s purpose
- [ ] T031 [US4] Replace any remaining hardcoded UI strings in `src/card/chart-renderer.ts` (e.g., dataset labels) with parameters passed from `cumulative-comparison-chart.ts` that are already localized
- [ ] T032 [P] [US4] Add a linter-friendly helper or documentation note in `specs/002-i18n-localization/quickstart.md` describing the rule "no user-visible strings outside `src/translations/*.json`" and how to add new keys
- [ ] T033 [P] [US4] Add a unit or static-analysis style test in `tests/unit/localize-static-text-guard.test.ts` (or similar) that checks for obvious hardcoded Polish phrases to prevent regressions

**Checkpoint**: User Story 4 complete – rendering code is free from raw user-visible text, and localization keys plus comments make behaviour clear to maintainers.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and overall i18n quality.

- [ ] T034 [P] Review translation copy in `src/translations/en.json` and `src/translations/pl.json` for clarity, tone, and consistency with Home Assistant UI
- [ ] T035 [P] Add or refine Vitest snapshot tests in `tests/unit/` to cover common dashboard scenarios (different locales, overrides, missing keys)
- [ ] T036 Ensure edge cases from `spec.md` (missing `hass`, partial `hass.locale`, corrupted translation files) are handled gracefully in `src/card/localize.ts` and `src/card/cumulative-comparison-chart.ts`
- [ ] T037 [P] Update README or HACS documentation snippet (if present) to mention localization support and configuration options
- [ ] T038 Run `npm test && npm run lint` at repo root and fix any remaining localization-related issues

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies – can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion – BLOCKS all user stories.
- **User Stories (Phases 3–6)**: All depend on Foundational phase completion.
  - User stories can then proceed in parallel (if staffed).
  - Recommended delivery order by priority: US1 (P1) → US2 (P2) → US3 (P3) → US4 (P3).
- **Polish (Phase 7)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2); no dependencies on other stories.
- **User Story 2 (P2)**: Can start after Foundational (Phase 2); depends on `resolveLocale` and config fields from Phase 2, but is independently testable via YAML overrides.
- **User Story 3 (P3)**: Can start after Foundational (Phase 2); depends on dictionary loading implemented in Phase 2, but is independently testable with a new language file.
- **User Story 4 (P3)**: Can start after Foundational (Phase 2); may touch code from US1 but is primarily a refactor for readability and is independently testable via code review and static checks.

### Within Each User Story

- Prefer to finish story-specific unit tests (where defined) before or alongside implementation tasks.
- Keep localization infrastructure changes (e.g., adding new keys) backwards compatible with existing stories.
- Ensure each story can be validated using its Independent Test description before proceeding to the next.

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational tasks marked [P] can run in parallel within Phase 2 (e.g., type updates vs. translation file creation vs. tests).
- Once Foundational phase completes, user stories US1–US4 can be worked on in parallel by different developers.
- Within a single user story, tasks marked [P] (such as test creation and documentation updates) can proceed in parallel as long as file paths do not conflict.

---

## Parallel Example: User Story 1

```bash
# Parallel tasks for User Story 1 (once Phase 2 is complete):
Task: "T018 [P] [US1] Add unit tests for computeTextSummary in tests/unit/ha-api-text-summary.test.ts"
Task: "T019 [P] [US1] Add rendering-level tests in tests/unit/cumulative-comparison-chart-localization.test.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL – blocks all stories).
3. Complete Phase 3: User Story 1.
4. **STOP and VALIDATE**: Run tests and perform manual checks for HA locales `pl` and `en` to confirm automatic localization works without YAML overrides.
5. Deploy/demo as the MVP Energy Burndown Card with localization.

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready.
2. Add User Story 1 → Test independently → Deploy/Demo (MVP).
3. Add User Story 2 → Test independently (YAML overrides) → Deploy/Demo.
4. Add User Story 3 → Test independently (new language) → Deploy/Demo.
5. Add User Story 4 → Test via code review and static checks → Deploy/Demo.

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together.
2. Once Foundational is done:
   - Developer A: User Story 1 (automatic locale, core wiring).
   - Developer B: User Story 2 (YAML overrides and validation).
   - Developer C: User Story 3 (new language workflow, contributor docs).
   - Developer D: User Story 4 (code readability and static guardrails).
3. Merge and validate each story independently before final polish.


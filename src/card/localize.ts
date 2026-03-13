import type { HomeAssistant } from "../ha-types";
import type { CardConfig } from "./types";

type NumberFormat = "comma" | "decimal" | "language" | "system";

export interface ResolvedLocale {
  language: string;
  numberFormat: NumberFormat;
  timeZone: string;
}

type TranslationDictionary = Record<string, string>;

export const MISSING_TRANSLATION_KEY = "error.missing_translation";

export type LocalizeFunction = (
  key: string,
  vars?: Record<string, string | number>
) => string;

import en from "../translations/en.json";
import pl from "../translations/pl.json";

const FALLBACK_LANGUAGE = "en";

const DICTIONARIES: Record<string, TranslationDictionary> = {
  en,
  pl
};

function interpolateTemplate(
  template: string,
  vars: Record<string, string | number> | undefined
): string {
  if (!vars) {
    return template;
  }

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = vars[key];
    return value === undefined ? match : String(value);
  });
}

export function resolveLocale(
  hass: HomeAssistant,
  config: CardConfig
): ResolvedLocale {
  const language =
    config.language ||
    hass.locale?.language ||
    hass.language ||
    FALLBACK_LANGUAGE;

  const numberFormat: NumberFormat =
    (config.number_format as NumberFormat | undefined) ||
    (hass.locale?.number_format as NumberFormat | undefined) ||
    "system";

  const timeZone =
    hass.config?.time_zone ||
    // fall back to UTC if HA does not provide a time zone
    "UTC";

  return {
    language,
    numberFormat,
    timeZone
  };
}

export function numberFormatToLocale(
  numberFormat: NumberFormat,
  language: string
): string {
  switch (numberFormat) {
    case "comma":
      return "de";
    case "decimal":
      return "en";
    case "language":
      return language;
    case "system":
    default:
      return typeof navigator !== "undefined" && navigator.language
        ? navigator.language
        : language || FALLBACK_LANGUAGE;
  }
}

export function createLocalize(language: string): LocalizeFunction {
  const active =
    DICTIONARIES[language] ?? DICTIONARIES[FALLBACK_LANGUAGE] ?? {};
  const fallback = DICTIONARIES[FALLBACK_LANGUAGE] ?? {};

  return (key, vars) => {
    let template = active[key];

    if (template === undefined) {
      template = fallback[key];
    }

    if (template === undefined) {
      // As a safe fallback, return the key itself so the UI never renders
      // an empty string. The card can detect this and enter an error state.
      return key;
    }

    return interpolateTemplate(template, vars);
  };
}


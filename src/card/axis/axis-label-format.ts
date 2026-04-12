import { DateTime } from "luxon";
import type { HomeAssistant } from "../../ha-types";
import type { CardConfig, WindowAggregation } from "../types";

/**
 * Label locale: card `language` → `hass.locale.language` → `en` (no dictionary gate).
 */
export function resolveLabelLocale(
  hass: HomeAssistant | null | undefined,
  config: Pick<CardConfig, "language">
): string {
  const raw = config.language;
  if (raw !== undefined && String(raw).trim() !== "") {
    return String(raw).trim();
  }
  return (
    hass?.locale?.language ??
    (hass as { language?: string } | undefined)?.language ??
    "en"
  );
}

export function formatForcedTickLabel(
  ms: number,
  zone: string,
  locale: string,
  pattern: string
): string {
  return DateTime.fromMillis(ms, { zone })
    .setLocale(locale)
    .toFormat(pattern);
}

/**
 * Adaptive X-axis labels: `Intl.DateTimeFormat` + boundary context; index `0` is always a boundary.
 */
export function formatAdaptiveTickLabel(
  index: number,
  fullTimeline: number[],
  zone: string,
  locale: string,
  aggregation: WindowAggregation,
  opts?: { tailFromIndex?: number }
): string {
  const ms = fullTimeline[index];
  if (ms == null) return "";

  const cur = DateTime.fromMillis(ms, { zone });
  const tailFrom = opts?.tailFromIndex;
  const isTail = tailFrom != null && index >= tailFrom && tailFrom < fullTimeline.length;
  const prev =
    index > 0
      ? DateTime.fromMillis(fullTimeline[index - 1]!, { zone })
      : undefined;

  const dayChanged =
    !!prev &&
    (cur.day !== prev.day ||
      cur.month !== prev.month ||
      cur.year !== prev.year);
  const yearChanged = !!prev && cur.year !== prev.year;
  const monthChanged =
    !!prev && (cur.month !== prev.month || cur.year !== prev.year);

  const isFirst = index === 0;

  if (isTail) {
    switch (aggregation) {
      case "day":
        return new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric"
        }).format(new Date(ms));
      case "week":
      case "month":
        return new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric"
        }).format(new Date(ms));
      case "hour":
        return new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }).format(new Date(ms));
      default:
        return new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric"
        }).format(new Date(ms));
    }
  }

  switch (aggregation) {
    case "hour": {
      if (isFirst || dayChanged) {
        return new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }).format(new Date(ms));
      }
      return new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date(ms));
    }
    case "day": {
      const opts: Intl.DateTimeFormatOptions =
        isFirst || yearChanged
          ? { year: "numeric", month: "short", day: "numeric" }
          : { month: "short", day: "numeric" };
      return new Intl.DateTimeFormat(locale, opts).format(new Date(ms));
    }
    case "week": {
      const opts: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric"
      };
      if (isFirst || yearChanged) {
        opts.year = "numeric";
      }
      return new Intl.DateTimeFormat(locale, opts).format(new Date(ms));
    }
    case "month": {
      const opts: Intl.DateTimeFormatOptions = {
        month: "short"
      };
      if (isFirst || yearChanged || monthChanged) {
        opts.year = "numeric";
      }
      return new Intl.DateTimeFormat(locale, opts).format(new Date(ms));
    }
    default:
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(ms));
  }
}

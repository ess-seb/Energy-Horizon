import { describe, it, expect } from "vitest";
import {
  formatAdaptiveTickLabel,
  formatForcedTickLabel,
  resolveLabelLocale
} from "../../src/card/axis/axis-label-format";
import type { HomeAssistant } from "../../src/ha-types";
import type { CardConfig } from "../../src/card/types";

describe("resolveLabelLocale", () => {
  it("prefers card language when set", () => {
    const hass = {
      locale: { language: "de" }
    } as unknown as HomeAssistant;
    const config = { language: "pl" } as CardConfig;
    expect(resolveLabelLocale(hass, config)).toBe("pl");
  });

  it("falls back to hass locale then en", () => {
    const hass = {
      locale: { language: "de" }
    } as unknown as HomeAssistant;
    const config = {} as CardConfig;
    expect(resolveLabelLocale(hass, config)).toBe("de");

    expect(resolveLabelLocale(undefined, {} as CardConfig)).toBe("en");
  });
});

describe("formatForcedTickLabel", () => {
  it("formats with Luxon in the given zone", () => {
    const s = formatForcedTickLabel(
      Date.UTC(2024, 5, 15, 14, 30, 0),
      "UTC",
      "en",
      "yyyy-MM-dd HH:mm"
    );
    expect(s).toContain("2024");
    expect(s).toContain("14");
  });
});

describe("formatAdaptiveTickLabel", () => {
  const zone = "UTC";
  const locale = "en";
  const dayMs = 86400000;
  const t0 = Date.UTC(2024, 0, 1, 0, 0, 0, 0);
  const timeline = [t0, t0 + dayMs, t0 + 2 * dayMs];

  it("treats index 0 as a boundary (includes year when needed)", () => {
    const label = formatAdaptiveTickLabel(0, timeline, zone, locale, "day");
    expect(label.length).toBeGreaterThan(0);
    expect(label).toMatch(/2024/);
  });

  it("formats hour aggregation without redundant date when same day", () => {
    const hourMs = 3600000;
    const hTimeline = [t0, t0 + hourMs, t0 + 2 * hourMs];
    const label = formatAdaptiveTickLabel(2, hTimeline, zone, locale, "hour");
    expect(label.length).toBeGreaterThan(0);
  });
});

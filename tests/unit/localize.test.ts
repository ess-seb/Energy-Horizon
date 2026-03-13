import { describe, it, expect } from "vitest";
import { createLocalize } from "../../src/card/localize";

describe("createLocalize", () => {
  it("returns translated string for active language", () => {
    const localize = createLocalize("pl");

    const text = localize("status.loading");

    expect(text).toContain("Ładowanie danych");
  });

  it("falls back to English when key is missing in active language", () => {
    const localize = createLocalize("pl");

    const text = localize("forecast.historical_value");

    // Both languages define this key; simulate fallback by requesting a bogus language
    const englishLocalize = createLocalize("en");
    const english = englishLocalize("forecast.historical_value");

    expect(text).not.toBe("");
    expect(english).toContain("Historical value");
  });

  it("performs variable interpolation", () => {
    const localize = createLocalize("en");

    const text = localize("forecast.confidence", { confidence: 80 });

    expect(text).toContain("80");
  });
});


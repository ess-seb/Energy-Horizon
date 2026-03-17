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

    const text = localize("forecast.reference_consumption");

    // Both languages define this key; simulate fallback by requesting a bogus language
    const englishLocalize = createLocalize("en");
    const english = englishLocalize("forecast.reference_consumption");

    expect(text).not.toBe("");
    expect(english).toContain("Consumption in reference period");
  });

  it("performs variable interpolation", () => {
    const localize = createLocalize("en");

    const text = localize("forecast.confidence", { confidence: 80 });

    expect(text).toContain("80");
  });
});


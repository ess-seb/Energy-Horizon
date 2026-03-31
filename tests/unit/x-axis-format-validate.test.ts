import { describe, it, expect } from "vitest";
import { validateXAxisFormat } from "../../src/card/axis/x-axis-format-validate";

describe("validateXAxisFormat", () => {
  it("accepts common Luxon patterns", () => {
    expect(() => validateXAxisFormat("yyyy-MM-dd HH:mm")).not.toThrow();
    expect(() => validateXAxisFormat("dd/MM/yyyy")).not.toThrow();
    expect(() => validateXAxisFormat("LLL dd, yyyy")).not.toThrow();
  });

  it("accepts quoted literals", () => {
    expect(() => validateXAxisFormat("yyyy 'Year' MM")).not.toThrow();
  });

  it("rejects empty", () => {
    expect(() => validateXAxisFormat("")).toThrow();
    expect(() => validateXAxisFormat("   ")).toThrow();
  });

  it("rejects unknown token runs", () => {
    expect(() => validateXAxisFormat("yyyy-iii")).toThrow();
  });

  it("rejects invalid characters", () => {
    expect(() => validateXAxisFormat("yyyy-MM@dd")).toThrow();
  });
});

import { describe, it, expect } from "vitest";
import {
  assertPointCountWithinCap,
  MAX_POINTS_PER_SERIES,
  PointCapExceededError
} from "../../src/card/axis/point-cap";

describe("assertPointCountWithinCap", () => {
  it("allows at the limit", () => {
    expect(() =>
      assertPointCountWithinCap(MAX_POINTS_PER_SERIES)
    ).not.toThrow();
  });

  it("throws when over the limit", () => {
    expect(() =>
      assertPointCountWithinCap(MAX_POINTS_PER_SERIES + 1)
    ).toThrow(PointCapExceededError);
  });
});

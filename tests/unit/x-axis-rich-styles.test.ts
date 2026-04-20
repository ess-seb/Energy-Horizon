import { describe, expect, it } from "vitest";
import {
  AXIS_TICK_LABEL_GAP_PX,
  GRID_BOTTOM_PX,
  X_AXIS_DESCENDER_BUFFER_PX,
  X_AXIS_RICH_EDGE_METRICS,
  X_AXIS_RICH_TODAY_METRICS
} from "../../src/card/axis/x-axis-rich-styles";

describe("x-axis-rich-styles constants", () => {
  it("AXIS_TICK_LABEL_GAP_PX is a positive number", () => {
    expect(typeof AXIS_TICK_LABEL_GAP_PX).toBe("number");
    expect(AXIS_TICK_LABEL_GAP_PX).toBeGreaterThan(0);
  });

  it("GRID_BOTTOM_PX equals the sum of all constituent metrics", () => {
    const expected =
      AXIS_TICK_LABEL_GAP_PX +
      X_AXIS_RICH_EDGE_METRICS.lineHeight +
      X_AXIS_RICH_TODAY_METRICS.lineHeight +
      X_AXIS_DESCENDER_BUFFER_PX;
    expect(GRID_BOTTOM_PX).toBe(expected);
  });

  it("GRID_BOTTOM_PX is large enough to contain the full two-line label stack", () => {
    const twoLineHeight =
      X_AXIS_RICH_EDGE_METRICS.lineHeight + X_AXIS_RICH_TODAY_METRICS.lineHeight;
    expect(GRID_BOTTOM_PX).toBeGreaterThanOrEqual(twoLineHeight);
  });

  it("GRID_BOTTOM_PX matches the expected value of 38 px for current metrics", () => {
    // Regression: 4 (gap) + 14 (edge) + 18 (today) + 2 (descender) = 38
    expect(GRID_BOTTOM_PX).toBe(38);
  });

  it("typography metrics have expected values (regression guard)", () => {
    expect(X_AXIS_RICH_EDGE_METRICS.fontSize).toBe(11);
    expect(X_AXIS_RICH_EDGE_METRICS.lineHeight).toBe(14);
    expect(X_AXIS_RICH_TODAY_METRICS.fontSize).toBe(14);
    expect(X_AXIS_RICH_TODAY_METRICS.lineHeight).toBe(18);
    expect(X_AXIS_DESCENDER_BUFFER_PX).toBe(2);
  });
});

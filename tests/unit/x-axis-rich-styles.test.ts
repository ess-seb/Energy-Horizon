import { describe, expect, it } from "vitest";
import {
  computeXAxisVerticalReservePx,
  X_AXIS_DESCENDER_BUFFER_PX,
  X_AXIS_RICH_EDGE_METRICS,
  X_AXIS_RICH_TODAY_METRICS
} from "../../src/card/axis/x-axis-rich-styles";

describe("computeXAxisVerticalReservePx", () => {
  const tickGap = 8;
  const edgeH = X_AXIS_RICH_EDGE_METRICS.lineHeight;
  const todayH = X_AXIS_RICH_TODAY_METRICS.lineHeight;
  const buf = X_AXIS_DESCENDER_BUFFER_PX;

  const base = {
    tickLabelGapPx: tickGap,
    edgeLineHeight: edgeH,
    todayLineHeight: todayH,
    descenderBufferPx: buf,
    adaptiveRich: true,
    todayInRange: true
  };

  it("returns zeros when adaptive rich is off", () => {
    expect(
      computeXAxisVerticalReservePx({
        ...base,
        adaptiveRich: false
      })
    ).toEqual({ gridBottomPx: 0, minHeightExtraPx: 0 });
  });

  it("returns zeros when today is not in range", () => {
    expect(
      computeXAxisVerticalReservePx({
        ...base,
        todayInRange: false
      })
    ).toEqual({ gridBottomPx: 0, minHeightExtraPx: 0 });
  });

  it("today in range: always full two-line stack (gap + edge + today + buffer)", () => {
    const r = computeXAxisVerticalReservePx(base);
    const labelBlock = edgeH + todayH + buf;
    expect(r.gridBottomPx).toBe(tickGap + labelBlock);
    expect(r.minHeightExtraPx).toBe(labelBlock);
    expect(r.minHeightExtraPx).toBe(r.gridBottomPx - tickGap);
  });

  it("scales when today lineHeight increases (future style change)", () => {
    const tallerToday = 22;
    const r = computeXAxisVerticalReservePx({
      ...base,
      todayLineHeight: tallerToday
    });
    expect(r.gridBottomPx).toBe(tickGap + edgeH + tallerToday + buf);
  });
});

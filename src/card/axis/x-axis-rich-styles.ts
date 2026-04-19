/**
 * Single source of truth for adaptive X-axis ECharts `axisLabel.rich` typography (Figma: edge vs “today”).
 * Colors come from `ChartThemeResolved` at render time; only size/weight/line metrics live here so
 * `grid.bottom` / container `min-height` can track style changes in one place.
 */

/** Small buffer below the label block for descenders and font metrics variance (ECharts canvas text). */
export const X_AXIS_DESCENDER_BUFFER_PX = 2;

/** Secondary edge ticks — matches former inline `rich.edge`. */
export const X_AXIS_RICH_EDGE_METRICS = {
  fontSize: 11,
  fontWeight: 'normal' as const,
  lineHeight: 14
};

/** Emphasized “today” tick — matches former inline `rich.today`. */
export const X_AXIS_RICH_TODAY_METRICS = {
  fontSize: 14,
  fontWeight: 'bold' as const,
  lineHeight: 18
};

export interface XAxisVerticalReserveParams {
  tickLabelGapPx: number;
  edgeLineHeight: number;
  todayLineHeight: number;
  descenderBufferPx: number;
  adaptiveRich: boolean;
  todayInRange: boolean;
  /** True when “today” shares index with first or last bucket (two-line stacked tick). */
  edgeCollision: boolean;
}

export interface XAxisVerticalReservePx {
  /** Passed to ECharts `grid.bottom` (includes gap above labels). */
  gridBottomPx: number;
  /** Added to chart container `min-height` beyond `CHART_MIN_HEIGHT_BASE_PX` (label block only, excludes tick gap). */
  minHeightExtraPx: number;
}

/**
 * Vertical space for adaptive X-axis labels so rich “today” style is never clipped vs edge ticks,
 * including middle-axis “today” and stacked edge+Now. Values scale when `lineHeight` changes above.
 */
export function computeXAxisVerticalReservePx(
  params: XAxisVerticalReserveParams
): XAxisVerticalReservePx {
  const {
    tickLabelGapPx,
    edgeLineHeight,
    todayLineHeight,
    descenderBufferPx,
    adaptiveRich,
    todayInRange,
    edgeCollision
  } = params;

  if (!adaptiveRich || !todayInRange) {
    return { gridBottomPx: 0, minHeightExtraPx: 0 };
  }

  const labelBlockPx = edgeCollision
    ? edgeLineHeight + todayLineHeight + descenderBufferPx
    : Math.max(0, todayLineHeight - edgeLineHeight) + descenderBufferPx;

  const gridBottomPx = tickLabelGapPx + labelBlockPx;
  const minHeightExtraPx = Math.max(0, gridBottomPx - tickLabelGapPx);

  return { gridBottomPx, minHeightExtraPx };
}

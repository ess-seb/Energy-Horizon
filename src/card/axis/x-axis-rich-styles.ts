/**
 * Single source of truth for adaptive X-axis ECharts `axisLabel.rich` typography (Figma: edge vs "today").
 * Colors come from `ChartThemeResolved` at render time; only size/weight/line metrics live here so
 * `grid.bottom` / container `min-height` can track style changes in one place.
 *
 * All grid layout constants are exported so changing a single value here updates both the visual
 * style and the spatial budget in `echarts-renderer.ts` without hunting through code.
 */

/** Gap between the axis tick mark and the top of the label text block (px). Main lever for bottom margin. */
export const AXIS_TICK_LABEL_GAP_PX = 4;

/** Small buffer below the label block for descenders and font metrics variance (ECharts canvas text). */
export const X_AXIS_DESCENDER_BUFFER_PX = 2;

/** Secondary edge ticks — matches former inline `rich.edge`. */
export const X_AXIS_RICH_EDGE_METRICS = {
  fontSize: 11,
  fontWeight: 'normal' as const,
  lineHeight: 14
};

/** Emphasized "today" tick — matches former inline `rich.today`. */
export const X_AXIS_RICH_TODAY_METRICS = {
  fontSize: 14,
  fontWeight: 'bold' as const,
  lineHeight: 18
};

/**
 * Total vertical space reserved at the bottom of the ECharts grid for X-axis labels.
 * Used as `grid.bottom` with `containLabel: false` — the axis line sits exactly this many
 * pixels from the chart canvas bottom, and labels hang within that space.
 *
 * Always the two-line (edge + today) budget so chart height is consistent regardless of
 * whether "today" is currently in range.
 *
 * Formula: AXIS_TICK_LABEL_GAP_PX + edge lineHeight + today lineHeight + descender buffer
 * = 4 + 14 + 18 + 2 = 38 px
 */
export const GRID_BOTTOM_PX =
  AXIS_TICK_LABEL_GAP_PX +
  X_AXIS_RICH_EDGE_METRICS.lineHeight +
  X_AXIS_RICH_TODAY_METRICS.lineHeight +
  X_AXIS_DESCENDER_BUFFER_PX;

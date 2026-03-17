import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import "chartjs-adapter-date-fns";
import type { ComparisonSeries, ChartRendererConfig } from "./types";

/** Labels must be pre-localized by the card; this module does not use translation files. */

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Filler
);

// Internal type used in Phase 3 for chart data points
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ChartPoint = { x: number; y: number | null };

export class ChartRenderer {
  private chart?: Chart;
  private lastHash?: string;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
  private readonly canvas: HTMLCanvasElement;

  private getThemeColors(): {
    currentLine: string;
    referenceLine: string;
    grid: string;
  } {
    const host =
      (this.canvas.closest(".ehc-card") as HTMLElement | null) ??
      (this.canvas.closest("ha-card") as HTMLElement | null) ??
      this.canvas;
    const styles = getComputedStyle(host);

    const primaryColor =
      styles.getPropertyValue("--accent-color").trim() ||
      styles.getPropertyValue("--primary-color").trim() ||
      "#03a9f4";
    const referenceColor =
      styles.getPropertyValue("--secondary-text-color").trim() || "#727272";
    const gridColor =
      styles.getPropertyValue("--divider-color").trim() ||
      "rgba(127, 127, 127, 0.3)";

    return {
      currentLine: primaryColor,
      referenceLine: referenceColor,
      grid: gridColor
    };
  }

  destroy(): void {
    this.chart?.destroy();
    this.chart = undefined;
  }

  /** @param labels - Pre-localized legend labels from the card (e.g. period.current / period.reference). */
  update(
    series: ComparisonSeries,
    fullTimeline: number[],
    rendererConfig: ChartRendererConfig,
    labels: { current: string; reference: string }
  ): void {
    // TODO: implement in Phase 3
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const currentData = series.current.points.map((p, index) => ({
      x: index + 1,
      y: p.value
    }));

    const referenceData = series.reference
      ? series.reference.points.map((p, index) => ({
          x: index + 1,
          y: p.value
        }))
      : [];

    const hash = JSON.stringify({
      c: currentData,
      r: referenceData,
      cfg: rendererConfig
    });

    if (this.lastHash === hash && this.chart) {
      return;
    }
    this.lastHash = hash;

    const theme = this.getThemeColors();

    const data = {
      datasets: [
        {
          label: labels.current,
          data: currentData,
          borderColor: theme.currentLine,
          backgroundColor: "transparent",
          fill: false,
          pointRadius: 0,
          tension: 0.3
        },
        ...(series.reference
          ? [
              {
                label: labels.reference,
                data: referenceData,
                borderColor: theme.referenceLine,
                backgroundColor: "transparent",
                pointRadius: 0,
                borderDash: [4, 2],
                tension: 0.3
              }
            ]
          : [])
      ]
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          mode: "index" as const,
          intersect: false
        }
      },
      scales: {
        x: {
          type: "linear" as const,
          ticks: {
            precision: 0
          },
          grid: {
            color: theme.grid
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: theme.grid
          }
        }
      }
    };

    if (this.chart) {
      this.chart.data = data as never;
      this.chart.options = options as never;
      this.chart.update();
    } else {
      this.chart = new Chart(ctx, {
        type: "line",
        data: data as never,
        options: options as never
      });
    }
  }
}


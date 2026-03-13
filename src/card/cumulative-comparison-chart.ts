import { LitElement, html } from "lit";
import type { HomeAssistant, LovelaceCard } from "../ha-types";
import type { CardConfig, CardState, ComparisonSeries } from "./types";
import {
  buildComparisonPeriod,
  buildLtsQuery,
  mapLtsResponseToCumulativeSeries,
  computeSummary,
  computeForecast,
  computeTextSummary
} from "./ha-api";
import { ChartRenderer } from "./chart-renderer";
import {
  resolveLocale,
  createLocalize,
  numberFormatToLocale
} from "./localize";
import { energyBurndownCardStyles } from "./energy-burndown-card-styles";

export class EnergyBurndownCard extends LitElement implements LovelaceCard {
  static properties = {
    hass: { type: Object, attribute: false },
    _config: { state: true },
    _state: { state: true }
  };

  declare hass: HomeAssistant;
  declare _config: CardConfig;
  _state: CardState = { status: "loading" };

  private _chartRenderer?: ChartRenderer;

  static styles = energyBurndownCardStyles;

  public setConfig(config: CardConfig): void {
    this._config = config;
    this._state = { status: "loading" };
  }

  public getCardSize(): number {
    return 4;
  }

  protected updated(changedProps: Map<string, unknown>): void {
    if (
      changedProps.has("hass") ||
      changedProps.has("_config") ||
      changedProps.has("_state")
    ) {
      if (this._state.status === "loading") {
        void this._loadData();
      }

      if (
        this._state.status === "ready" &&
        this._state.comparisonSeries
      ) {
        if (!this._chartRenderer) {
          const canvas = this.renderRoot.querySelector("canvas") as
            | HTMLCanvasElement
            | null;
          if (canvas) {
            this._chartRenderer = new ChartRenderer(canvas);
          }
        }

        if (this._chartRenderer) {
          const resolved = resolveLocale(this.hass, this._config);
          const localize = createLocalize(resolved.language);
          this._chartRenderer.update(this._state.comparisonSeries, {
            current: localize("period.current"),
            reference: localize("period.reference")
          });
        }
      }
    }
  }

  private async _loadData(): Promise<void> {
    if (!this._config || !this.hass) return;

    const now = new Date();
    const resolved = resolveLocale(this.hass, this._config);
    const period = buildComparisonPeriod(this._config, now, resolved.timeZone);
    const currentQuery = buildLtsQuery(period, this._config.entity);
    const referencePeriod: typeof period = {
      ...period,
      current_start: period.reference_start,
      current_end: period.reference_end
    };
    const referenceQuery = buildLtsQuery(referencePeriod, this._config.entity);

    try {
      if (this._config.debug) {
        // eslint-disable-next-line no-console
        console.log("[Energy Burndown] API Query (current):", currentQuery);
        console.log("[Energy Burndown] API Query (reference):", referenceQuery);
      }

      const [currentResponse, referenceResponse] = await Promise.all([
        this.hass.connection.sendMessagePromise(
          currentQuery as unknown as Record<string, unknown>
        ),
        this.hass.connection.sendMessagePromise(
          referenceQuery as unknown as Record<string, unknown>
        )
      ]);

      if (this._config.debug) {
        const data =
          (currentResponse as { result?: Record<string, unknown> })?.result ??
          currentResponse;
        const results =
          (data as { results?: Record<string, unknown> }).results ??
          (data as Record<string, unknown>);
        // eslint-disable-next-line no-console
        console.log("[Energy Burndown] API Response (current, raw):", currentResponse);
        if (results && typeof results === "object") {
          const keys = Object.keys(results);
          // eslint-disable-next-line no-console
          console.log(
            "[Energy Burndown] Results keys (available statistic_ids):",
            keys
          );
          const entityData = results[this._config.entity];
          // eslint-disable-next-line no-console
          console.log(
            `[Energy Burndown] Data for entity "${this._config.entity}":`,
            entityData
              ? `${Array.isArray(entityData) ? entityData.length : 0} points`
              : "not found"
          );
          // eslint-disable-next-line no-console
          console.log(
            "[Energy Burndown] Reference API Response (raw):",
            referenceResponse
          );
        } else {
          // eslint-disable-next-line no-console
          console.log(
            "[Energy Burndown] No results in response or invalid structure"
          );
        }
      }

      const current = mapLtsResponseToCumulativeSeries(
        currentResponse as any,
        this._config.entity,
        "Bieżący okres"
      );

      if (!current) {
        if (this._config.debug) {
          // eslint-disable-next-line no-console
          console.log(
            "[Energy Burndown] current series could not be built – check entity ID and results structure above"
          );
        }
        this._state = { status: "no-data" };
        return;
      }

      const reference = mapLtsResponseToCumulativeSeries(
        referenceResponse as any,
        this._config.entity,
        "Okres referencyjny"
      );

      const entityUnit =
        (this.hass.states?.[this._config.entity]?.attributes as {
          unit_of_measurement?: string;
        })?.unit_of_measurement ?? "";

      const series: ComparisonSeries = {
        current: entityUnit ? { ...current, unit: current.unit || entityUnit } : current,
        reference: reference
          ? entityUnit
            ? { ...reference, unit: reference.unit || entityUnit }
            : reference
          : undefined,
        aggregation: period.aggregation,
        time_zone: period.time_zone
      };

      const summary = computeSummary(series);
      const forecast = computeForecast(series);

      if (!summary.unit && entityUnit) {
        summary.unit = entityUnit;
      }
      if (forecast && !forecast.unit && entityUnit) {
        forecast.unit = entityUnit;
      }

      const textSummary = computeTextSummary(summary);

      this._state = {
        status: "ready",
        comparisonSeries: series,
        summary,
        forecast,
        textSummary
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      this._state = {
        status: "error",
        errorMessage: "status.error_api"
      };
    }
  }

  protected render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const resolved = resolveLocale(this.hass, this._config);
    const localize = createLocalize(resolved.language);

    if (this._state.status === "loading") {
      return html`<ha-card class="ebc-card">
        <div class="loading">
          <ha-circular-progress active size="small"></ha-circular-progress>
          <span>${localize("status.loading")}</span>
        </div>
      </ha-card>`;
    }

    if (this._state.status === "error") {
      const messageKey =
        this._state.errorMessage ?? "status.error_generic";
      return html`<ha-card class="ebc-card">
        <ha-alert alert-type="error">
          ${localize(messageKey)}
        </ha-alert>
      </ha-card>`;
    }

    if (this._state.status === "no-data") {
      return html`<ha-card class="ebc-card">
        <ha-alert alert-type="info">
          ${localize("status.no_data")}
        </ha-alert>
      </ha-card>`;
    }

    const textSummary = this._state.textSummary;
    const summary = this._state.summary;
    const forecast = this._state.forecast;

    const numberLocale = numberFormatToLocale(
      resolved.numberFormat,
      resolved.language
    );
    const precision = this._config.precision ?? 1;

    // Jeśli z API nie przyszła jednostka, spróbuj użyć tej z encji HA.
    const fallbackUnit =
      (this.hass.states?.[this._config.entity]?.attributes as {
        unit_of_measurement?: string;
      })?.unit_of_measurement ?? "";

    const numberFormatter = new Intl.NumberFormat(numberLocale, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });

    const percentFormatter = new Intl.NumberFormat(numberLocale, {
      maximumFractionDigits: 1
    });

    const displayUnit = summary?.unit || fallbackUnit;

    const currentSummaryValue =
      summary != null
        ? `${numberFormatter.format(summary.current_cumulative)} ${
            displayUnit
          }`
        : "";

    const referenceSummaryValue =
      summary != null && summary.reference_cumulative != null
        ? `${numberFormatter.format(summary.reference_cumulative)} ${
            displayUnit
          }`
        : null;

    const differenceValue =
      summary != null && summary.difference != null
        ? `${numberFormatter.format(Math.abs(summary.difference))} ${
            displayUnit
          }`
        : null;

    const differencePercentValue =
      summary != null && summary.differencePercent != null
        ? `${percentFormatter.format(summary.differencePercent)} %`
        : null;

    const shouldShowForecast =
      forecast != null && forecast.enabled && this._config.show_forecast !== false;

    const forecastUnit = forecast?.unit || displayUnit;

    let heading: string | null = null;
    if (textSummary) {
      const diffText =
        textSummary.diffValue != null
          ? `${numberFormatter.format(textSummary.diffValue)} ${displayUnit}`
          : undefined;

      switch (textSummary.trend) {
        case "higher":
          heading = localize("text_summary.higher", diffText ? { diff: diffText } : undefined);
          break;
        case "lower":
          heading = localize("text_summary.lower", diffText ? { diff: diffText } : undefined);
          break;
        case "similar":
          heading = localize("text_summary.similar");
          break;
        case "unknown":
        default:
          heading = localize("text_summary.no_reference");
          break;
      }
    }

    return html`<ha-card class="ebc-card">
      <div class="content ebc-content">
        ${heading ? html`<div class="heading ebc-header">${heading}</div>` : null}

        ${summary
          ? html`<div class="summary ebc-stats">
              <div class="summary-row">
                <span class="label">${localize("summary.current_period")}</span>
                <span class="value">${currentSummaryValue}</span>
              </div>

              ${referenceSummaryValue
                ? html`<div class="summary-row">
                    <span class="label">${localize("summary.reference_period")}</span>
                    <span class="value">${referenceSummaryValue}</span>
                  </div>`
                : null}

              ${differenceValue
                ? html`<div class="summary-row">
                    <span class="label">${localize("summary.difference")}</span>
                    <span class="value">${differenceValue}</span>
                  </div>`
                : null}

              ${differencePercentValue
                ? html`<div class="summary-row">
                    <span class="label">${localize("summary.difference_percent")}</span>
                    <span class="value">${differencePercentValue}</span>
                  </div>`
                : null}

              ${summary.reference_cumulative == null
                ? html`<div class="summary-note">
                    ${localize("summary.incomplete_reference")}
                  </div>`
                : null}
            </div>`
          : null}

        ${shouldShowForecast && forecast
          ? html`<div class="forecast ebc-forecast">
              <div class="summary-row">
                <span class="label">${localize("forecast.current_forecast")}</span>
                <span class="value"
                  >${numberFormatter.format(
                    forecast.forecast_total ?? 0
                  )} ${forecastUnit}</span
                >
              </div>
              ${forecast.reference_total != null
                ? html`<div class="summary-row">
                    <span class="label">${localize("forecast.reference_consumption")}</span>
                    <span class="value"
                      >${numberFormatter.format(
                        forecast.reference_total
                      )} ${forecastUnit}</span
                    >
                  </div>`
                : null}
              ${forecast.reference_total != null
                ? html`<div class="summary-row">
                    <span class="label">${localize("forecast.historical_value")}</span>
                    <span class="value"
                      >${numberFormatter.format(
                        forecast.reference_total
                      )} ${forecast.unit}</span
                    >
                  </div>`
                : null}
              <div class="summary-note">
                ${localize("forecast.confidence", {
                  confidence: forecast.confidence
                })}
              </div>
            </div>`
          : null}

        <div class="chart-container ebc-chart">
          <canvas></canvas>
        </div>
      </div>
    </ha-card>`;
  }
}

customElements.define("energy-burndown-card", EnergyBurndownCard);

declare global {
  interface HTMLElementTagNameMap {
    "energy-burndown-card": EnergyBurndownCard;
  }
}


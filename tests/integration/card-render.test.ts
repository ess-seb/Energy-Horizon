import { describe, it, expect } from "vitest";
import "../helpers/setup-dom";
import "../../src/index";
import type { HomeAssistant } from "../../src/ha-types";

describe("energy-burndown-card integration", () => {
  it("can be instantiated without crashing", () => {
    const el = document.createElement("energy-burndown-card");
    document.body.appendChild(el);

    expect(el.shadowRoot).toBeDefined();
  });

  it("renders loading state when state is loading", () => {
    const el = document.createElement("energy-burndown-card") as any;
    document.body.appendChild(el);

    el.setConfig({ type: "custom:energy-burndown-card", entity: "sensor.energy", comparison_mode: "year_over_year" });
    el.hass = {
      language: "pl",
      connection: {
        // nigdy nie jest wywołane, bo ręcznie podmieniamy stan
        sendMessagePromise: async () => ({} as unknown)
      }
    } as HomeAssistant;

    // wymuszenie stanu loading
    (el as any)._state = { status: "loading" };

    const card = el.shadowRoot!.querySelector("ha-card");
    expect(card).not.toBeNull();
    expect(card!.textContent).toContain("Ładowanie danych statystyk długoterminowych");
  });

  it("renders error state with message", () => {
    const el = document.createElement("energy-burndown-card") as any;
    document.body.appendChild(el);

    el.setConfig({ type: "custom:energy-burndown-card", entity: "sensor.energy", comparison_mode: "year_over_year" });
    el.hass = {
      language: "pl",
      connection: {
        sendMessagePromise: async () => ({} as unknown)
      }
    } as HomeAssistant;

    (el as any)._state = {
      status: "error",
      errorMessage: "Testowy błąd"
    };

    const alert = el.shadowRoot!.querySelector("ha-alert");
    expect(alert).not.toBeNull();
    expect(alert!.textContent).toContain("Testowy błąd");
  });

  it("renders no-data state with info alert", () => {
    const el = document.createElement("energy-burndown-card") as any;
    document.body.appendChild(el);

    el.setConfig({ type: "custom:energy-burndown-card", entity: "sensor.energy", comparison_mode: "year_over_year" });
    el.hass = {
      language: "pl",
      connection: {
        sendMessagePromise: async () => ({} as unknown)
      }
    } as HomeAssistant;

    (el as any)._state = {
      status: "no-data"
    };

    const alert = el.shadowRoot!.querySelector("ha-alert");
    expect(alert).not.toBeNull();
    expect(alert!.textContent).toContain("Brak danych do wyświetlenia");
  });
});


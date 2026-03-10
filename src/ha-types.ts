export interface HomeAssistant {
  language: string;
  locale?: {
    language: string;
  };
  connection: {
    sendMessagePromise<T = unknown>(msg: Record<string, unknown>): Promise<T>;
  };
}

export interface LovelaceCard extends HTMLElement {
  hass: HomeAssistant;
  setConfig(config: unknown): void;
  getCardSize?(): number;
}


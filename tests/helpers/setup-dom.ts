import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>");

// @ts-expect-error attaching globals for tests
global.window = dom.window as any;
// @ts-expect-error attaching globals for tests
global.document = dom.window.document as any;


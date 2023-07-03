import { setConfig } from "next/config";
import config from "./next.config";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import mixpanel from "mixpanel-browser";
setConfig(config);

beforeEach(() => {
  vi.spyOn(mixpanel, "init");
  vi.spyOn(mixpanel, "track");
});
afterEach(() => {
  cleanup();
});

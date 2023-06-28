import { setConfig } from "next/config";
import config from "./next.config";
import { beforeEach, afterEach, vi } from "vitest";
import mixpanel from "mixpanel-browser";
setConfig(config);

// TODO: cleanup for running both at same time ?
beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(window.localStorage, "setItem");
  vi.spyOn(window.localStorage, "getItem");
  vi.spyOn(mixpanel, "init");
  vi.spyOn(mixpanel, "track");
});

afterEach(() => {
  //   vi.restoreAllMocks()
});

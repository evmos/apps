import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import mixpanel from "mixpanel-browser";
import { enableMixpanel } from "tracker";

export const MIXPANEL_TOKEN_FOR_TEST = "testToken";
const initializeMixpanelAndEnable = () => {
  mixpanel.init(MIXPANEL_TOKEN_FOR_TEST, { ip: false });
  enableMixpanel();
};
beforeEach(() => {
  vi.spyOn(mixpanel, "init");
  vi.spyOn(mixpanel, "track");
  initializeMixpanelAndEnable();
});
afterEach(() => {
  cleanup();
});

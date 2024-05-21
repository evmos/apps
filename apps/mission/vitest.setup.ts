// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { setConfig } from "next/config";
import config from "./next.config.mjs";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import mixpanel from "mixpanel-browser";
import { enableMixpanel } from "tracker";

setConfig(config);

export const MIXPANEL_TOKEN_FOR_TEST = "testToken";
const initializeMixpanelAndEnable = () => {
  mixpanel.init(MIXPANEL_TOKEN_FOR_TEST, { ip: false, track_pageview: true });
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

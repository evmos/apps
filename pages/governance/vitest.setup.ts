// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { enableMixpanel, localMixpanel as mixpanel } from "tracker";
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

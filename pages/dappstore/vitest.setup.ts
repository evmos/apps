import { setConfig } from "next/config";
import config from "./next.config.mjs";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import mixpanel from "mixpanel-browser";
import { enableMixpanel } from "tracker";
import { useTranslation } from "@evmosapps/i18n/client";

setConfig(config);

const TOKEN = "testToken";
const initializeMixpanelAndEnable = () => {
  mixpanel.init(TOKEN, { ip: false });
  enableMixpanel();
};
beforeEach(() => {
  useTranslation.mockReturnValue({ t: (key) => key });

  vi.spyOn(mixpanel, "init");
  vi.spyOn(mixpanel, "track");
  initializeMixpanelAndEnable();
});
afterEach(() => {
  cleanup();
});
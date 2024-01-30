// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { setConfig } from "next/config";
import config from "./next.config.mjs";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import { enableMixpanel, localMixpanel as mixpanel } from "tracker";

setConfig(config);

export const MIXPANEL_TOKEN_FOR_TEST = "testToken";

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: React.PropsWithChildren<{}>) =>
    props.children,
}));

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      useWallet: () => {
        return {
          connector: vi.fn(),
          address: "",
          isHydrating: false,
          isConnecting: false,
          isReconnecting: false,
        };
      },
    };
  },
);

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

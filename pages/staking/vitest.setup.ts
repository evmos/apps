// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { enableMixpanel, localMixpanel as mixpanel } from "tracker";
export const MIXPANEL_TOKEN_FOR_TEST = "testToken";

export const ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
        // eslint-disable-next-line no-secrets/no-secrets
        address: "evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65",
        connector: {
          id: "metaMask",
        },
      };
    },
  };
});

vi.mock("wagmi/actions", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    getNetwork: () => {
      return {
        chain: {
          id: 9001,
        },
      };
    },
  };
});

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: React.PropsWithChildren<{}>) =>
    props.children,
}));

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

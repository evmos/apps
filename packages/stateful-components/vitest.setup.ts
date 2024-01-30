// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { enableMixpanel, localMixpanel as mixpanel } from "tracker";

export const MIXPANEL_TOKEN_FOR_TEST = "testToken";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: React.PropsWithChildren<{}>) =>
    props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});

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
        address: "0x1234567890123456789012345678901234567890",
        connector: {
          id: "metaMask",
        },
      };
    },
    useConnect: () => {
      return {
        connect: vi.fn(),
        connectors: [{ name: "metaMask", id: "metaMask" }],
      };
    },
  };
});

vi.mock("helpers", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useModal: () => ({
      isOpen: true,
      setIsOpen: vi.fn(),
    }),
  };
});

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      getActiveProviderKey: () => "Keplr",
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

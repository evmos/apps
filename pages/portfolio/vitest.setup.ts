// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { enableMixpanel, localMixpanel as mixpanel } from "tracker";
import { BigNumber } from "@ethersproject/bignumber";
export const MIXPANEL_TOKEN_FOR_TEST = "testToken";
export const TEST_ADDRESS = "0xaf3219826cb708463b3aa3b73c6640a21497ae49";

export const TEST_TOP_BAR_PROPS = {
  totalAssets: "1",
  evmosPrice: 1,
  setIsOpen: vi.fn(),
  setModalContent: vi.fn(),
  tableData: {
    table: [],
    feeBalance: BigNumber.from(1),
  },
};
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

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      getActiveProviderKey: () => null,
      useFee: () => {
        return {
          fee: {
            gasLimit: 1n,
            token: "evmos:EVMOS",
          },
          isPending: false,
        };
      },
      useTokenBalance: () => {
        return {
          balance: 1n,
          isFetching: false,
        };
      },
    };
  },
);

vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
        address: TEST_ADDRESS,
      };
    },
  };
});

vi.mock("wagmi/actions", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    getAccount: () => {
      return {
        connector: {
          id: "metaMask",
        },
      };
    },
  };
});

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

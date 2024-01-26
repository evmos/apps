// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BigNumber } from "@ethersproject/bignumber";
import {
  CLICK_ON_RECEIVE_BUTTON,
  CLICK_ON_SEND_BUTTON,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import TopBar from "./TopBar";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

const TOP_BAR_PROPS = {
  totalAssets: "1",
  evmosPrice: 1,
  setIsOpen: vi.fn(),
  setModalContent: vi.fn(),
  tableData: {
    table: [],
    feeBalance: BigNumber.from(1),
  },
};

const ADDRESS = "0xaf3219826cb708463b3aa3b73c6640a21497ae49";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
        address: ADDRESS,
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

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    cache: (fn: unknown) => fn,
  };
});

describe("Testing Top bar Portfolio", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for start send", async () => {
    render(<TopBar topProps={TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-send-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_SEND_BUTTON, {
      "User Wallet Address": ADDRESS,
      "Wallet Provider": "metaMask",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for start send", async () => {
    disableMixpanel();
    render(<TopBar topProps={TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-send-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for start request", async () => {
    render(<TopBar topProps={TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-request-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_RECEIVE_BUTTON, {
      "User Wallet Address": ADDRESS,
      "Wallet Provider": "metaMask",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for start request", async () => {
    disableMixpanel();
    render(<TopBar topProps={TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-request-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

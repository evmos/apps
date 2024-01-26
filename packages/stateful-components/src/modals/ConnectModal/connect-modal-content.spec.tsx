// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_CONNECTED_WITH,
  CLICK_EVMOS_COPILOT_START_FLOW,
  UNSUCCESSFUL_WALLET_CONNECTION,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { RootProviders } from "../../root-providers";
import { PropsWithChildren } from "react";
import { ConnectModalContent } from "./ConnectModalContent";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),

    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});
describe("Testing Connect Modal Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for connect specific wallet + failed connection", async () => {
    render(<ConnectModalContent setIsOpen={() => true} />, { wrapper });
    const button = screen.getByTestId(/connect-with-metaMask/);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_CONNECTED_WITH, {
      token: MIXPANEL_TOKEN_FOR_TEST,
      "Wallet Provider": "metamask",
    });
    expect(mixpanel.track).toHaveBeenCalledWith(
      UNSUCCESSFUL_WALLET_CONNECTION,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
        "Error Message": "Failed to connect with MetaMask",
        "Wallet Provider": "metamask",
      },
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(2);
  });

  test("should not call mixpanel event for connect specific wallet + failed connection", async () => {
    disableMixpanel();
    render(<ConnectModalContent setIsOpen={() => true} />, { wrapper });
    const button = screen.getByTestId(/connect-with-metaMask/);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for connect with copilot", async () => {
    render(<ConnectModalContent setIsOpen={() => true} />, { wrapper });
    const button = screen.getByTestId(/connect-with-evmos-copilot/);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_EVMOS_COPILOT_START_FLOW,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event for connect with copilot", async () => {
    disableMixpanel();
    render(<ConnectModalContent setIsOpen={() => true} />, { wrapper });
    const button = screen.getByTestId(/connect-with-evmos-copilot/);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

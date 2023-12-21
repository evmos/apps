// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import {
  CLICK_CONNECTED_WITH,
  UNSUCCESSFUL_WALLET_CONNECTION,
  disableMixpanel,
} from "tracker";
import { RootProviders } from "../../root-providers";
import { PropsWithChildren } from "react";
import { ConnectModalContent } from "./ConnectModalContent";

// same as vitest.setup.ts
const TOKEN = "testToken";

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
    const { getByTestId } = render(
      <ConnectModalContent setIsOpen={() => true} />,
      { wrapper }
    );
    const button = getByTestId(/connect-with-metaMask/);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_CONNECTED_WITH, {
      token: TOKEN,
      "Wallet Provider": "metamask",
    });
    expect(mixpanel.track).toHaveBeenCalledWith(
      UNSUCCESSFUL_WALLET_CONNECTION,
      {
        token: TOKEN,
        "Error Message": "Failed to connect with MetaMask",
        "Wallet Provider": "metamask",
      }
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(2);
  });

  test("should not call mixpanel event for connect specific wallet + failed connection", async () => {
    disableMixpanel();
    const { getByTestId } = render(
      <ConnectModalContent setIsOpen={() => true} />,
      { wrapper }
    );
    const button = getByTestId(/connect-with-metaMask/);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

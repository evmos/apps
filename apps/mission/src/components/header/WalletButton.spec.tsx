// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootProviders } from "stateful-components/src/root-providers";
import {
  CLICK_CONNECT_WALLET_BUTTON,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";
import { WalletButton } from "./WalletButton";

describe("Testing Branding", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for Connect Wallet", async () => {
    render(<WalletButton />, { wrapper });

    const button = screen.getByTestId(/open-connect-modal/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_CONNECT_WALLET_BUTTON, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Connect Wallet", async () => {
    disableMixpanel();
    render(<WalletButton />, { wrapper });
    const button = screen.getByTestId(/open-connect-modal/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

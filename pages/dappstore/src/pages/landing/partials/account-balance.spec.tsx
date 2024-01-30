// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_TOP_UP_ACCOUNT_DAPP,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { AccountBalance } from "./account-balance";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Setup success step", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for click on top up", async () => {
    render(<AccountBalance />, { wrapper });
    const button = await screen.findByRole("button", {
      name: /Top Up Account/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_TOP_UP_ACCOUNT_DAPP, {
      Location: "Home Page",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for click on top up", async () => {
    disableMixpanel();
    render(<AccountBalance />, { wrapper });
    const button = await screen.findByRole("button", {
      name: /Top Up Account/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

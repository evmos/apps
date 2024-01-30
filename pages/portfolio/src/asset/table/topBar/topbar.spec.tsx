// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_ON_RECEIVE_BUTTON,
  CLICK_ON_SEND_BUTTON,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import TopBar from "./TopBar";
import {
  TEST_ADDRESS,
  MIXPANEL_TOKEN_FOR_TEST,
  TEST_TOP_BAR_PROPS,
} from "../../../../vitest.setup";

describe("Testing Top bar Portfolio", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for start send", async () => {
    render(<TopBar topProps={TEST_TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-send-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_SEND_BUTTON, {
      "User Wallet Address": TEST_ADDRESS,
      "Wallet Provider": "metaMask",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for start send", async () => {
    disableMixpanel();
    render(<TopBar topProps={TEST_TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-send-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for start request", async () => {
    render(<TopBar topProps={TEST_TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-request-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_RECEIVE_BUTTON, {
      "User Wallet Address": TEST_ADDRESS,
      "Wallet Provider": "metaMask",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for start request", async () => {
    disableMixpanel();
    render(<TopBar topProps={TEST_TOP_BAR_PROPS} />, {
      wrapper,
    });
    const button = await screen.findByTestId(/open-request-modal-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

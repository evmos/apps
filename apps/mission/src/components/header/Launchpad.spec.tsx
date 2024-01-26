// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LaunchPad } from "./LaunchPad";
import { disableMixpanel, localMixpanel as mixpanel } from "tracker";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing LaunchPad", () => {
  test("should display LaunchPad button", () => {
    render(<LaunchPad />);
    const launchPadButton = screen.getByRole("button", { name: /launchpad/i });
    expect(launchPadButton).toBeDefined();
  });

  test("should display the menu when LaunchPad button is clicked", async () => {
    render(<LaunchPad />);
    const launchPadButton = screen.getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const menu = screen.getByLabelText("launchpad");
    expect(menu).toBeDefined();
  });

  test("should call AppLauncher event with property Portfolio when Portfolio button is clicked", async () => {
    render(<LaunchPad />);
    const launchPadButton = screen.getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = screen.getByText(/Portfolio/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith("AppLauncher", {
      "dApp Name": "Portfolio",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call AppLauncher event with property Portfolio when Portfolio button is clicked", async () => {
    disableMixpanel();
    render(<LaunchPad />);
    const launchPadButton = screen.getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = screen.getByText(/Portfolio/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call AppLauncher event with property Home when Home button is clicked", async () => {
    render(<LaunchPad />);
    const launchPadButton = screen.getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = screen.getByText(/home/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith("AppLauncher", {
      "dApp Name": "dAppStore",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call AppLauncher event with property Home when Home button is clicked", async () => {
    disableMixpanel();
    render(<LaunchPad />);
    const launchPadButton = screen.getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = screen.getByText(/home/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

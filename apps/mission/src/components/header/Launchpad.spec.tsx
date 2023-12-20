import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LaunchPad } from "./LaunchPad";
import mixpanel from "mixpanel-browser";

import { disableMixpanel } from "tracker";
// same as vitest.setup.ts
const TOKEN = "testToken";
describe("Testing LaunchPad", () => {
  test("should display LaunchPad button", () => {
    const { getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    expect(launchPadButton).toBeDefined();
  });

  test("should display the menu when LaunchPad button is clicked", async () => {
    const { getByRole, getByLabelText } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const menu = getByLabelText("launchpad");
    expect(menu).toBeDefined();
  });

  test("should call AppLauncher event with property Governance when Governance button is clicked", async () => {
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Governance/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith("AppLauncher", {
      "dApp Name": "Governance",
      token: TOKEN,
    });
  });

  test("should not call AppLauncher event with property Governance when Governance button is clicked", async () => {
    disableMixpanel();
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Governance/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call AppLauncher event with property Staking when Staking button is clicked", async () => {
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Staking/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith("AppLauncher", {
      "dApp Name": "Staking",
      token: TOKEN,
    });
  });

  test("should not call AppLauncher event with property Staking when Staking button is clicked", async () => {
    disableMixpanel();
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Staking/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call AppLauncher event with property Portfolio when Portfolio button is clicked", async () => {
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Portfolio/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith("AppLauncher", {
      "dApp Name": "Portfolio",
      token: TOKEN,
    });
  });

  test("should not call AppLauncher event with property Portfolio when Portfolio button is clicked", async () => {
    disableMixpanel();
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Portfolio/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call AppLauncher event with property Home when Home button is clicked", async () => {
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Home/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith("AppLauncher", {
      "dApp Name": "dAppStore",
      token: TOKEN,
    });
  });

  test("should not call AppLauncher event with property Home when Home button is clicked", async () => {
    disableMixpanel();
    const { getByLabelText, getByRole } = render(<LaunchPad />);
    const launchPadButton = getByRole("button", { name: /launchpad/i });
    await userEvent.click(launchPadButton);
    const button = getByLabelText(/Home/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
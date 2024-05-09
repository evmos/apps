// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { COMPLETED_COPILOT_ONBOARDING, disableMixpanel } from "tracker";
import { ButtonsNextSteps } from "./button-next-steps";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Top up success message", () => {
  test("should call mixpanel event for clicking on learn more", async () => {
    render(<ButtonsNextSteps />);
    const button = await screen.findByRole("link", { name: /learn more/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(COMPLETED_COPILOT_ONBOARDING, {
      "Completed Copilot Onboarding": "Learn More",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for clicking on learn more", async () => {
    disableMixpanel();
    render(<ButtonsNextSteps />);
    const button = await screen.findByRole("link", { name: /learn more/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for clicking on Stake your evmos", async () => {
    render(<ButtonsNextSteps />);
    const button = await screen.findByRole("link", {
      name: /stake your evmos/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(COMPLETED_COPILOT_ONBOARDING, {
      "Completed Copilot Onboarding": "Stake your Evmos",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });
  test("should not call mixpanel event for clicking on Stake your evmos", async () => {
    disableMixpanel();
    render(<ButtonsNextSteps />);
    const button = await screen.findByRole("link", {
      name: /stake your evmos/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

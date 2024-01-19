// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_ON_NEXT_STEPS_COPILOT, disableMixpanel } from "tracker";

import { TopupSuccessMessage } from "./topup-success-message";
import { CopilotContext } from "../../copilot";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Top up success message", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <CopilotContext.Provider
        value={{
          flowId: "setup-account",
          nextStep: vi.fn(),
          prevStep: vi.fn(),
          setIsCompleted: vi.fn(),
          isCompleted: false,
          activeStep: "",
          setActiveStep: vi.fn(),
          hasNextStep: 2 < 3 - 1,
          hasPrevStep: 2 > 0,
          steps: [
            {
              id: "setup-account",
              isActive: true,
              isCompleted: false,
            },
          ],

          _init: vi.fn(),
        }}
      >
        {children}
      </CopilotContext.Provider>
    );
  };
  test("should call mixpanel event for clicking on next steps", async () => {
    render(<TopupSuccessMessage />, {
      wrapper,
    });
    const button = await screen.findByRole("button", { name: "Next steps" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_NEXT_STEPS_COPILOT, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for clicking on next steps", async () => {
    disableMixpanel();
    render(<TopupSuccessMessage />, {
      wrapper,
    });
    const button = await screen.findByRole("button", { name: "Next steps" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_TOP_UP_ACCOUNT_DAPP,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { SetupAccountSuccesStep } from "./setup-success-step";
import { CopilotContext } from "../../copilot";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Setup success step", () => {
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
  test("should call mixpanel event for click on top up", async () => {
    render(<SetupAccountSuccesStep />, { wrapper });
    const button = await screen.findByRole("button", {
      name: /Top up your account/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_TOP_UP_ACCOUNT_DAPP, {
      Location: "Inside Copilot",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for click on top up", async () => {
    disableMixpanel();
    render(<SetupAccountSuccesStep />, { wrapper });
    const button = await screen.findByRole("button", {
      name: /Top up your account/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_TOGGLE_FOR_VALIDATORS,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import ValidatorToggle from "./Toggle";
import { ValidatorStateWrapper } from "../context/ValidatorStateContext";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Toggle Validators ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <ValidatorStateWrapper>{children}</ValidatorStateWrapper>;
  };

  test("should call mixpanel event for show inactive validators", async () => {
    render(<ValidatorToggle />, { wrapper });
    const button = screen.getByText(/Show Inactive/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_TOGGLE_FOR_VALIDATORS, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for show inactive validators", async () => {
    disableMixpanel();
    render(<ValidatorToggle />, { wrapper });
    const button = screen.getByText(/Show Inactive/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

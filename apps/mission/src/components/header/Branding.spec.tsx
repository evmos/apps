// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_EVMOS_LOGO,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { Branding } from "./Branding";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Branding", () => {
  test("should call mixpanel event for Logo", async () => {
    render(<Branding />);
    const button = screen.getByRole("link", { name: /Evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_EVMOS_LOGO, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for Logo", async () => {
    disableMixpanel();
    render(<Branding />);
    const button = screen.getByRole("link", { name: /Evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_CTA_LINKS_REGISTER_TOKEN, disableMixpanel } from "tracker";

import Guide from "./Guide";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Guide ", () => {
  test("should call mixpanel event for register your token", async () => {
    const { getByLabelText } = render(<Guide />);
    const button = getByLabelText(/register your token/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_CTA_LINKS_REGISTER_TOKEN,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      }
    );
  });

  test("should not call mixpanel event for register your token", async () => {
    disableMixpanel();
    const { getByLabelText } = render(<Guide />);
    const button = getByLabelText(/register your token/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

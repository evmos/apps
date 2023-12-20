import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_CTA_LINKS_REGISTER_TOKEN, disableMixpanel } from "tracker";

import Guide from "./Guide";

// same as vitest.setup.ts
const TOKEN = "testToken";

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
        token: TOKEN,
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
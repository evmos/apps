// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_ON_VIEW_ALL_DAPPS } from "tracker";
import { HeroSectionExplore } from "./hero-section-explore";

// same as vitest.setup.ts
const TOKEN = "testToken";
const AMOUNT_DAPPS = 8;
describe("Testing Hero Section Explore", () => {
  test("should call mixpanel event for view all dapps", async () => {
    const { findByText } = render(
      await HeroSectionExplore({ totalApps: AMOUNT_DAPPS })
    );

    const button = await findByText(/See all dapps/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_VIEW_ALL_DAPPS, {
      Location: "Graphic",
      token: TOKEN,
    });
  });
});

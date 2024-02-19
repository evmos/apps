// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CLICK_ON_VIEW_ALL_DAPPS, localMixpanel as mixpanel } from "tracker";
import { HeroSectionExplore } from "./hero-section-explore";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

const AMOUNT_DAPPS = 8;
describe("Testing Hero Section Explore", () => {
  test("should call mixpanel event for view all dapps", async () => {
    render(await HeroSectionExplore({ totalApps: AMOUNT_DAPPS }));

    const button = await screen.findByText(/See all dapps/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_VIEW_ALL_DAPPS, {
      Location: "Graphic",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });
});

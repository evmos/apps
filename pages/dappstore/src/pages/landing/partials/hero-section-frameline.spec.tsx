// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import {
  CLICK_LEARN_BUTTON,
  CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
  disableMixpanel,
} from "tracker";

import { HeroSectionFrameline } from "./hero-section-frameline";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Hero Section Frameline", () => {
  test("should call mixpanel event for add dapp", async () => {
    render(await HeroSectionFrameline());
    const button = screen.getByRole("link", { name: /add your dapp/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
  });

  test("should not call mixpanel event for add dapp", async () => {
    disableMixpanel();
    render(await HeroSectionFrameline());
    const button = screen.getByRole("link", { name: /add your dapp/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for build on evmos", async () => {
    render(await HeroSectionFrameline());
    const button = screen.getByRole("link", { name: /build on evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_LEARN_BUTTON, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for build on evmos", async () => {
    disableMixpanel();
    render(await HeroSectionFrameline());
    const button = screen.getByRole("link", { name: /build on evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

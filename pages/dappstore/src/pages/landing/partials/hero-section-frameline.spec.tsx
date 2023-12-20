import { test, describe, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import {
  CLICK_LEARN_BUTTON,
  CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
  disableMixpanel,
} from "tracker";

import { HeroSectionFrameline } from "./hero-section-frameline";

// same as vitest.setup.ts
const TOKEN = "testToken";
describe("Testing Hero Section Frameline", () => {
  test("should call mixpanel event for add dapp", async () => {
    const { getByLabelText } = render(await HeroSectionFrameline());
    const button = getByLabelText(/add dapp/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
      {
        token: TOKEN,
      }
    );
  });

  test("should not call mixpanel event for add dapp", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await HeroSectionFrameline());
    const button = getByLabelText(/add dapp/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for build on evmos", async () => {
    const { getByLabelText } = render(await HeroSectionFrameline());
    const button = getByLabelText(/build on evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_LEARN_BUTTON, {
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for build on evmos", async () => {
    disableMixpanel();
    const { getByLabelText } = render(await HeroSectionFrameline());
    const button = getByLabelText(/build on evmos/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
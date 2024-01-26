// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CLICK_ON_VIEW_ALL_DAPPS, localMixpanel as mixpanel } from "tracker";

import { ButtonSeedApps } from "./button-see-dapps";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Button See all dApps", () => {
  test("should call mixpanel event for click on see all dapps", async () => {
    render(await ButtonSeedApps({ totalApps: 5 }));
    const button = await screen.findByRole("link", { name: /see all /i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_VIEW_ALL_DAPPS, {
      Location: "Home Page",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  //   TODO: FIX -> Error: A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.
  //   test("should not call mixpanel event for click on see all dapps", async () => {
  //    render(await ButtonSeedApps({ totalApps: 5 }));
  //     const button = await screen.findByText(/See all 5 dapps/i);
  //     expect(button).toBeDefined();
  //     await userEvent.click(button);
  //     disableMixpanel();
  //     expect(mixpanel.init).toHaveBeenCalledOnce();
  //     expect(mixpanel.track).not.toHaveBeenCalled();
  //   });
});

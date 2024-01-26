// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_TABS_STAKING_OPTIONS,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import TabNavItem from "./TabNavItem";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Tab Nav Item ", () => {
  test("should call mixpanel event for tab navItem - Staking", async () => {
    render(
      <TabNavItem
        id="tab2"
        title="validators"
        activeTab="tab2"
        setActiveTab={vi.fn()}
      />,
    );

    const button = screen.getByText(/Validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const validators = screen.getByText(/Validators/i);
    expect(validators).toBeDefined();
    await userEvent.click(validators);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_TABS_STAKING_OPTIONS, {
      Tab: "validators",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for tab navItem - Staking", async () => {
    disableMixpanel();
    render(
      <TabNavItem
        id="tab2"
        title="validators"
        activeTab="tab2"
        setActiveTab={vi.fn()}
      />,
    );

    const button = screen.getByText(/Validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const validators = screen.getByText(/Validators/i);
    expect(validators).toBeDefined();
    await userEvent.click(validators);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

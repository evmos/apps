import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_TABS_STAKING_OPTIONS, disableMixpanel } from "tracker";
import TabNavItem from "./TabNavItem";

// same as vitest.setup.ts
const TOKEN = "testToken";

describe("Testing Tab Nav Item ", () => {
  test("should call mixpanel event for tab navItem - Staking", async () => {
    const { getByText } = render(
      <TabNavItem
        id="tab2"
        title="validators"
        activeTab="tab2"
        setActiveTab={vi.fn()}
      />
    );

    const button = getByText(/Validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const validators = getByText(/Validators/i);
    expect(validators).toBeDefined();
    await userEvent.click(validators);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_TABS_STAKING_OPTIONS, {
      Tab: "validators",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for tab navItem - Staking", async () => {
    disableMixpanel();
    const { getByText } = render(
      <TabNavItem
        id="tab2"
        title="validators"
        activeTab="tab2"
        setActiveTab={vi.fn()}
      />
    );

    const button = getByText(/Validators/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const validators = getByText(/Validators/i);
    expect(validators).toBeDefined();
    await userEvent.click(validators);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

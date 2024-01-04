// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_ON_STAKE_AND_MANAGE_DELEGATION, disableMixpanel } from "tracker";
import { StakingCard } from ".";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe.skip("Testing Staking Card", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for click on participate in Staking", async () => {
    render(<StakingCard />, { wrapper });
    const button = await screen.findByText(
      "Earn rewards for participating in the network's security"
    );
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_STAKE_AND_MANAGE_DELEGATION,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      }
    );
  });

  test("should not call mixpanel event for click on participate in Staking", async () => {
    disableMixpanel();
    render(<StakingCard />, { wrapper });
    const button = await screen.findByRole("button", {
      name: /Stake & manage delegations/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
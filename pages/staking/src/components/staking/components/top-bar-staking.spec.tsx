// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BigNumber } from "@ethersproject/bignumber";
import {
  CLICK_CLAIM_REWARDS_BUTTON,
  UNSUCCESSFUL_TX_CLAIM_REWARDS,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { PropsWithChildren } from "react";
import TopBarStaking from "./TopBarStaking";
import { RootProviders } from "stateful-components/src/root-providers";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("wagmi/actions", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    getNetwork: () => {
      return {
        chain: {
          id: 9001,
        },
      };
    },
  };
});

vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
      };
    },
  };
});

vi.mock("@evmosapps/evmos-wallet/src/api/useStake", () => ({
  useStakingInfo: () => {
    return {
      totalDelegations: BigNumber.from(500000),
      totalUndelegations: BigNumber.from(500000),
      totalRewards: 500000000000,
    };
  },
}));

describe("Testing Claim Rewards", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for clicking on claim rewards + unsuccessful claim", async () => {
    render(<TopBarStaking />, { wrapper });
    const button = screen.getByRole("button", { name: /Claim rewards/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_CLAIM_REWARDS_BUTTON, {
      token: MIXPANEL_TOKEN_FOR_TEST,
      "User Wallet Address": "",
      "Wallet Provider": "",
    });
    expect(mixpanel.track).toHaveBeenCalledWith(UNSUCCESSFUL_TX_CLAIM_REWARDS, {
      token: MIXPANEL_TOKEN_FOR_TEST,
      "User Wallet Address": "",
      "Wallet Provider": "",
      "Error Message": "ACCOUNT_NOT_FOUND",
    });
  });

  test("should not call mixpanel event for clicking on claim rewards + unsuccessful claim", async () => {
    disableMixpanel();
    render(<TopBarStaking />, { wrapper });
    const button = screen.getByRole("button", { name: /Claim rewards/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

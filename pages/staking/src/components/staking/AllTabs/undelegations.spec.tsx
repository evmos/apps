// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_CANCEL_UNDELEGATION_BUTTON,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import Undelegations from "./Undelegations";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { SearchWrapper } from "../../context/SearchContext";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("@evmosapps/evmos-wallet/src/api/useStake", () => ({
  useStakingInfo: () => {
    return {
      undelegations: [
        {
          // eslint-disable-next-line no-secrets/no-secrets
          delegator_address: "evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65",
          validator_address:
            // eslint-disable-next-line no-secrets/no-secrets
            "evmosvaloper1g57n4k08sk5z6ramzsgzrapgpsjsyh4t5tldw5",
          entries: [
            {
              creation_height: "17742507",
              completion_time: "2023-12-29T14:13:21.353523017Z",
              initial_balance: "99500031659400",
              balance: "99500031659400",
            },
          ],
          validator: {
            operator_address:
              // eslint-disable-next-line no-secrets/no-secrets
              "evmosvaloper1g57n4k08sk5z6ramzsgzrapgpsjsyh4t5tldw5",
            consensus_pubkey: { type_url: "", value: "" },
            jailed: false,
            status: "BOND_STATUS_BONDED",
            tokens: "42596004901001064019893",
            delegator_shares: "43025149485324771526956.187671335620019796",
            description: {
              moniker: "01node",
              identity: "7BDD4C2E94392626",
              website: "https://01node.com",
              security_contact: "",
              details:
                "01node Professional Staking Services for  Evmos, Nomic, Juno, Regen, Osmosis, Cosmos, Terra, Solana, Near, Skale, Gnosis, Sentinel, Persistence, TheGraph",
            },
            unbonding_height: "14841878",
            unbonding_time: "2023-08-09T20:49:34.623089892Z",
            commission: {
              commission_rates: {
                rate: "0.050000000000000000",
                max_rate: "0.100000000000000000",
                max_change_rate: "0.010000000000000000",
              },
              update_time: "2022-03-04T12:09:47.344991395Z",
            },
            min_self_delegation: "1000000",
            rank: 146,
          },
        },
      ],
      rewards: {
        rewards: [
          {
            validator_address:
              // eslint-disable-next-line no-secrets/no-secrets
              "evmosvaloper1zwr06uz8vrwkcnd05e5yddamvghn93a4hsyewa",
            reward: [
              { denom: "aevmos", amount: "6013254571185.269380000000000000" },
            ],
          },
          {
            validator_address:
              // eslint-disable-next-line no-secrets/no-secrets
              "evmosvaloper1g57n4k08sk5z6ramzsgzrapgpsjsyh4t5tldw5",
            reward: [{ denom: "aevmos", amount: "0.002951063665499585" }],
          },
          {
            validator_address:
              // eslint-disable-next-line no-secrets/no-secrets
              "evmosvaloper1dgpv4leszpeg2jusx2xgyfnhdzghf3rf0qq22v",
            reward: [
              {
                denom: "aevmos",
                amount: "10177325788350250.076855064594440018",
              },
            ],
          },
          {
            validator_address:
              // eslint-disable-next-line no-secrets/no-secrets
              "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
            reward: [
              { denom: "aevmos", amount: "7070039330030.917000000000000000" },
            ],
          },
        ],
        total: [
          { denom: "aevmos", amount: "10190409082251466.266186128259939603" },
        ],
      },
    };
  },
}));
describe("Testing Undelegations", () => {
  const ResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  const wrapper = ({ children }: { children: JSX.Element }) => {
    return (
      <RootProviders>
        <SearchWrapper>{children}</SearchWrapper>
      </RootProviders>
    );
  };

  test("should call mixpanel event for undelegations ", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<Undelegations />, { wrapper });
    const button = screen.getByLabelText(/start undelegations/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_CANCEL_UNDELEGATION_BUTTON,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
    vi.unstubAllGlobals();
  });

  test("should not call mixpanel event for undelegations ", async () => {
    disableMixpanel();
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<Undelegations />, { wrapper });
    const button = screen.getByLabelText(/start undelegations/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

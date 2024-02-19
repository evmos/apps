// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_GOVERNANCE_PROPOSAL,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";
import { ContainerProposals } from "./ContainerProposals";
import { getPercentage } from "helpers";

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      getActiveProviderKey: () => null,
    };
  },
);

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("../../../utils/hooks/useProposals", () => ({
  useProposals: () => ({
    data: [
      {
        id: 1,
        title: "title",

        description: "description",

        tally: getPercentage({
          yes: "0",
          no: "0",
          abstain: "0",
          noWithVeto: "0",
        }),
        tallyAbsolute: {
          yes: "0",
          no: "0",
          abstain: "0",
          noWithVeto: "0",
        },
        votingStart:
          "Fri Jan 26 2024 16:40:04 GMT+0100 (Central European Standard Time)",
        votingEnd:
          "Fri Jan 26 2024 16:40:04 GMT+0100 (Central European Standard Time)",
        depositEnd:
          "Fri Jan 26 2024 16:40:04 GMT+0100 (Central European Standard Time)",
        submitTime:
          "Fri Jan 26 2024 16:40:04 GMT+0100 (Central European Standard Time)",
        totalVotes: 0n,
        totalDeposit: "0",

        type: "",
      },
    ],
  }),
}));
describe("Testing Container Proposals", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for clicking on proposal Card", async () => {
    render(<ContainerProposals />, { wrapper });
    const button = await screen.findByText(/title/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_GOVERNANCE_PROPOSAL, {
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      "Governance Proposal": 1,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for clicking on proposal Card", async () => {
    disableMixpanel();
    render(<ContainerProposals />, { wrapper });
    const button = screen.getByText(/title/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_VOTE_BUTTON,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import { RootProviders } from "stateful-components/src/root-providers";

import VoteButton from "./VoteButton";
import { PropsWithChildren } from "react";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../../vitest.setup";
import { getPercentage } from "helpers";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      getActiveProviderKey: () => null,
    };
  },
);

const ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.mock("../../../../utils/hooks/useProposals", () => ({
  useProposalById: () => ({
    data: {
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
      votingStart: new Date("Fri Jan 26 2024 16:40:04 GMT+0100"),
      votingEnd: new Date("Fri Jan 26 2024 16:40:04 GMT+0100"),
      depositEnd: new Date("Fri Jan 26 2024 16:40:04 GMT+0100"),
      submitTime: new Date("Fri Jan 26 2024 16:40:04 GMT+0100"),
      totalVotes: 0n,
      totalDeposit: "0",

      type: "",
    },
  }),
}));

describe("Testing Container Proposals", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for clicking on proposal Card", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<VoteButton proposalId="267" />, {
      wrapper,
    });
    const button = await screen.findByRole("button", { name: "Vote" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_VOTE_BUTTON, {
      "User Wallet Address": undefined,
      "Wallet Provider": null,

      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    vi.unstubAllGlobals();
  });

  test("should call mixpanel event for clicking on proposal Card", async () => {
    disableMixpanel();
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<VoteButton proposalId="1" />, {
      wrapper,
    });
    const button = await screen.findByRole("button", { name: "Vote" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

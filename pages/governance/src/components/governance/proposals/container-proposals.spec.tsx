// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_GOVERNANCE_PROPOSAL, disableMixpanel } from "tracker";
import ContainerProposals from "./ContainerProposals";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";

// same as vitest.setup.ts
const TOKEN = "testToken";
const PROPOSALS = [
  {
    id: "1",
    title: "test",
    status: "",
    votingStartTime: "",
    votingEndTime: "",
    tallyResults: [],
  },
];

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe("Testing Container Proposals", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for clicking on proposal Card", async () => {
    const { getByText } = render(
      <ContainerProposals proposals={PROPOSALS} loading={false} error={""} />,
      { wrapper }
    );
    const button = getByText(/test/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_GOVERNANCE_PROPOSAL, {
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      "Governance Proposal": "1",
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for clicking on proposal Card", async () => {
    disableMixpanel();
    const { getByText } = render(
      <ContainerProposals proposals={PROPOSALS} loading={false} error={""} />,
      { wrapper }
    );
    const button = getByText(/test/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});
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

const VOTE_PROPS = {
  id: "1",
  title: "Test",
  isVotingTimeWithinRange: true,
};

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

const ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("Testing Container Proposals", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for clicking on proposal Card", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<VoteButton voteProps={VOTE_PROPS} />, {
      wrapper,
    });
    const button = screen.getByRole("button", { name: "Vote" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_VOTE_BUTTON, {
      "User Wallet Address": "",
      "Wallet Provider": "",

      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    vi.unstubAllGlobals();
  });

  test("should call mixpanel event for clicking on proposal Card", async () => {
    disableMixpanel();
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<VoteButton voteProps={VOTE_PROPS} />, {
      wrapper,
    });
    const button = screen.getByRole("button", { name: "Vote" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

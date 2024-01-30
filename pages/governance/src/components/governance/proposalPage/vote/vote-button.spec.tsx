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
import {
  MIXPANEL_TOKEN_FOR_TEST,
  ResizeObserver,
} from "../../../../../vitest.setup";

describe("Testing Container Proposals", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for clicking on proposal Card", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    render(<VoteButton proposalId="2" />, {
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
    render(<VoteButton proposalId="2" />, {
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

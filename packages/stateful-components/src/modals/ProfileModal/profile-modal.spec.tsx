// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_DISCONNECT_WALLET_BUTTON,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import { ProfileModal } from "./ProfileModal";
import { RootProviders } from "../../root-providers";
import { MIXPANEL_TOKEN_FOR_TEST, ResizeObserver } from "../../../vitest.setup";

describe("Testing Profile Modal", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for Disconnect wallet", async () => {
    render(<ProfileModal />, { wrapper });
    const button = screen.getByRole("button", { name: /Disconnect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_DISCONNECT_WALLET_BUTTON,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
  });

  test("should not  call mixpanel event for Disconnect wallet", async () => {
    vi.stubGlobal("ResizeObserver", ResizeObserver);
    disableMixpanel();
    render(<ProfileModal />, { wrapper });
    const button = screen.getByRole("button", { name: /Disconnect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});

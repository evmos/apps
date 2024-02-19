// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  PROMPTED_TO,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { PropsWithChildren } from "react";
import { ConnectToWalletWarning } from "./ConnectToWalletWarning";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    cache: (fn: unknown) => fn,
    "server-only": {},
  };
});
describe("Testing Connect To Wallet Warning", () => {
  test("should call mixpanel event for connect in pay modal", async () => {
    render(<ConnectToWalletWarning modalType="Pay Modal" />);
    const button = await screen.findByRole("button", { name: /connect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Pay Modal",
      "Prompt To": "Connect Account",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for connect in pay modal", async () => {
    disableMixpanel();
    render(<ConnectToWalletWarning modalType="Pay Modal" />);

    const button = await screen.findByRole("button", { name: /connect/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

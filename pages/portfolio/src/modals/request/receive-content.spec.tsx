// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import {
  CLICK_ON_COPY_ICON_RECEIVE_FLOW,
  CLICK_ON_DISPLAY_FORMAT,
  CLICK_ON_REQUEST_FUNDS,
  disableMixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";

import { ReceiveContent } from "./ReceiveContent";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

// eslint-disable-next-line no-secrets/no-secrets
const ADDRESS = "0xC1dC8C6c0dCd24226c721a7E109E4A7C20F7bF0f";
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

vi.mock("wagmi", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    useAccount: () => {
      return {
        isDisconnected: false,
        address: ADDRESS,
      };
    },
  };
});

describe("Testing Receive Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when changing display format", async () => {
    render(<ReceiveContent setState={vi.fn()} />, {
      wrapper,
    });

    const button0x = await screen.findByText(/0x/i);
    expect(button0x).toBeDefined();
    const buttonIBC = screen.getByText(/IBC/i);
    expect(buttonIBC).toBeDefined();
    await userEvent.click(buttonIBC);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_DISPLAY_FORMAT, {
      "Receive Modal Actions": "IBC",
      "Wallet Provider": null,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    await userEvent.click(button0x);
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_DISPLAY_FORMAT, {
      "Receive Modal Actions": "0x",
      "Wallet Provider": null,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(2);
  });

  test("should not call mixpanel event when changing display format", async () => {
    disableMixpanel();
    render(<ReceiveContent setState={vi.fn()} />, {
      wrapper,
    });
    const button0x = await screen.findByText(/0x/i);
    expect(button0x).toBeDefined();
    const buttonIBC = screen.getByText(/IBC/i);
    expect(buttonIBC).toBeDefined();
    await userEvent.click(buttonIBC);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  //   Copy to clipboard
  test("should call mixpanel event when clicking on copy address", async () => {
    userEvent.setup();
    render(<ReceiveContent setState={vi.fn()} />, {
      wrapper,
    });
    const button = await screen.findByLabelText(/Copy to clipboard/i);
    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_COPY_ICON_RECEIVE_FLOW,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
        "Wallet Provider": null,
      },
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when clicking on copy address", async () => {
    disableMixpanel();
    userEvent.setup();
    render(<ReceiveContent setState={vi.fn()} />, {
      wrapper,
    });
    const button = await screen.findByLabelText(/Copy to clipboard/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event when clicking on request funds", async () => {
    render(<ReceiveContent setState={vi.fn()} />, {
      wrapper,
    });
    const button = await screen.findByRole("button", {
      name: /request funds/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_REQUEST_FUNDS, {
      token: MIXPANEL_TOKEN_FOR_TEST,
      "Wallet Provider": null,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when clicking on request funds", async () => {
    disableMixpanel();
    render(<ReceiveContent setState={vi.fn()} />, {
      wrapper,
    });
    const button = await screen.findByRole("button", {
      name: /request funds/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

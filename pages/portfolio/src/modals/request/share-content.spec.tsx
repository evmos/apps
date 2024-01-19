// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import {
  CLICK_ON_COPY_ICON_REQUEST_FLOW,
  CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW,
  disableMixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { ShareContent } from "./ShareContent";
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

describe("Testing Set Up Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when clicking on copy payment request link", async () => {
    userEvent.setup();
    render(
      <ShareContent
        setState={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      },
    );

    const button = await screen.findByLabelText(/Copy to clipboard/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_COPY_ICON_REQUEST_FLOW,
      {
        "Wallet Provider": null,
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when clicking on copy payment request link", async () => {
    userEvent.setup();
    disableMixpanel();
    render(
      <ShareContent
        setState={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      },
    );

    const button = await screen.findByLabelText(/Copy to clipboard/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event when clicking on share message", async () => {
    userEvent.setup();
    render(
      <ShareContent
        setState={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      },
    );

    const button = await screen.findByRole("button", {
      name: /share message/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_SHARE_VIA_APP_REQUEST_FLOW,
      {
        "Wallet Provider": null,
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when clicking on share message", async () => {
    disableMixpanel();
    userEvent.setup();
    render(
      <ShareContent
        setState={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      },
    );

    const button = await screen.findByRole("button", {
      name: /share message/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

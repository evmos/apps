// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";
import { CLICK_ON_GENERATE_PAYMENT_REQUEST, disableMixpanel } from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { SetUpContent } from "./SetupContent";

// same as vitest.setup.ts
const TOKEN = "testToken";
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

describe("Testing Set Up Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when clicking on generate payment request", async () => {
    const { findByTestId } = render(
      <SetUpContent
        setState={vi.fn()}
        setMessage={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      }
    );

    const button = await findByTestId(/receive-modal-generate-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_GENERATE_PAYMENT_REQUEST,
      {
        "Wallet Provider": null,
        token: TOKEN,
      }
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when clicking on generate payment request", async () => {
    disableMixpanel();
    const { findByTestId } = render(
      <SetUpContent
        setState={vi.fn()}
        setMessage={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      }
    );

    const button = await findByTestId(/receive-modal-generate-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

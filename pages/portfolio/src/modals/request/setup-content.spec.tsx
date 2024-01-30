// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_GENERATE_PAYMENT_REQUEST,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";

import { SetUpContent } from "./SetupContent";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Set Up Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when clicking on generate payment request", async () => {
    render(
      <SetUpContent
        setState={vi.fn()}
        setMessage={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      },
    );

    const button = await screen.findByTestId(/receive-modal-generate-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_ON_GENERATE_PAYMENT_REQUEST,
      {
        "Wallet Provider": null,
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when clicking on generate payment request", async () => {
    disableMixpanel();
    render(
      <SetUpContent
        setState={vi.fn()}
        setMessage={vi.fn()}
        token="evmos:EVMOS"
        message="test"
        amount={1n}
      />,
      {
        wrapper,
      },
    );

    const button = await screen.findByTestId(/receive-modal-generate-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

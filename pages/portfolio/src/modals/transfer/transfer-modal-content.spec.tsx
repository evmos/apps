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
import { TransferModalContent } from "./TransferModalContent";
import { RootProviders } from "stateful-components/src/root-providers";
import { MIXPANEL_TOKEN_FOR_TEST, TEST_ADDRESS } from "../../../vitest.setup";

describe("Testing Transfer Modal Content", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for top up in send modal", async () => {
    render(
      <TransferModalContent
        receiver={TEST_ADDRESS}
        networkPrefix="evmos"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", { name: /top-up evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Send Modal",
      "Prompt To": "Top Up",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should call mixpanel event for satellite ", async () => {
    render(
      <TransferModalContent
        receiver={TEST_ADDRESS}
        networkPrefix="axelar"
        token="axelar:axlUSDC"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /go to satellite/i,
    });
    expect(button).toBeDefined();

    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Send Modal",
      "Prompt To": "Satellite",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should call mixpanel event for connect with keplr", async () => {
    render(
      <TransferModalContent
        receiver={TEST_ADDRESS}
        networkPrefix="axelar"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /install keplr/i,
    });
    expect(button).toBeDefined();

    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Send Modal",
      "Prompt To": "Install Keplr",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for top up in send modal", async () => {
    disableMixpanel();
    render(
      <TransferModalContent
        receiver={TEST_ADDRESS}
        networkPrefix="evmos"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", { name: /top-up evmos/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should not call mixpanel event for satellite ", async () => {
    disableMixpanel();
    render(
      <TransferModalContent
        receiver={TEST_ADDRESS}
        networkPrefix="axelar"
        token="axelar:axlUSDC"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /go to satellite/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should not call mixpanel event for connect with keplr", async () => {
    disableMixpanel();
    render(
      <TransferModalContent
        receiver={TEST_ADDRESS}
        networkPrefix="axelar"
        token="evmos:EVMOS"
        amount={1n}
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );
    const button = await screen.findByRole("button", {
      name: /install keplr/i,
    });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

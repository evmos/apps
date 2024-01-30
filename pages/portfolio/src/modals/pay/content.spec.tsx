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

import { RootProviders } from "stateful-components/src/root-providers";
import { Content } from "./Content";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

describe("Testing Content Pay", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for prompt to Forge", async () => {
    render(
      <Content // eslint-disable-next-line no-secrets/no-secrets
        requester="evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65"
        token="evmos:EVMOS"
        amount={80000000000000000000000n}
        message="test"
        step="receive"
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );

    const text = await screen.findByText(/Payment Request/i);
    expect(text).toBeDefined();
    const button = screen.getByRole("button", { name: /Swap Asset/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(PROMPTED_TO, {
      Modal: "Pay Modal",
      "Prompt To": "Forge",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for prompt to Forge", async () => {
    disableMixpanel();
    render(
      <Content
        // eslint-disable-next-line no-secrets/no-secrets
        requester="evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65"
        token="evmos:EVMOS"
        amount={80000000000000000000000n}
        message="test"
        step="receive"
        setState={vi.fn()}
        setIsOpen={vi.fn()}
      />,
      { wrapper },
    );

    const text = await screen.findByText(/Payment Request/i);
    expect(text).toBeDefined();
    const button = screen.getByRole("button", { name: /Swap Asset/i });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

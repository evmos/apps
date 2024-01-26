// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  SELECT_FROM_NETWORK_SEND_FLOW,
  SELECT_TOKEN_SEND_FLOW,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { AssetSelector } from "./AssetSelector";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../vitest.setup";

// eslint-disable-next-line no-secrets/no-secrets
const ADDRESS = "evmos14uepnqnvkuyyvwe65wmncejq5g2f0tjft3wr65";
vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      getActiveProviderKey: () => null,
    };
  },
);

describe("Testing Assets Selector", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event when changing token", async () => {
    render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      },
    );

    const text = await screen.findByText(/token/i);
    expect(text).toBeDefined();
    const button = screen.getByTestId(/asset-selector-token-selector-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = screen.getByTestId(
      /asset-selector-token-selector-option-EVMOS/i,
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_TOKEN_SEND_FLOW, {
      Token: "EVMOS",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_FROM_NETWORK_SEND_FLOW, {
      Network: "evmos",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(2);
  });

  test("should not call mixpanel event when changing token", async () => {
    disableMixpanel();
    render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      },
    );

    const text = await screen.findByText(/token/i);
    expect(text).toBeDefined();
    const button = screen.getByTestId(/asset-selector-token-selector-button/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = screen.getByTestId(
      /asset-selector-token-selector-option-EVMOS/i,
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event when changing network", async () => {
    render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      },
    );
    const text = await screen.findByText(/token/i);
    expect(text).toBeDefined();
    const button = screen.getByTestId(
      /asset-selector-network-selector-button/i,
    );
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = screen.getByTestId(
      /asset-selector-network-selector-option-EVMOS/i,
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(SELECT_FROM_NETWORK_SEND_FLOW, {
      Network: "evmos",
      "User Wallet Address": undefined,
      "Wallet Provider": null,
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
    expect(mixpanel.track).toHaveBeenCalledTimes(1);
  });

  test("should not call mixpanel event when changing network", async () => {
    disableMixpanel();
    render(
      <AssetSelector
        value={{
          networkPrefix: "evmos",
          ref: "evmos:EVMOS",
          amount: 0n,
        }}
        onChange={vi.fn()}
        address={ADDRESS}
      />,
      {
        wrapper,
      },
    );
    const text = await screen.findByText(/token/i);
    expect(text).toBeDefined();
    const button = screen.getByTestId(
      /asset-selector-network-selector-button/i,
    );
    expect(button).toBeDefined();
    await userEvent.click(button);
    const buttonEvmos = screen.getByTestId(
      /asset-selector-network-selector-option-EVMOS/i,
    );
    expect(buttonEvmos).toBeDefined();
    await userEvent.click(buttonEvmos);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

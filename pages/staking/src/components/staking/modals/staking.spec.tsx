// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_BUTTON_MANAGE_DELEGATE,
  CLICK_BUTTON_MANAGE_UNDELEGATE,
  CLICK_BUTTON_MANAGE_REDELEGATE,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import Staking from "./Staking";
import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

const validator = {
  moniker: "Hanchon.live",
  commissionRate: "0.200000000000000000",
  balance: "1339000000000000",
  details: "",
  website: "",
  // eslint-disable-next-line no-secrets/no-secrets
  validatorAddress: "evmosvaloper1dgpv4leszpeg2jusx2xgyfnhdzghf3rf0qq22v",
};

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

describe("Testing Tab Dropdowns ", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for delegate button - Staking", async () => {
    render(<Staking item={validator} setIsOpen={vi.fn()} />, { wrapper });

    const button = screen.getByRole("button", { name: "Delegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_BUTTON_MANAGE_DELEGATE, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for delegate button - Staking", async () => {
    disableMixpanel();
    render(<Staking item={validator} setIsOpen={vi.fn()} />, { wrapper });

    const button = screen.getByRole("button", { name: "Delegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for undelegate button - Staking", async () => {
    render(<Staking item={validator} setIsOpen={vi.fn()} />, { wrapper });

    const button = screen.getByRole("button", { name: "UNDELEGATE" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_BUTTON_MANAGE_UNDELEGATE,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
  });

  test("should not call mixpanel event for Undelegate button - Staking", async () => {
    disableMixpanel();
    render(<Staking item={validator} setIsOpen={vi.fn()} />, { wrapper });

    const button = screen.getByRole("button", { name: "UNDELEGATE" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });

  test("should call mixpanel event for Redelegate button - Staking", async () => {
    render(<Staking item={validator} setIsOpen={vi.fn()} />, { wrapper });

    const button = screen.getByRole("button", { name: "Redelegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(
      CLICK_BUTTON_MANAGE_REDELEGATE,
      {
        token: MIXPANEL_TOKEN_FOR_TEST,
      },
    );
  });

  test("should not call mixpanel event for Redelegate button - Staking", async () => {
    disableMixpanel();
    render(<Staking item={validator} setIsOpen={vi.fn()} />, { wrapper });

    const button = screen.getByRole("button", { name: "Redelegate" });
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

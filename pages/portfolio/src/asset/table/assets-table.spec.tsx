// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  CLICK_HIDE_ZERO_BALANCE,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";

import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import AssetsTable from "./AssetsTable";
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
describe("Testing Assets Table", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for hide zero balance click", async () => {
    render(<AssetsTable />, { wrapper });
    const button = screen.getByLabelText("Hide Zero Balance");
    expect(button).toBeDefined();
    await userEvent.click(button);

    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_HIDE_ZERO_BALANCE, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for hide zero balance click", async () => {
    disableMixpanel();
    render(<AssetsTable />, { wrapper });
    const button = screen.getByLabelText("Hide Zero Balance");
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mixpanel from "mixpanel-browser";

import { CLICK_COMMONWEALTH_OUTLINK, disableMixpanel } from "tracker";
import BannerBlack from "./BannerBlack";
import { COMMONWEALTH_URL } from "@evmosapps/constants";

import { RootProviders } from "stateful-components/src/root-providers";
import { PropsWithChildren } from "react";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

const TEXT = "Test";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));
describe("Testing Banner Black", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };

  test("should call mixpanel event for commonwealth link", async () => {
    render(<BannerBlack text={TEXT} href={COMMONWEALTH_URL} />, { wrapper });
    const button = screen.getByText(/Test/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_COMMONWEALTH_OUTLINK, {
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for fcommonwealth link", async () => {
    disableMixpanel();
    render(<BannerBlack text={TEXT} href={COMMONWEALTH_URL} />, { wrapper });
    const button = screen.getByText(/Test/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

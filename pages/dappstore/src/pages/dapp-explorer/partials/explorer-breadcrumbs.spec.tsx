// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_BREADCRUMB,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { ExplorerBreadcrumbs } from "./explorer-breadcrumbs";
import { MIXPANEL_TOKEN_FOR_TEST } from "../../../../vitest.setup";

describe("Testing Explorer Breadcrumbs", () => {
  test("should call mixpanel event for breadcrumbs clicks", async () => {
    render(
      await ExplorerBreadcrumbs({
        params: {
          category: "dapps",
        },
      }),
    );
    const button = screen.getByText(/dApp Store/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_BREADCRUMB, {
      Breadcrumb: "dApp Store",
      token: MIXPANEL_TOKEN_FOR_TEST,
    });
  });

  test("should not call mixpanel event for breadcrumbs clicks", async () => {
    disableMixpanel();
    render(
      await ExplorerBreadcrumbs({
        params: {
          category: "dapps",
        },
      }),
    );

    const button = screen.getByText(/All/i);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

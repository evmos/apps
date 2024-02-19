// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  CLICK_ON_BREADCRUMB,
  disableMixpanel,
  localMixpanel as mixpanel,
} from "tracker";
import { ExplorerBreadcrumbs } from "./explorer-breadcrumbs";
import { PropsWithChildren } from "react";

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

vi.mock("react", async (importOriginal: () => Promise<{}>) => {
  return {
    ...(await importOriginal()),
    cache: (fn: unknown) => fn,
  };
});

const MOCK_CATEGORIES = [
  "DeFi",
  "NFTs",
  "Games",
  "DAOs",
  "Infrastructure",
  "Social",
].map((name) => ({ name, slug: name.toLowerCase() }));

const TOKEN = "testToken";
const MOCK_DAPPS = ["Forge", "Stride", "Wormhole"].map((name) => ({
  name,
  slug: name.toLowerCase(),
}));
vi.mock("../../../lib/fetch-explorer-data", () => ({
  fetchExplorerData: () => {
    return { categories: MOCK_CATEGORIES, dApps: MOCK_DAPPS };
  },
}));

describe("Testing Explorer Breadcrumbs", () => {
  test("should call mixpanel event for breadcrumbs clicks", async () => {
    render(
      await ExplorerBreadcrumbs({
        params: {
          category: MOCK_CATEGORIES[2]!.slug,
          dapp: MOCK_DAPPS[1]!.slug,
        },
      }),
    );
    const button = screen.getByText(MOCK_CATEGORIES[2]!.name);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).toHaveBeenCalledWith(CLICK_ON_BREADCRUMB, {
      Breadcrumb: MOCK_CATEGORIES[2]!.name,
      token: TOKEN,
    });
  });

  test("should not call mixpanel event for breadcrumbs clicks", async () => {
    disableMixpanel();
    render(
      await ExplorerBreadcrumbs({
        params: {
          category: MOCK_CATEGORIES[2]!.slug,
          dapp: MOCK_DAPPS[1]!.slug,
        },
      }),
    );

    const button = screen.getByText(MOCK_CATEGORIES[2]!.name);
    expect(button).toBeDefined();
    await userEvent.click(button);
    expect(mixpanel.init).toHaveBeenCalledOnce();
    expect(mixpanel.track).not.toHaveBeenCalled();
  });
});

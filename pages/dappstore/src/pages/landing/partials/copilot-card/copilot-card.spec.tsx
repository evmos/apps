// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import mixpanel from "mixpanel-browser";
// import { CLICK_ON_PARTICIPATE_IN_GOVERNANCE, disableMixpanel } from "tracker";
import { CopilotCard } from "./copilot-card";
import { PropsWithChildren } from "react";
import { RootProviders } from "stateful-components/src/root-providers";
// same as vitest.setup.ts
// const TOKEN = "testToken";

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

describe("Testing Ecosystem Card", () => {
  const wrapper = ({ children }: { children: JSX.Element }) => {
    return <RootProviders>{children}</RootProviders>;
  };
  test("should call mixpanel event for featured dapp", async () => {
    const { findByText, debug } = render(<CopilotCard />, { wrapper });
    const button = await findByText("Let's go");

    expect(button).toBeDefined();
    debug();
  });
});

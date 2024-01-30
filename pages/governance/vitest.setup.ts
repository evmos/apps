// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { enableMixpanel, localMixpanel as mixpanel } from "tracker";
import { PropsWithChildren } from "react";
import { server } from "./src/mocks/server";

export const MIXPANEL_TOKEN_FOR_TEST = "testToken";
const initializeMixpanelAndEnable = () => {
  mixpanel.init(MIXPANEL_TOKEN_FOR_TEST, { ip: false });
  enableMixpanel();
};

vi.mock(
  "@evmosapps/evmos-wallet",
  async (importOriginal: () => Promise<{}>) => {
    return {
      ...(await importOriginal()),
      getActiveProviderKey: () => null,
    };
  },
);

vi.mock("@tanstack/react-query-next-experimental", () => ({
  ReactQueryStreamedHydration: (props: PropsWithChildren<{}>) => props.children,
}));

export const ResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());

beforeEach(() => {
  vi.spyOn(mixpanel, "init");
  vi.spyOn(mixpanel, "track");
  initializeMixpanelAndEnable();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

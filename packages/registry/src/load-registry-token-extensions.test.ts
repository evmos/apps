// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, expect, it } from "vitest";

import { sleep } from "helpers/src/sleep";
import { loadRegistryTokenExtensions } from "./load-registry-token-extensions";

describe("loadRegistryTokenExtensions", () => {
  it("should load local registry extensions", async () => {
    const tokens = await loadRegistryTokenExtensions();

    expect(tokens.length).toBeGreaterThan(0);

    await sleep(1000);
  });
});

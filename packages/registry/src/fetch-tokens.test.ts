// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, expect, it } from "vitest";

import { fetchTokens } from "./fetch-tokens";
import { sleep } from "helpers/src/sleep";

describe("fetchTokens", () => {
  it("should fetch tokens", async () => {
    const { tokens } = await fetchTokens();

    expect(tokens.length).toBeGreaterThan(0);

    await sleep(1000);
  });
});

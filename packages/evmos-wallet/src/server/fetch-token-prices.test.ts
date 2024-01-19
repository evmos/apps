// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, test, expect } from "vitest";
import { fetchTokenPrices } from "./fetch-token-prices.server";

describe("fetch-token-prices", ({}) => {
  test("should fetch token prices", async ({}) => {
    const prices = await fetchTokenPrices();

    expect(prices).toBeDefined();
  });
});

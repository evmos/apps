// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, test, expect } from "vitest";
import { multiply } from ".";

describe("bigint", () => {
  test("multiply", () => {
    expect(multiply(2n, 2n)).toBe(4n);
    expect(multiply(2n, 2)).toBe(4n);
    expect(multiply(2n, "2")).toBe(4n);
    expect(multiply(2n, "2.5")).toBe(5n);
    expect(multiply(10n, "0.5")).toBe(5n);
    expect(multiply(10n, "0.1")).toBe(1n);
    expect(multiply(100000000000n, "0.03")).toBe(3000000000n);
  });
});

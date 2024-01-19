// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { describe, expect, it } from "vitest";
import {
  getEndDate,
  isEthereumAddressValid,
  isEvmosAddressValid,
} from "./helpers";

describe("Vesting UI helpers", () => {
  it("should return true and the end date formatted", () => {
    const date = "2023-05-01";
    const vestingDuration = "4-years";
    const msg = getEndDate(date, vestingDuration);
    expect(msg).toStrictEqual([true, "05/01/2027"]);
  });

  it("should return false and the end date formatted", () => {
    const date = undefined;
    const vestingDuration = "4-years";
    const msg = getEndDate(date, vestingDuration);
    expect(msg).toStrictEqual([false, ""]);
  });

  it("should return false - Evmos account with incorrect format", () => {
    const account = "evmos1c8wg";
    const address = isEvmosAddressValid(account);
    expect(address).toBe(false);
  });

  it("should return false - Hex account with incorrect format", () => {
    const account = "0x123";
    const address = isEthereumAddressValid(account);
    expect(address).toBe(false);
  });

  it("should return true - Hex account with correct format", () => {
    // eslint-disable-next-line no-secrets/no-secrets
    const account = "0x4b87B15f560a9b77BB9965c49862cfCe720c52Ab";
    const address = isEthereumAddressValid(account);
    expect(address).toBe(true);
  });

  it("should return true - Evmos account with correct format", () => {
    // eslint-disable-next-line no-secrets/no-secrets
    const account = "evmos1fwrmzh6kp2dh0wuevhzfsck0eeeqc54tpvkvc2";
    const address = isEvmosAddressValid(account);
    expect(address).toBe(true);
  });
});

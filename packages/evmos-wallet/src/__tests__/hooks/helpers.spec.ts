import { describe, expect, it } from "vitest";
import {
  getBalance,
  getBalanceInDollars,
  getNumberBalance,
  getNumberBalanceInDollars,
} from "../../hooks/rewards/helpers";
import { BigNumber } from "ethers";

describe("Test Helpers for getting balances", () => {
  it("should return unavailable balance for zero balance (formatted)", () => {
    const balance = getBalance(BigNumber.from("0"), false);
    expect(balance).toBe("-");
  });

  it("should return zero balance (formatted) for zero balance (unformatted)", () => {
    const balance = getBalance(BigNumber.from("0"), true);
    expect(balance).toBe("0");
  });

  it("should return formatted balance for non-zero balance", () => {
    const balance = getBalance(BigNumber.from("3000000000000000000"), true);
    expect(balance).toBe("3.00");
  });

  it("should return unavailable balance in dollars for zero balance (formatted)", () => {
    const balance = getBalanceInDollars(BigNumber.from("0"), false, "0.08");
    expect(balance).toBe("-");
  });

  it("should return zero dollars balance (formatted) for zero dollars balance (unformatted)", () => {
    const balance = getBalanceInDollars(BigNumber.from("0"), true, "0.08");
    expect(balance).toBe("0");
  });

  it("should return formatted dollars balance for non-zero dollars balance", () => {
    const balance = getBalanceInDollars(
      BigNumber.from("3000000000000000000"),
      true,
      "0.08"
    );
    expect(balance).toBe("0.24");
  });

  it("should return zero dollars balance (formatted) for string evmos price (unformatted)", () => {
    const balance = getBalanceInDollars(BigNumber.from("0"), true, "--");
    expect(balance).toBe("0");
  });

  it("should return unavailable balance for zero balance (number - formatted)", () => {
    const balance = getNumberBalance(0, false);
    expect(balance).toBe("-");
  });

  it("should return zero balance (formatted) for zero balance (number - unformatted)", () => {
    const balance = getNumberBalance(0, true);
    expect(balance).toBe("0");
  });

  it("should return formatted balance for non-zero balance (number)", () => {
    const balance = getNumberBalance(3, true);
    expect(balance).toBe("3.00");
  });

  it("should return unavailable balance in dollars for zero balance (number - formatted)", () => {
    const balance = getNumberBalanceInDollars(0, false, "0.08");
    expect(balance).toBe("-");
  });

  it("should return zero dollars balance (formatted) for zero dollars balance (number - unformatted)", () => {
    const balance = getNumberBalanceInDollars(0, true, "0.08");
    expect(balance).toBe("0");
  });

  it("should return zero dollars balance (formatted) for string evmos price (number - unformatted", () => {
    const balance = getNumberBalanceInDollars(0, true, "--");
    expect(balance).toBe("0");
  });

  it("should return formatted dollars balance for non-zero dollars balance (number)", () => {
    const balance = getNumberBalanceInDollars(3, true, "0.08");
    expect(balance).toBe("0.24");
  });
});

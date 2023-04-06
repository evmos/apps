import { BigNumber } from "ethers";

export function getChainIdentifier(identifier: string) {
  if (identifier === "cosmoshub") {
    return "Cosmos Hub";
  }
  return identifier;
}

export const FEE_STAKING_ACTIONS = "8049999999999999";
export const feeWithdraw = BigNumber.from("4600000000000000");
export const FULL_DAY_MINUS_ONE_SECOND = 86399000;
export const feeVote = BigNumber.from("6250000000000000");

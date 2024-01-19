// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ics20Abi, stakingAbi } from "@evmosapps/registry/src/abi";
import { erc20Abi } from "viem";

const ABI = {
  ics20: ics20Abi,
  staking: stakingAbi,
  erc20: erc20Abi,
} as const;

type ABIKey = keyof typeof ABI;
export function getAbi<T extends ABIKey>(abiKey: T) {
  return ABI[abiKey];
}

export const ICS20_ADDRESS = "0x0000000000000000000000000000000000000802";

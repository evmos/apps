// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getAddress, isAddress } from "viem";
import { HexAddress } from "./types";

export const isValidHexAddress = (address: unknown): address is HexAddress => {
  return (
    typeof address === "string" &&
    isAddress(address) && // basic regex hex and length check
    getAddress(address) === address // checksum check -> https://eips.ethereum.org/EIPS/eip-55
  );
};

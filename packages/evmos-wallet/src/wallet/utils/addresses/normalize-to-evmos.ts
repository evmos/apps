// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isHex } from "viem";
import { ethToEvmos } from "./eth-to-evmos";
import { CosmosAddress } from "./types";

/**
 * Normalizes an address to an Evmos address with the "evmos" prefix.
 * If the address is already an Evmos address with the "evmos" prefix, it is returned as is.
 * If the address is a hexadecimal address, it is converted to an Evmos address with the "evmos" prefix.
 * @param address - The address to normalize.
 * @returns The normalized Cosmos address with the "evmos" prefix.
 */

export const normalizeToEvmos = (
  // address: Address<"evmos"> | HexAddress,
  address: string,
) => {
  return isHex(address)
    ? ethToEvmos(address)
    : (address as CosmosAddress<"evmos">);
};

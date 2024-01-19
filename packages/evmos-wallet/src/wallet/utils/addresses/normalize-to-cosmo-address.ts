// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isHex } from "viem";
import { ethToEvmos } from "./eth-to-evmos";
import { Address, HexAddress, CosmosAddress } from "./types";

/**
 * Normalizes an address to a Cosmo address.
 * @param address - The address to normalize.
 * @returns The normalized Cosmos address
 */

export const normalizeToCosmosAddress = <T extends Address>(
  address: T,
): T extends HexAddress ? CosmosAddress<"evmos"> : T => {
  if (isHex(address)) {
    return ethToEvmos(address) as never; // <- nasty hack to allow for conditional return type
  }
  return address as never;
};

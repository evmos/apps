// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { isHex } from "viem";
import { evmosToEth } from "./evmos-to-eth";
import { HexAddress } from "./types";

/**
 * Normalizes an address to an Ethereum address.
 * If the address is already a hexadecimal address, it is returned as is.
 * If the address is an Evmos address, it is converted to an Ethereum address.
 * @param address - The address to normalize.
 * @returns The normalized Ethereum address.
 */

export const normalizeToEth = (address: string): HexAddress => {
  return isHex(address) ? address : evmosToEth(address as never);
};

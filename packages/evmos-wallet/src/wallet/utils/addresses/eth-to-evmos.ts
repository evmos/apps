// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { bech32 } from "bech32";
import { HexAddress, CosmosAddress } from "./types";

/**
 * Converts an Ethereum address to an Evmos address.
 * @param address - The Ethereum address to convert.
 * @returns The Cosmos address.
 */

export const ethToEvmos = (address: HexAddress): CosmosAddress<"evmos"> => {
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return bech32.encode("evmos", words) as CosmosAddress<"evmos">;
};

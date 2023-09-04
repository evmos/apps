import { bech32 } from "bech32";

import { getAddress } from "viem";
import { isValidCosmosAddress } from "./is-valid-cosmos-address";
import { CosmosAddress, HexAddress } from "../types";

/**
 * Converts an Evmos address to an Ethereum address.
 * @param address - The Cosmos address to convert.
 * @returns The Ethereum address.
 *
 *
 * Side Note: Why am I recreating this function if this is provided by @evmos/evmosjs?
 * Because I wanted to make it simpler and typesafe, my idea is to later port this to @evmos/evmosjs.
 */

export const evmosToEth = (address: CosmosAddress): HexAddress => {
  if (!isValidCosmosAddress(address)) {
    throw new Error("Invalid address");
  }
  const { words } = bech32.decode(address);
  return getAddress(
    `0x${Buffer.from(bech32.fromWords(words)).toString("hex")}`
  );
};

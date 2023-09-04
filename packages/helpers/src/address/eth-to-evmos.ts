import { bech32 } from "bech32";
import { CosmosAddress, HexAddress } from "../types";

/**
 * Converts an Ethereum address to an Evmos address.
 * @param address - The Ethereum address to convert.
 * @returns The Cosmos address.
 *
 * Side Note: Why am I recreating this function if this is provided by @evmos/evmosjs?
 * Because I wanted to make it simpler and typesafe, my idea is to later port this to @evmos/evmosjs.
 */

export const ethToEvmos = (address: HexAddress): CosmosAddress => {
  const words = bech32.toWords(Buffer.from(address.slice(2), "hex"));
  return bech32.encode("evmos", words) as CosmosAddress;
};

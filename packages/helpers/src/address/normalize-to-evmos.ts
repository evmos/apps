import { isHex } from "viem";
import { ethToEvmos } from "./eth-to-evmos";
import { Address, CosmosAddress } from "../types";

/**
 * Normalizes an address to an Evmos address with the "evmos" prefix.
 * If the address is already an Evmos address with the "evmos" prefix, it is returned as is.
 * If the address is a hexadecimal address, it is converted to an Evmos address with the "evmos" prefix.
 * @param address - The address to normalize.
 * @returns The normalized Cosmos address with the "evmos" prefix.
 */

export const normalizeToEvmos = (address: Address): CosmosAddress => {
  return isHex(address) ? ethToEvmos(address) : address;
};

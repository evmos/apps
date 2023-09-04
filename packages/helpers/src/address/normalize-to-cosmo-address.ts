import { ethToEvmos } from "./eth-to-evmos";
import { Address, CosmosAddress } from "../types";
import { isValidHexAddress } from "./is-valid-hex-address";

/**
 * Normalizes an address to a Cosmo address.
 * @param address - The address to normalize.
 * @returns The normalized Cosmos address
 */

export const normalizeToCosmosAddress = (address: Address): CosmosAddress => {
  if (isValidHexAddress(address)) {
    return ethToEvmos(address);
  }
  return address;
};

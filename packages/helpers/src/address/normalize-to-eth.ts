import { isHex } from "viem";
import { evmosToEth } from "./evmos-to-eth";
import { Address, HexAddress } from "../types";

/**
 * Normalizes an address to an Ethereum address.
 * If the address is already a hexadecimal address, it is returned as is.
 * If the address is an Evmos address, it is converted to an Ethereum address.
 * @param address - The address to normalize.
 * @returns The normalized Ethereum address.
 */

export const normalizeToEth = (address: Address): HexAddress => {
  return isHex(address) ? address : evmosToEth(address);
};

import { getAddress, isAddress } from "viem";
import { HexAddress } from "../types";

export const isValidHexAddress = (address: string): address is HexAddress => {
  return (
    isAddress(address) && // basic regex hex and length check
    getAddress(address) === address // checksum check -> https://eips.ethereum.org/EIPS/eip-55
  );
};

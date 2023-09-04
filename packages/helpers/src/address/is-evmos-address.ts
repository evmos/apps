import { bech32 } from "bech32";
import { CosmosAddress } from "../types";

export const isValidCosmosAddress = (
  address: string,
  expectedPrefix?: string
): address is CosmosAddress => {
  try {
    const { prefix, words } = bech32.decode(address);
    if (expectedPrefix && prefix !== expectedPrefix) {
      return false;
    }
    const size = bech32.fromWords(words).length;
    if (size !== 20 && size !== 32) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

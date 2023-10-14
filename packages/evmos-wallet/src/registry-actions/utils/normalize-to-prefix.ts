import { getPrefix } from "../../wallet/utils/addresses/get-prefix";
import { isValidCosmosAddress } from "../../wallet/utils/addresses/is-valid-cosmos-address";
import { isValidHexAddress } from "../../wallet/utils/addresses/is-valid-hex-address";
import { Address } from "../../wallet/utils/addresses/types";
import { Prefix } from "../types";
export type Prefixish = Address<Prefix> | Prefix;

export const normalizeToPrefix = (address: Prefixish) => {
  if (isValidHexAddress(address) || isValidCosmosAddress(address)) {
    return getPrefix(address);
  }
  return address;
};

import { Address } from "../types";

export const getAddressPrefix = (address: string): string => {
  if (address.startsWith("0x")) {
    return "0x";
  }
  return address.split("1")[0];
};

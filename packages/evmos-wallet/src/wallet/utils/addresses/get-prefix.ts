// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Prefix } from "../../../registry-actions/types";
import { Address, CosmosAddress } from "./types";

export const getPrefix = <T extends Address<Prefix>>(
  address: T,
): T extends CosmosAddress<infer U> ? U : "evmos" => {
  if (address.startsWith("0x")) {
    return "evmos" as never;
  }
  return address.split("1")[0] as never;
};

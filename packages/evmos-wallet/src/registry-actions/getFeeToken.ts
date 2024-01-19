// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "../wallet";
import { Prefix } from "./types";
import { getToken } from "./get-token";
import { getChain } from "./get-chain";

export const getFeeToken = (address: Prefix | Address<Prefix>) => {
  const { prefix, feeToken } = getChain(address);
  return getToken(prefix, feeToken)!;
};

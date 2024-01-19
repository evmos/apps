// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  Prefix,
  TokenRef,
} from "@evmosapps/evmos-wallet/src/registry-actions/types";
import { sortedChains } from "./sortedChains";
import { getTokenByRef } from "@evmosapps/evmos-wallet/src/registry-actions/get-token-by-ref";

export const getTokenValidDestinations = (
  tokenRef: TokenRef,
  network: Prefix
): Prefix[] => {
  // If asset is being held on an EVMOS ACCOUNT
  if (network === "evmos") {
    // if it's an EVMOS NATIVE TOKEN it can go anywhere
    const token = getTokenByRef(tokenRef);
    if (token.sourcePrefix === "evmos") return sortedChains;
    // if it's NOT native to Evmos,than it can go to:
    // - other evmos accounts
    // - its native network

    return ["evmos", token.sourcePrefix];
  }

  // if it's held somewhere else, it can only go to evmos
  return ["evmos"];
};

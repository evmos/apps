// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getChains } from "./get-chain";

const tokens = getChains().flatMap((chain) => {
  return [...chain.tokens];
});
export const getTokens = () => tokens;

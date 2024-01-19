// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TokenEntity } from "../autogen/token-entity";

export const loadRegistryTokenExtensions = async () => {
  const tokens = await import("./extend-registry/tokens");
  return Object.values(tokens) as unknown as TokenEntity[];
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";

export const fetchToken = async (denom: string) => {
  const { tokens } = await fetchTokens();

  return tokens.find((token) => token.coinDenom === denom) ?? null;
};

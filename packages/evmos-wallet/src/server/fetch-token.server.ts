"use server";
import { fetchTokens } from "@evmosapps/registry/src/fetch-tokens";

export const fetchToken = async (denom: string) => {
  const { tokens } = await fetchTokens();

  return tokens.find((token) => token.coinDenom === denom) ?? null;
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Token } from "../types";
import { getIBCDenom } from "./get-ibc-denom";
import { getTokens } from "../get-tokens";
import { getChains } from "../get-chain";

export const IBC_DENOMS_MAP: Record<string, Token> = {};
const chains = getChains();
const evmos = chains.find(({ prefix }) => prefix === "evmos")!;
const others = chains.filter(({ prefix }) => prefix !== "evmos");
/**
 * Evmos tokens in other networks
 */
for (const token of evmos.tokens) {
  for (const chain of Object.values(others)) {
    const ibcDenom = getIBCDenom({
      sender: chain.prefix,
      receiver: "evmos",
      token,
    });
    IBC_DENOMS_MAP[ibcDenom] = token;
  }
}

/**
 * other networks tokens in Evmos
 */
for (const chain of Object.values(others)) {
  for (const token of chain.tokens) {
    const ibcDenom = getIBCDenom({
      sender: "evmos",
      receiver: chain.prefix,
      token,
    });
    IBC_DENOMS_MAP[ibcDenom] = token;
  }
}

export const findToken = ({
  prefix,
  denom,
}: {
  prefix?: string;
  denom: string;
}) => {
  if (denom.startsWith("ibc/")) {
    return IBC_DENOMS_MAP[denom] ?? null;
  }
  const token = getTokens().find(
    ({ minCoinDenom, sourceDenom, denom: tokenDenom, sourcePrefix }) => {
      if (prefix && prefix !== sourcePrefix) return false;
      return (
        minCoinDenom === denom || tokenDenom === denom || sourceDenom === denom
      );
    },
  );
  return token ?? null;
};

import { chains } from "@evmos-apps/registry";
import { Token, TokenMinDenom } from "../types";
import { getIBCDenom } from "./get-ibc-denom";
import { getTokens } from "../get-tokens";

export const IBC_DENOMS_MAP: Record<string, Token> = {};
const { evmos, ...others } = chains;
/**
 * Evmos tokens in other networks
 */
for (const token of evmos.tokens) {
  for (const chain of Object.values(others)) {
    let ibcDenom = getIBCDenom({
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
    let ibcDenom = getIBCDenom({
      sender: "evmos",
      receiver: chain.prefix,
      token,
    });
    IBC_DENOMS_MAP[ibcDenom] = token;
  }
}

export const normalizeToMinDenom = (denom: string) => {
  if (denom.startsWith("ibc/")) {
    return IBC_DENOMS_MAP[denom].minCoinDenom ?? null;
  }
  const token = getTokens().find(
    ({ minCoinDenom, denom: tokenDenom }) =>
      minCoinDenom === denom || tokenDenom === denom,
  );
  return token?.minCoinDenom ?? null;
};

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

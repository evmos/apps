// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Token, TokenByRef, TokenRef } from "./types";
import { getChains } from "./get-chain";

const TOKEN_BY_REF = Object.fromEntries(
  getChains().flatMap((chain) =>
    chain.tokens.map((token) => [token.ref, token]),
  ),
) as TokenByRef;

export function getTokenByRef<T extends TokenRef>(ref: T): TokenByRef[T];
export function getTokenByRef(ref: string): Token | null;
export function getTokenByRef(ref: string): Token | null {
  return TOKEN_BY_REF[ref as keyof TokenByRef] ?? null;
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { txStatusError } from "../../../notification/transactionsTypes";
import {
  EVMOS_BACKEND,
  EVMOS_MINIMAL_COIN_DENOM,
  EVMOS_SYMBOL,
} from "./networkConfig";

import { BalanceResponse } from "./types";

export async function fetchWithTimeout(
  resource: string,
  options: RequestInit & { timeout?: number } = {},
) {
  const { timeout = 6 * 1000 } = options;
  const abortController = new AbortController();
  const id = setTimeout(() => abortController.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: abortController.signal,
  });
  clearTimeout(id);
  return response;
}

export const getEvmosBalance = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { balance: { denom: "", amount: "" } };
  }
  const res = await fetch(
    `${EVMOS_BACKEND}/BalanceByDenom/${EVMOS_SYMBOL}/${address}/${EVMOS_MINIMAL_COIN_DENOM}`,
  );
  return res.json() as Promise<BalanceResponse | txStatusError>;
};

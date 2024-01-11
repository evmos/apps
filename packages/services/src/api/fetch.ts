// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { TotalStakedResponse } from "./types";

const EVMOS_BACKEND =
  process.env.NEXT_PUBLIC_EVMOS_BACKEND || "https://goapi.evmos.org";
const EVMOS_SYMBOL = "EVMOS";

export const getTotalStaked = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { value: "0" };
  }
  const res = await fetch(`${EVMOS_BACKEND}/totalStakedByAddress/${address}`);
  return res.json() as Promise<TotalStakedResponse>;
};

export const getEpochs = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/Epochs/${EVMOS_SYMBOL}`);
  return res.json();
};

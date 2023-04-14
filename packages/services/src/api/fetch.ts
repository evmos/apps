import { TotalStakedResponse } from "./types";

const EVMOS_BACKEND = "https://goapi.evmos.org";
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

export const getRemainingEpochs = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/RemainingEpochs`);
  return res.json();
};

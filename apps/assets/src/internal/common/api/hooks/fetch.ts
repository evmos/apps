import { EVMOS_BACKEND, EVMOS_SYMBOL } from "evmos-wallet";

export type TotalStakedResponse = {
  value: string;
};
export const getTotalStaked = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return { value: "0" };
  }
  const res = await fetch(`${EVMOS_BACKEND}/totalStakedByAddress/${address}`);
  return res.json() as Promise<TotalStakedResponse>;
};

type Epochs = {
  current_epoch: string;
  current_epoch_start_height: string;
  current_epoch_start_time: string;
  duration: string;
  epoch_counting_started: boolean;
  identifier: string;
  start_time: string;
};

export type EpochsResponse = {
  epochs: Epochs[];
  pagination: {
    next_key: string | null;
    total: string;
  };
};

export type RemainingEpochsResponse = {
  remainingEpochs: number;
};

export const getEpochs = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/Epochs/${EVMOS_SYMBOL}`);
  return res.json();
};

export const getRemainingEpochs = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/RemainingEpochs`);
  return res.json();
};

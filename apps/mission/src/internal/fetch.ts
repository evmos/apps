import { EVMOS_BACKEND, EVMOS_SYMBOL } from "evmos-wallet";
import {
  AnnouncementsResponse,
  ERC20BalanceResponse,
  StakingInfoResponse,
  V1Proposals,
} from "./types";

export const getAnnouncements = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/Announcements`);
  return res.json() as Promise<AnnouncementsResponse>;
};

export const getStakingInfo = async (address: string) => {
  if (address === "" || address == undefined || address == null) {
    return {
      delegations: [],
      undelegations: [],
      rewards: { rewards: [], total: [] },
    };
  }
  const res = await fetch(`${EVMOS_BACKEND}/stakingInfo/${address}`);
  return res.json() as Promise<StakingInfoResponse>;
};

export const getAssets = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/ERC20ModuleBalance`);
  return res.json() as Promise<ERC20BalanceResponse>;
};

export const getAssetsForAddress = async (
  address: string,
  hexAddress: string
) => {
  // If not wallet selected return everything empty
  if (address === "" || hexAddress === "") {
    return getAssets();
  }

  const res = await fetch(
    `${EVMOS_BACKEND}/ERC20ModuleBalance/${address}/${hexAddress}`
  );
  return res.json() as Promise<ERC20BalanceResponse>;
};

export const getProposals = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/V1Proposals`);
  return res.json() as Promise<V1Proposals>;
};

export type TotalStakedResponse = {
  value: string;
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

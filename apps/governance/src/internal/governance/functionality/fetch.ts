// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// import { EVMOS_BACKEND } from "evmos-wallet";
import { V1Proposals, VoteResponse } from "./types";
const EVMOS_BACKEND = "https://goapi.evmos.org";
export const getProposals = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/V1Proposals`);
  return res.json() as Promise<V1Proposals>;
};

export const getVoteRecord = async (id: string, address: string) => {
  if (
    address === "" ||
    address == undefined ||
    address == null ||
    id === "" ||
    id == undefined ||
    id == null
  ) {
    return { vote: { proposal_id: "", voter: "", option: "", options: [] } };
  }

  const res = await fetch(
    `${EVMOS_BACKEND}/VoteRecord/EVMOS/${Number(id)}/${address}`
  );
  return res.json() as Promise<VoteResponse>;
};

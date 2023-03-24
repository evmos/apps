import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";
import { V1Proposals, VoteResponse } from "./types";

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
    return { vote: { proposal_id: "", voter: "", options: [] } };
  }

  const res = await fetch(
    `${EVMOS_BACKEND}/VoteRecord/EVMOS/${Number(
      id
    )}/evmos1wrmxs8mknurxmefa3qwt8ptk6qxk3s7hn3vypn`
  );
  return res.json() as Promise<VoteResponse>;
};

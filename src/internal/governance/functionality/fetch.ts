import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";
import { Proposal } from "./types";

export const getProposals = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/V1Proposals`);
  return res.json() as Promise<Proposal[]>;
};

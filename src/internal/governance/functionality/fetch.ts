import {
  EVMOS_BACKEND,
  EVMOS_SYMBOL,
} from "../../wallet/functionality/networkConfig";
import { Proposal, Tallying } from "./types";

export const getProposals = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/V1Proposals`);
  return res.json() as Promise<Proposal[]>;
};

export const getTallying = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/Tallying/${EVMOS_SYMBOL}`);
  return res.json() as Promise<Tallying>;
};

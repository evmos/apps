import { EVMOS_BACKEND } from "../../wallet/functionality/networkConfig";
import { V1Proposals } from "./types";

export const getProposals = async () => {
  const res = await fetch(`${EVMOS_BACKEND}/V1Proposals`);
  return res.json() as Promise<V1Proposals>;
};

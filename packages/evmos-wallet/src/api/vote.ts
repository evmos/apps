import { ApiPresignTxSchema } from "../utils/validation/api-presign-tx-schema";
import { makeApiRequester } from "./utils";

export const apiVote = makeApiRequester(
  "/vote",
  ({
    pubkey,
    address,
    id,
    option,
  }: {
    pubkey: string;
    address: string;
    id: string;
    option: number;
  }) => ({
    transaction: {
      pubKey: pubkey,
      sender: address,
      gas: 0,
    },
    message: {
      proposalId: Number(id),
      // 0: empty, 1: yes, 2: abstain, 3: no, 4: no with veto
      option: option,
    },
  }),
  ApiPresignTxSchema
);

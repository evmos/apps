import { ApiPresignTxSchema } from "../utils/validation/api-presign-tx-schema";
import { makeApiRequester } from "./utils";

interface IBCChainParams {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  dstChain: string;
  token: string;
  gas?: number;
}

export const apiIBCTransfer = makeApiRequester(
  "/ibcTransfer",
  ({
    pubkey,
    address,
    params,
    useERC20Denom = true,
  }: {
    pubkey: string;
    address: string;
    params: IBCChainParams;
    useERC20Denom?: boolean;
  }) => ({
    transaction: {
      pubKey: pubkey,
      sender: address,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      dstChain: params.dstChain.toUpperCase(),
      sender: params.sender,
      receiver: params.receiver,
      amount: params.amount,
      token: params.token,
      useERC20Denom,
    },
  }),
  ApiPresignTxSchema
);

import { ApiPresignTxSchema } from "../utils/validation";
import { makeApiRequester } from "./utils";

export type ConvertMsg = {
  addressEth: string;
  addressCosmos: string;
  amount: string;
  srcChain: string;
  token: string;
};
export const apiConvertCoin = makeApiRequester(
  "/convertCoin",
  ({
    pubkey,
    address,
    params,
  }: {
    pubkey: string;
    address: string;
    params: ConvertMsg;
  }) => ({
    transaction: {
      pubKey: pubkey,
      sender: address,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      sender: params.addressCosmos,
      receiver: params.addressEth,
      amount: params.amount,
      token: params.token,
    },
  }),
  ApiPresignTxSchema
);

export const apiConvertERC20 = makeApiRequester(
  "/convertERC20",
  ({
    pubkey,
    address,
    params,
  }: {
    pubkey: string;
    address: string;
    params: ConvertMsg;
  }) => ({
    transaction: {
      pubKey: pubkey,
      sender: address,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      sender: params.addressCosmos,
      receiver: params.addressEth,
      amount: params.amount,
      token: params.token,
    },
  }),
  ApiPresignTxSchema
);

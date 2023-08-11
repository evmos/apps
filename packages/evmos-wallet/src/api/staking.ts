import { ApiPresignTxSchema } from "../utils";
import { makeApiRequester } from "./utils/makeApiRequester";

export const apiStakingDelegate = makeApiRequester(
  "/delegate",
  (params: {
    pubkey: string;
    address: string;
    validatorAddress: string;
    amount: string;
  }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
    message: {
      amount: params.amount,
      validatorAddress: params.validatorAddress,
    },
  }),
  ApiPresignTxSchema
);

export const apiStakingUndelegate = makeApiRequester(
  "/undelegate",
  (params: {
    pubkey: string;
    address: string;
    validatorAddress: string;
    amount: string;
  }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
    message: {
      amount: params.amount,
      validatorAddress: params.validatorAddress,
    },
  }),
  ApiPresignTxSchema
);

export const apiStakingCancelUndelegation = makeApiRequester(
  "/cancelUndelegation",
  (params: {
    pubkey: string;
    address: string;
    validatorAddress: string;
    amount: string;
    creationHeight: string;
  }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
    message: {
      amount: params.amount,
      validatorAddress: params.validatorAddress,
      creationHeight: params.creationHeight,
    },
  }),
  ApiPresignTxSchema
);

export const apiStakingRedelegate = makeApiRequester(
  "/redelegate",
  (params: {
    pubkey: string;
    address: string;
    amount: string;
    fromValidatorAddress: string;
    toValidatorAddress: string;
  }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
    message: {
      amount: params.amount,
      validatorAddress: params.fromValidatorAddress,
      validatorDstAddress: params.toValidatorAddress,
    },
  }),
  ApiPresignTxSchema
);

export const apiStakingRewards = makeApiRequester(
  "/rewards",
  (params: { pubkey: string; address: string }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
  }),
  ApiPresignTxSchema
);

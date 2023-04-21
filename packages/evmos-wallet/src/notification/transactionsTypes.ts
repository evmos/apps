// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

interface LegacyAmino {
  body: string;
  authInfo: string;
  signBytes: string;
}

interface SignDirect {
  body: string;
  authInfo: string;
  signBytes: string;
}

export type IBCTransferResponse = {
  eipToSign: string;
  legacyAmino: LegacyAmino;
  signDirect: SignDirect;
  accountNumber: string;
  chainId: string;
  explorerTxUrl: string;
  dataSigningAmino: string;
};

export interface Transaction {
  pubKey: string | null;
  sender: string;
}

export type ConvertMsg = {
  addressEth: string;
  addressCosmos: string;
  amount: string;
  srcChain: string;
  token: string;
};

export interface Message {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  token: string;
}

export interface TxConvert {
  transaction: Transaction;
  message: Message;
}

export interface IBCChainParams {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  dstChain: string;
  token: string;
  gas?: number;
}

interface MessageIBC {
  srcChain: string;
  dstChain: string;
  sender: string;
  receiver: string;
  amount: string;
  token: string;
}

export interface TransactionBody {
  transaction: Transaction;
  message: MessageIBC;
}

export interface executedTx {
  executed: boolean;
  msg: string;
}

type txResultData = {
  code: number;
};

type txResult = {
  tx_result: txResultData;
};

export type txStatusResponse = {
  result: txResult;
};

export enum TransactionStatus {
  UNCONFIRMED = -1,
  SUCCESS = 0,
  ERROR = 1,
}

export type txStatusError = {
  code: number;
};

export type txStatusErrorResponse = {
  error: txStatusError | string;
};

export type executeIBCTransferResponse = {
  error: boolean;
  message: string;
  title: string;
  txHash: string;
  explorerTxUrl: string;
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  Chain,
  createTxRawEIP712,
  Sender,
  signatureToWeb3Extension,
  TxGenerated,
} from "@evmos/transactions";
import { protoTxNamespace } from "@evmos/proto";
import {
  EVMOS_BACKEND,
  EVMOS_GRPC_URL,
  EVMOS_NETWORK_FOR_BACKEND,
} from "./networkConfig";
import { fetchWithTimeout } from "./fetch";
import {
  BroadcastMode,
  generateEndpointBroadcast,
  generatePostBodyBroadcast,
} from "@evmos/provider";
import { StdSignature, StdSignDoc } from "@keplr-wallet/types";

export declare type TxGeneratedByBackend = {
  signDirect: {
    body: string;
    authInfo: string;
    signBytes: string;
  };
  legacyAmino: {
    body: string;
    authInfo: string;
    signBytes: string;
  };
  eipToSign: string;
  accountNumber: string;
  chainId: string;
  dataSigningAmino: string;
};

export declare type RawTx = {
  message: protoTxNamespace.txn.TxRaw;
  path: string;
};

export function createEIP712Transaction(
  chain: Chain,
  sender: Sender,
  signature: string,
  tx: TxGenerated
) {
  // The chain and sender objects are the same as the previous example
  const extension = signatureToWeb3Extension(chain, sender, signature);

  // Create the txRaw
  return createTxRawEIP712(
    tx.legacyAmino.body,
    tx.legacyAmino.authInfo,
    extension
  );
}

interface BroadcastTxResponse {
  raw_log: string;
  tx_hash: string;
  code: string;
}

const headers = { "Content-Type": "application/json" };

export async function broadcastSignedTxToBackend(
  rawTx: {
    message: protoTxNamespace.txn.TxRaw;
    path: string;
  },
  _: string,
  network: string = EVMOS_NETWORK_FOR_BACKEND,
  endpoint: string = EVMOS_BACKEND
) {
  try {
    const bodyString = `{ "tx_bytes": [${rawTx.message
      .serializeBinary()
      .toString()}], "network": "${network}" }`;

    const postOptions = {
      method: "POST",
      headers,
      body: bodyString,
    };

    const broadcastPost = await fetchWithTimeout(
      `${endpoint}/v2/tx/broadcast`,
      postOptions
    );
    const response = (await broadcastPost.json()) as BroadcastTxResponse;

    if (response.code !== "0") {
      return {
        error: true,
        message: `Transaction Failed ${response.raw_log}`,
        txhash: `0x0`,
      };
    }

    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_hash,
    };
  } catch (e) {
    return {
      error: true,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    };
  }
}

type BroadcastToGRPCResponse = {
  tx_response: {
    code: number;
    raw_log: string;
    txhash: string;
  };
};

export async function broadcastSignedTxToGRPC(
  rawTx: {
    message: protoTxNamespace.txn.TxRaw;
    path: string;
  },
  grpcEndpoint: string = EVMOS_GRPC_URL
) {
  const postOptions = {
    method: "POST",
    headers,
    body: generatePostBodyBroadcast(rawTx, BroadcastMode.Sync),
  };

  try {
    const broadcastPost = await fetch(
      `${grpcEndpoint}${generateEndpointBroadcast()}`,
      postOptions
    );
    const response = (await broadcastPost.json()) as BroadcastToGRPCResponse;

    // Error
    if (response.tx_response.code !== 0) {
      return {
        error: true,
        message: `Transaction Failed ${response.tx_response.raw_log}`,
        txhash: `0x0`,
      };
    }

    // Success
    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_response.txhash,
    };
  } catch (e) {
    return {
      error: true,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    };
  }
}

interface BroadcastEip712Response {
  error: string;
  tx_hash: string;
}

export async function broadcastEip712BackendTxToBackend(
  chainId: number,
  feePayer: string,
  feePayerSig: string,
  body: string,
  authInfo: string,
  endpoint: string = EVMOS_BACKEND
) {
  try {
    const txBody = {
      chainId: chainId,
      feePayer: feePayer,
      feePayerSig: feePayerSig,
      body: body,
      authInfo: authInfo,
    };

    const postBroadcast = await fetchWithTimeout(
      `${endpoint}/broadcastEip712`,
      {
        method: "post",
        body: JSON.stringify(txBody),
        headers,
      }
    );

    const response = (await postBroadcast.json()) as BroadcastEip712Response;
    if (response.error) {
      return {
        error: true,
        message: `Transaction Failed ${response.error}`,
        txhash: `0x0`,
      };
    }

    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_hash,
    };
  } catch (e) {
    return {
      error: true,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    };
  }
}

interface BroadcastAminoResponse {
  tx_hash: string;
  raw_log: string;
  code: string;
}

export async function broadcastAminoBackendTxToBackend(
  signature: StdSignature,
  signed: StdSignDoc,
  chainIdentifier: string,
  endpoint: string = EVMOS_BACKEND
) {
  try {
    const txBody = {
      signature: signature,
      signed: signed,
      network: chainIdentifier.toUpperCase(),
    };

    const postBroadcast = await fetchWithTimeout(
      `${endpoint}/v2/tx/amino/broadcast`,
      {
        method: "post",
        body: JSON.stringify(txBody),
        headers,
      }
    );

    const response = (await postBroadcast.json()) as BroadcastAminoResponse;
    if (response.code !== "0") {
      return {
        error: true,
        message: `Transaction Failed ${response.raw_log}`,
        txhash: `0x0`,
      };
    }

    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_hash,
    };
  } catch (e) {
    return {
      error: true,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    };
  }
}

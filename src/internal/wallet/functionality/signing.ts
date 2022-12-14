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

export interface TxGeneratedByBackend {
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
}

export async function createEIP712Transaction(
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

export async function broadcastEvmosjsSignedTxToBackend(
  rawTx: {
    message: protoTxNamespace.txn.TxRaw;
    path: string;
  },
  sender: Sender,
  endpoint: string = EVMOS_BACKEND,
  network: string = EVMOS_NETWORK_FOR_BACKEND
) {
  try {
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{ "txBytes": [${rawTx.message
        .serializeBinary()
        .toString()}], "sender": "${
        sender.accountAddress
      }", "network": "${network}" }`,
    };
    const broadcastPost = await fetchWithTimeout(
      `${endpoint}/broadcast`,
      postOptions
    );
    const response = await broadcastPost.json();

    if (response.error) {
      return Promise.reject({
        error: true,
        message: `Transaction Failed ${response.error}`,
        txhash: `0x0`,
      });
    }

    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_hash,
    };
  } catch (e: any) {
    return Promise.reject({
      error: true,
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    });
  }
}

export async function broadcastEvmosjsSignedTxToGRPC(
  rawTx: {
    message: protoTxNamespace.txn.TxRaw;
    path: string;
  },
  grpcEndpoint: string = EVMOS_GRPC_URL
) {
  const postOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: generatePostBodyBroadcast(rawTx, BroadcastMode.Sync),
  };

  try {
    const broadcastPost = await fetch(
      `${grpcEndpoint}${generateEndpointBroadcast()}`,
      postOptions
    );
    const response = await broadcastPost.json();

    // Error
    if (response.tx_response.code !== 0) {
      return Promise.reject({
        error: true,
        message: `Transaction Failed ${response.tx_response.raw_log}`,
        txhash: `0x0`,
      });
    }

    // Success
    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_response.txhash,
    };
  } catch (e) {
    return Promise.reject({
      error: true,
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    });
  }
}

export async function broadcastEip712ToBackend(
  chainId: number,
  feePayer: string,
  feePayerSig: string,
  body: any,
  authInfo: any,
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
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = await postBroadcast.json();
    if (response.error) {
      return Promise.reject({
        error: true,
        message: `Transaction Failed ${response.error}`,
        txhash: `0x0`,
      });
    }

    return {
      error: false,
      message: `Transaction successful!`,
      txhash: response.tx_hash,
    };
  } catch (e) {
    return Promise.reject({
      error: true,
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    });
  }
}

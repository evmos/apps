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

type BroadcastToBackendResponse = {
  error: string;
  tx_hash: string;
};

export async function broadcastSignedTxToBackend(
  rawTx: {
    message: protoTxNamespace.txn.TxRaw;
    path: string;
  },
  sender: string,
  network: string = EVMOS_NETWORK_FOR_BACKEND,
  endpoint: string = EVMOS_BACKEND
) {
  try {
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{ "txBytes": [${rawTx.message
        .serializeBinary()
        .toString()}], "sender": "${sender}", "network": "${network}" }`,
    };
    const broadcastPost = await fetchWithTimeout(
      `${endpoint}/broadcast`,
      postOptions
    );
    const response = (await broadcastPost.json()) as BroadcastToBackendResponse;

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
    headers: { "Content-Type": "application/json" },
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
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    });
  }
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
        headers: { "Content-Type": "application/json" },
      }
    );

    const response = (await postBroadcast.json()) as BroadcastToBackendResponse;
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
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    });
  }
}

type PubKeySignature = {
  type: string;
  value: string;
};
type SignatureAmino = {
  pub_key: PubKeySignature;
  signature: string;
};

type FeeAmountSignedAmino = {
  denom: string;
  amount: string;
};
type FeeSignedAmino = {
  amount: readonly FeeAmountSignedAmino[];
  gas: string;
};

type TimeoutHeightSignedAmino = {
  revision_height: string;
  revision_number: string;
};

type TokenSignedAmino = {
  amount: string;
  denom: string;
};
type MsgsValueSignedAmino = {
  receiver: string;
  sender: string;
  source_channel: string;
  source_port: string;
  timeout_height: TimeoutHeightSignedAmino;
  timeout_timestamp: string;
  token: TokenSignedAmino;
};
type MsgsSignedAmino = {
  type: string;
  value: MsgsValueSignedAmino;
};

type SignedAmino = {
  account_number: string;
  chain_id: string;
  fee: FeeSignedAmino;
  memo: string;
  msgs: readonly MsgsSignedAmino[];
  sequence: string;
};

export async function broadcastAminoBackendTxToBackend(
  signature: SignatureAmino,
  signed: SignedAmino,
  chainIdentifier: string,
  endpoint: string = EVMOS_BACKEND
) {
  try {
    const txBody = {
      signature: signature,
      signed: signed,
      chainIdentifier: chainIdentifier.toUpperCase(),
    };

    const postBroadcast = await fetchWithTimeout(`${endpoint}/broadcastAmino`, {
      method: "post",
      body: JSON.stringify(txBody),
      headers: { "Content-Type": "application/json" },
    });

    const response = (await postBroadcast.json()) as BroadcastToBackendResponse;
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
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Transaction Failed ${e}`,
      txhash: `0x0`,
    });
  }
}

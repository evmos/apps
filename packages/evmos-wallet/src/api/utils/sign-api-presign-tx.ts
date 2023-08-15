import { ethToEvmos } from "@evmos/address-converter";
import { createTxRaw } from "@evmos/proto";
import { getAccount, getNetwork } from "@wagmi/core";
import { assertIf } from "helpers";
import {
  signTypedDataMessage,
  signKeplrDirect,
  getKeplrProvider,
  signKeplrAminoTransaction,
} from "../../wallet";
import {
  apiBroadcastAmino,
  apiBroadcastEip712,
  apiBroadcastRawTx,
} from "../broadcast";
import { ApiPresignTx } from "../../utils";

export async function signBackendTypedDataTransaction({
  typedData,
  legacyAmino,
}: ApiPresignTx) {
  const { address, connector } = getAccount();
  const { chain } = getNetwork();

  assertIf(
    chain && address && connector && typedData,
    "COULD_NOT_SIGN_TRANSACTION"
  );

  const signature = await signTypedDataMessage(typedData);

  return {
    signature,
    broadcast: () =>
      apiBroadcastEip712({
        chainId: chain.id,
        feePayer: ethToEvmos(address),
        feePayerSig: signature,
        body: legacyAmino.body,
        authInfo: legacyAmino.authInfo,
      }),
  } as const;
}

export async function signBackendDirectTransaction(transaction: ApiPresignTx) {
  const { address, connector } = getAccount();
  const { chain } = getNetwork();

  assertIf(chain && address && connector, "COULD_NOT_SIGN_TRANSACTION");

  assertIf(connector.id === "keplr", "UNSUPPORTED_SIGN_METHOD");

  const response = await signKeplrDirect({
    chainId: transaction.chainId,
    sender: ethToEvmos(address),
    body: transaction.directSignDoc,
  });

  return {
    signature: response.signature.signature,
    broadcast: () =>
      apiBroadcastRawTx({
        rawTx: createTxRaw(
          response.signed.bodyBytes,
          response.signed.authInfoBytes,
          [new Uint8Array(Buffer.from(response.signature.signature, "base64"))]
        ),
      }),
  } as const;
}

export async function signApiAminoTx(
  transaction: ApiPresignTx,
  network: string
) {
  const { address, connector } = getAccount();
  const { chain } = getNetwork();

  assertIf(chain && address && connector, "COULD_NOT_SIGN_TRANSACTION");

  assertIf(connector.id === "keplr", "UNSUPPORTED_SIGN_METHOD");

  const response = await signKeplrAminoTransaction(transaction.aminoSignDoc);
  response.signature;
  return {
    signature: response.signature.signature,
    broadcast: () =>
      apiBroadcastAmino({
        signature: response.signature,
        signed: response.signed,
        network,
      }),
  } as const;
}

export async function signApiPresignTx(presignedTx: ApiPresignTx) {
  const { address, connector } = getAccount();
  const { chain } = getNetwork();
  assertIf(chain && address && connector, "COULD_NOT_SIGN_TRANSACTION");
  /**
   * If the connector is keplr, we need to check if the key is a ledger key.
   * If it is, we need to sign the transaction as typed data
   */
  if (connector.id === "keplr") {
    const keplr = await getKeplrProvider();
    const key = await keplr.getKey(presignedTx.chainId);
    if (!key.isNanoLedger) return signBackendDirectTransaction(presignedTx);
  }
  return signBackendTypedDataTransaction(presignedTx);
}

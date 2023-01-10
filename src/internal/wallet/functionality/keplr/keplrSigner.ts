import { createTxRaw } from "@evmos/proto";
import { Sender, TxGenerated } from "@evmos/transactions";
// eslint-disable-next-line
import Long from "long";
import { KEPLR_ERRORS, KEPLR_NOTIFICATIONS } from "../errors";
import { TxGeneratedByBackend } from "../signing";

export async function signEvmosjsTxWithKeplr(
  sender: Sender,
  tx: TxGenerated,
  chainId: string
) {
  const body = {
    bodyBytes: tx.signDirect.body.serializeBinary(),
    authInfoBytes: tx.signDirect.authInfo.serializeBinary(),
    chainId,
    accountNumber: new Long(sender.accountNumber),
  };

  return signKeplr(sender.accountAddress, chainId, body);
}

export async function signBackendTxWithKeplr(
  sender: string,
  tx: TxGeneratedByBackend
) {
  const body = {
    bodyBytes: new Uint8Array(Buffer.from(tx.signDirect.body, "base64")),
    authInfoBytes: new Uint8Array(
      Buffer.from(tx.signDirect.authInfo, "base64")
    ),
    chainId: tx.chainId,
    accountNumber: new Long(Number(tx.accountNumber)),
  };
  return signKeplr(sender, tx.chainId, body);
}

export async function signKeplr(
  sender: string,
  chainId: string,
  body: {
    bodyBytes: Uint8Array;
    authInfoBytes: Uint8Array;
    chainId: string;
    accountNumber: Long.Long;
  }
) {
  if (!window.keplr) {
    return {
      result: false,
      message: `Error signing the tx: Keplr extension not found!`,
      transaction: null,
    };
  }
  try {
    const sign = await window.keplr.signDirect(chainId, sender, body);

    if (sign === undefined) {
      return {
        result: false,
        message: `Error signing the tx with keplr`,
        transaction: null,
      };
    }

    return {
      result: true,
      message: `Transaction correctly signed`,
      transaction: createTxRaw(
        sign.signed.bodyBytes,
        sign.signed.authInfoBytes,
        [new Uint8Array(Buffer.from(sign.signature.signature, "base64"))]
      ),
    };
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let msg = `Error signing the tx with keplr: ${e}`;
    if (
      (e as { message: string })?.message === KEPLR_ERRORS.RequestRejectedError
    ) {
      msg = KEPLR_NOTIFICATIONS.RequestRejectedSignSubtext;
    }
    return {
      result: false,
      // Disabled until catching all the possible errors
      message: msg,
      transaction: null,
    };
  }
}

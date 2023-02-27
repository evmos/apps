import { createTxRaw } from "@evmos/proto";
import { EIPToSign, Sender, TxGenerated } from "@evmos/transactions";
import { EthSignType, StdSignDoc } from "@keplr-wallet/types";
// eslint-disable-next-line
import Long from "long";
import { GENERATING_TX_NOTIFICATIONS } from "../../../asset/functionality/transactions/errors";
import { KEPLR_ERRORS, KEPLR_NOTIFICATIONS } from "../errors";
import { EVMOS_CHAIN } from "../networkConfig";
import { RawTx, TxGeneratedByBackend } from "../signing";

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

type KeplrReturn = {
  result: boolean;
  message: string;
  transaction: RawTx | null;
  signature: string | null;
};

export async function signBackendTxWithKeplr(
  sender: string,
  tx: TxGeneratedByBackend
) {
  if (!window.keplr) {
    return {
      result: false,
      message: `Error signing the tx: Keplr extension not found!`,
      transaction: null,
      signature: null,
    };
  }

  const key = await window.keplr.getKey(tx.chainId);
  if (key.isNanoLedger) {
    // Sign with eip712
    const eip712Res = await signKeplrEIP712(sender, tx.chainId, tx.eipToSign);
    const ret: KeplrReturn = {
      result: eip712Res.result,
      message: eip712Res.message,
      signature: eip712Res.signature,
      transaction: null,
    };
    return ret;
  }

  // Sign with proto
  const body = {
    bodyBytes: new Uint8Array(Buffer.from(tx.signDirect.body, "base64")),
    authInfoBytes: new Uint8Array(
      Buffer.from(tx.signDirect.authInfo, "base64")
    ),
    chainId: tx.chainId,
    accountNumber: new Long(Number(tx.accountNumber)),
  };
  const protoRes = await signKeplr(sender, tx.chainId, body);
  const ret: KeplrReturn = {
    result: protoRes.result,
    message: protoRes.message,
    signature: null,
    transaction: protoRes.transaction,
  };
  return ret;
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
    // Disabled until catching all the possible errors
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let msg = `Error signing the tx with keplr: ${e}`;
    // User rejected the action
    if (
      (e as { message: string })?.message === KEPLR_ERRORS.RequestRejectedError
    ) {
      msg = KEPLR_NOTIFICATIONS.RequestRejectedSignSubtext;
    }
    return {
      result: false,
      message: msg,
      transaction: null,
    };
  }
}

export async function signKeplrAmino(chainId: string, tx: StdSignDoc) {
  if (!window.keplr) {
    return {
      result: false,
      message: `Error signing the tx: Keplr extension not found!`,
      transaction: null,
    };
  }
  try {
    const offlineSigner =
      window.keplr.getOfflineSignerOnlyAmino &&
      window.keplr.getOfflineSignerOnlyAmino(chainId);

    if (offlineSigner === undefined) {
      // Error generating the transaction
      return {
        result: false,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        transaction: null,
      };
    }

    const account = await offlineSigner.getAccounts();
    if (account === undefined) {
      return {
        result: false,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        transaction: null,
      };
    }

    const sign = await offlineSigner.signAmino(account[0].address, tx);

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
      transaction: sign,
    };
  } catch (e) {
    // Disabled until catching all the possible errors
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let msg = `Error signing the tx with keplr: ${e}`;
    // User rejected the action
    if (
      (e as { message: string })?.message === KEPLR_ERRORS.RequestRejectedError
    ) {
      msg = KEPLR_NOTIFICATIONS.RequestRejectedSignSubtext;
    }
    return {
      result: false,
      message: msg,
      transaction: null,
    };
  }
}

export async function signKeplrEIP712(
  sender: string,
  chainId: string,
  tx: string
) {
  if (chainId !== EVMOS_CHAIN.cosmosChainId) {
    return {
      result: false,
      message: `Error signing the tx: EIP712 signing can only be used with Evmos!`,
      signature: null,
    };
  }
  if (!window.keplr) {
    return {
      result: false,
      message: `Error signing the tx: Keplr extension not found!`,
      signature: null,
    };
  }
  try {
    const eipToSignUTF8 = JSON.parse(
      Buffer.from(tx, "base64").toString("utf-8")
    ) as EIPToSign;

    eipToSignUTF8.domain.chainId = parseInt(
      eipToSignUTF8.domain.chainId.toString(),
      16
    );
    const sign = await window.keplr.signEthereum(
      chainId,
      sender,
      JSON.stringify(eipToSignUTF8),
      EthSignType.EIP712
    );

    if (sign === undefined) {
      return {
        result: false,
        message: `Error signing the tx with keplr`,
        signature: null,
      };
    }
    return {
      result: true,
      message: `Transaction correctly signed`,
      signature: Buffer.from(sign).toString("hex"),
    };
  } catch (e) {
    // Disabled until catching all the possible errors
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let msg = `Error signing the tx with keplr: ${e}`;
    // User rejected the action
    if (
      (e as { message: string })?.message === KEPLR_ERRORS.RequestRejectedError
    ) {
      msg = KEPLR_NOTIFICATIONS.RequestRejectedSignSubtext;
    }
    return {
      result: false,
      message: msg,
      signature: null,
    };
  }
}

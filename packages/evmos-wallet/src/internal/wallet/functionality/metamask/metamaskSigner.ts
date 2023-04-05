import { evmosToEth } from "@evmos/address-converter";
import { EIPToSign, Sender, TxGenerated } from "@evmos/transactions";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { METAMASK_ERRORS, METAMASK_NOTIFICATIONS } from "../errors";
import { EVMOS_CHAIN } from "../networkConfig";
import {
  createEIP712Transaction,
  RawTx,
  TxGeneratedByBackend,
} from "../signing";

export declare type EvmosjsTxSignatureResponse = {
  result: boolean;
  message: string;
  transaction: RawTx | null;
};

export declare type BackendTxSignatureResponse = {
  result: boolean;
  message: string;
  signature: string | null;
};

export async function signEvmosjsTxWithMetamask(
  sender: Sender,
  tx: TxGenerated
) {
  if (!window.ethereum)
    return {
      result: false,
      message: `Error signing the tx: Metamask extension not found!`,
      transaction: null,
    };

  try {
    const ethWallet = evmosToEth(sender.accountAddress);
    let signature = "";
    // NOTE: we need to convert the provider because wagmi dep is replacing our window type
    const extension = window.ethereum as unknown as MetaMaskInpageProvider;
    signature = (await extension.request({
      method: "eth_signTypedData_v4",
      params: [ethWallet, JSON.stringify(tx.eipToSign)],
    })) as string;
    const transaction = createEIP712Transaction(
      EVMOS_CHAIN,
      sender,
      signature,
      tx
    );
    return {
      result: true,
      message: "",
      transaction: transaction,
    };
  } catch (e) {
    // TODO: send custom responses for each of the knonw cases
    return {
      result: false,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Error signing the tx: ${e}`,
      transaction: null,
    };
  }
}

export async function signBackendTxWithMetamask(
  sender: string,
  tx: TxGeneratedByBackend
) {
  if (!window.ethereum)
    return {
      result: false,
      message: `Error signing the tx: Metamask extension not found!`,
      signature: null,
    };

  try {
    const ethWallet = evmosToEth(sender);
    const eipToSignUTF8 = JSON.parse(
      Buffer.from(tx.eipToSign, "base64").toString("utf-8")
    ) as EIPToSign;

    // NOTE: we need to convert the provider because wagmi dep is replacing our window type
    const extension = window.ethereum as unknown as MetaMaskInpageProvider;
    const signature = (await extension.request({
      method: "eth_signTypedData_v4",
      params: [ethWallet, JSON.stringify(eipToSignUTF8)],
    })) as string;

    return {
      result: true,
      message: "",
      signature: signature,
    };
  } catch (e) {
    // Disabled until catching all the possible errors
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    let msg = `Error signing the tx: ${e}`;
    // User rejected the action
    if (
      (e as { message: string })?.message === METAMASK_ERRORS.DeniedSignature
    ) {
      msg = METAMASK_NOTIFICATIONS.DeniedSignatureSubtext;
    }
    // Error while creating signature
    if ((e as { message: string })?.message === METAMASK_ERRORS.JsonParse) {
      msg = METAMASK_NOTIFICATIONS.EipToSignSubtext;
    }
    // User is not connected to Evmos network
    if ((e as { message: string })?.message === METAMASK_ERRORS.ProvidedChain) {
      msg = METAMASK_NOTIFICATIONS.ProvidedChainSubtext;
    }
    // TODO: send custom responses for each of the knonw cases
    return {
      result: false,
      message: msg,
      signature: null,
    };
  }
}

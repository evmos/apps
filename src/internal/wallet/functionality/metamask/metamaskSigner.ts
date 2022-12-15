import { evmosToEth } from "@evmos/address-converter";
import { Sender, TxGenerated } from "@evmos/transactions";
import { EVMOS_CHAIN } from "../networkConfig";
import {
  createEIP712Transaction,
  RawTx,
  TxGeneratedByBackend,
} from "../signing";

export declare type EvmosjsTxSignatureResponse = {
  result: boolean;
  message: string;
  transaction: RawTx | undefined;
};

export declare type BackendTxSignatureResponse = {
  result: boolean;
  message: string;
  signature: string | undefined;
};

export async function signEvmosjsTxWithMetamask(
  sender: Sender,
  tx: TxGenerated
) {
  if (!window.ethereum) return undefined;
  try {
    const ethWallet = evmosToEth(sender.accountAddress);
    let signature = "";
    signature = (await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [ethWallet, JSON.stringify(tx.eipToSign)],
    })) as string;
    const transaction = await createEIP712Transaction(
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
      message: `Error signing the tx: ${e}`,
      transaction: undefined,
    };
  }
}

export async function signBackendTxWithMetamask(
  sender: string,
  tx: TxGeneratedByBackend
) {
  if (!window.ethereum) return undefined;

  try {
    const ethWallet = evmosToEth(sender);

    const eipToSignUTF8 = JSON.parse(
      Buffer.from(tx.eipToSign, "base64").toString("utf-8")
    );

    const signature = (await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [ethWallet, JSON.stringify(eipToSignUTF8)],
    })) as string;

    return {
      result: true,
      message: "",
      signature: signature,
    };
  } catch (e) {
    // TODO: send custom responses for each of the knonw cases
    return {
      result: false,
      message: `Error signing the tx: ${e}`,
      singature: undefined,
    };
  }
}

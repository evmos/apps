import { Sender, TxGenerated } from "@evmos/transactions";
import {
  signBackendTxWithMetamask,
  signEvmosjsTxWithMetamask,
} from "../metamask/metamaskSigner";
import { TxGeneratedByBackend } from "../signing";
import { METAMASK_KEY } from "../wallet";

// Signatures
export async function signEvmosjsTx(
  sender: Sender,
  tx: TxGenerated,
  currentExtension: string
) {
  if (currentExtension === METAMASK_KEY) {
    return signEvmosjsTxWithMetamask(sender, tx);
  }
  return {
    result: false,
    message: `Error signing the tx: Extension not supported`,
    transaction: null,
  };
}

export async function signBackendTx(
  sender: string,
  tx: TxGeneratedByBackend,
  currentExtension: string
) {
  if (currentExtension === METAMASK_KEY) {
    return await signBackendTxWithMetamask(sender, tx);
  }

  return {
    result: false,
    message: `Error signing the tx: Extension not supported`,
    signature: null,
  };
}

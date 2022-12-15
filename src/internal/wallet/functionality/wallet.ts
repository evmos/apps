import { Sender, TxGenerated } from "@evmos/transactions";
import { ResultMessage } from "./errors";
import {
  BackendTxSignatureResponse,
  EvmosjsTxSignatureResponse,
} from "./metamask/metamaskSigner";
import { TxGeneratedByBackend } from "./signing";

export const METAMASK_KEY = "metamask";

export interface WalletExtension {
  active: boolean;
  extensionName: string;
  addressEthFormat: string;
  addressCosmosFormat: string;
  evmosPubkey: string | undefined;
  cosmosPubkey: string | undefined;
  connect: () => Promise<ResultMessage>;
  disconnect: () => ResultMessage;

  // Signing
  // Returns a transaction ready to be broadcasted
  signEvmosjsTx(
    sender: Sender,
    tx: TxGenerated
  ): Promise<EvmosjsTxSignatureResponse>;

  // Returns the transaction signature
  signBackendTx(
    sender: string,
    tx: TxGeneratedByBackend
  ): Promise<BackendTxSignatureResponse>;
}

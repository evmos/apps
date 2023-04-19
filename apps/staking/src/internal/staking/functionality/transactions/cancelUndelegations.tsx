import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  SIGNING_NOTIFICATIONS,
  EVMOS_NETWORK_FOR_BACKEND,
  Signer,
} from "evmos-wallet";

import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { cancelUndelegationsBackendCall } from "./fetch";
import { BigNumber } from "ethers";

export async function executeCancelUndelegations(
  wallet: WalletExtension,
  valAddress: string,
  amount: BigNumber,
  creationHeight: string
) {
  if (wallet.evmosPubkey === null) {
    return {
      error: true,
      message: "Please, connect your wallet",
      title: "",
      txHash: "",
      explorerTxUrl: "",
    };
  }

  const tx = await cancelUndelegationsBackendCall(
    wallet.evmosPubkey,
    wallet.evmosAddressCosmosFormat,
    amount.toString(),
    valAddress,
    creationHeight
  );
  if (tx.error === true || tx.data === null) {
    // Error generating the transaction
    return {
      error: true,
      message: tx.message,
      title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  const signer = new Signer();
  const sign = await signer.signBackendTx(
    wallet.evmosAddressCosmosFormat,
    tx.data,
    EVMOS_NETWORK_FOR_BACKEND,
    wallet.extensionName
  );
  if (sign.result === false) {
    return {
      error: true,
      message: sign.message,
      title: SIGNING_NOTIFICATIONS.ErrorTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  const broadcastResponse = await signer.broadcastTxToBackend();

  if (broadcastResponse.error === true) {
    return {
      error: true,
      message: broadcastResponse.message,
      title: BROADCASTED_NOTIFICATIONS.ErrorTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  return {
    error: false,
    message: `${BROADCASTED_NOTIFICATIONS.SubmitTitle} ${broadcastResponse.txhash}`,
    title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
    txHash: broadcastResponse.txhash,
    explorerTxUrl: tx?.data?.explorerTxUrl,
  };
}

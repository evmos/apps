// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EVMOS_NETWORK_FOR_BACKEND } from "../../internal/wallet/functionality/networkConfig";
import { Signer } from "../../internal/wallet/functionality/signing/genericSigner";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  SIGNING_NOTIFICATIONS,
} from "../../notification/errors";
import { rewardsBackendCall } from "./fetch";

export async function executeRewards(wallet: WalletExtension) {
  if (wallet.evmosPubkey === null) {
    return {
      error: true,
      message: "Please, connect your wallet",
      title: "",
      txHash: "",
      explorerTxUrl: "",
    };
  }

  const tx = await rewardsBackendCall(
    wallet.evmosPubkey,
    wallet.evmosAddressCosmosFormat
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

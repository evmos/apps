// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber, utils } from "ethers";
import { FEE_WITHDRAW } from "constants-helper";
import { checkFormatAddress } from "helpers";

import { ibcTransferBackendCall } from "./ibcTransfer";
import {
  EVMOS_NETWORK_FOR_BACKEND,
  Signer,
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  SIGNING_NOTIFICATIONS,
  IBCChainParams,
} from "evmos-wallet";
export async function executeWithdraw(
  pubkey: string,
  address: string,
  params: IBCChainParams,
  feeBalance: BigNumber,
  extension: string,
  prefix: string,
  useERC20Denom: boolean
) {
  if (feeBalance.lt(BigNumber.from(FEE_WITHDRAW))) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  if (!checkFormatAddress(params.sender, "evmos")) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  const tx = await ibcTransferBackendCall(
    pubkey,
    address,
    params,
    useERC20Denom
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
    address,
    tx.data,
    EVMOS_NETWORK_FOR_BACKEND,
    extension
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
    // TODO: add sentry call here!
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

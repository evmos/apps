// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  BALANCE_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
  EXECUTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  WALLET_NOTIFICATIONS,
} from "./errors";
import {
  KEPLR_NOTIFICATIONS,
  METAMASK_NOTIFICATIONS,
} from "../internal/wallet/functionality/errors";
import { addSnackbar } from "./redux/notificationSlice";
import { SNACKBAR_CONTENT_TYPES, SNACKBAR_TYPES } from "./types";
import { executeIBCTransferResponse } from "./transactionsTypes";

export function snackRequestRejected() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: WALLET_NOTIFICATIONS.ErrorTitle,
      text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
    },
    type: SNACKBAR_TYPES.ERROR,
  });
}

export function snackErrorGeneratingTx() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
    },
    type: SNACKBAR_TYPES.ERROR,
  });
}

export function snackBroadcastSuccessful(hash: string, explorerTxUrl: string) {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.LINK,
      title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
      hash: hash,
      explorerTxUrl: explorerTxUrl,
    },
    type: SNACKBAR_TYPES.SUCCESS,
  });
}

export function snackIBCInformation() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: EXECUTED_NOTIFICATIONS.IBCTransferInformation.text,
      text: EXECUTED_NOTIFICATIONS.IBCTransferInformation.subtext,
    },
    type: SNACKBAR_TYPES.DEFAULT,
  });
}

export function snackExecuteIBCTransfer(res: executeIBCTransferResponse) {
  return addSnackbar({
    id: 0,
    content:
      res.error === true
        ? {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: res.title,
            text: res.message,
          }
        : {
            type: SNACKBAR_CONTENT_TYPES.LINK,
            title: res.title,
            hash: res.txHash,
            explorerTxUrl: res.explorerTxUrl,
          },

    type: res.error === true ? SNACKBAR_TYPES.ERROR : SNACKBAR_TYPES.SUCCESS,
  });
}

export function snackErrorConnectingKeplr() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: KEPLR_NOTIFICATIONS.ErrorTitle,
      text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
    },
    type: SNACKBAR_TYPES.ERROR,
  });
}

export function snackErrorConnectingMetaMask() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: METAMASK_NOTIFICATIONS.ErrorTitle,
      text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
    },

    type: SNACKBAR_TYPES.ERROR,
  });
}

export function snackErrorGettingBalanceExtChain() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: BALANCE_NOTIFICATIONS.ErrorGetBalanceExtChain,
    },
    type: SNACKBAR_TYPES.ERROR,
  });
}

export function snackWarningLedger() {
  return addSnackbar({
    id: 0,
    content: {
      type: SNACKBAR_CONTENT_TYPES.TEXT,
      title: "",
      text: KEPLR_NOTIFICATIONS.WarningSubtext,
    },

    type: SNACKBAR_TYPES.DEFAULT,
  });
}

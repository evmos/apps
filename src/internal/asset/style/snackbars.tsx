import { SimpleSnackbar } from "../../../components/notification/content/SimpleSnackbar";
import { ViewExplorerSnackbar } from "../../../components/notification/content/ViexExplorerSnackbar";
import { addSnackbar } from "../../../components/notification/redux/notificationSlice";
import {
  KEPLR_NOTIFICATIONS,
  METAMASK_NOTIFICATIONS,
} from "../../wallet/functionality/errors";
import {
  BALANCE_NOTIFICATIONS,
  BROADCASTED_NOTIFICATIONS,
  EXECUTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
} from "../functionality/transactions/errors";
import { executeIBCTransferResponse } from "../functionality/transactions/types";

export function snackRequestRejected() {
  return addSnackbar({
    id: 0,
    content: (
      <SimpleSnackbar
        title="Wallet not connected"
        text={KEPLR_NOTIFICATIONS.RequestRejectedSubtext}
      />
    ),
    type: "error",
  });
}

export function snackErrorGeneratingTx() {
  return addSnackbar({
    id: 0,
    content: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
    type: "error",
  });
}

export function snackBroadcastSuccessful(hash: string, explorerTxUrl: string) {
  return addSnackbar({
    id: 0,
    content: (
      <ViewExplorerSnackbar
        values={{
          title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
          hash: hash,
          explorerTxUrl: explorerTxUrl,
        }}
      />
    ),
    type: "success",
  });
}

export function snackIBCInformation() {
  return addSnackbar({
    id: 0,
    content: (
      <SimpleSnackbar
        title={EXECUTED_NOTIFICATIONS.IBCTransferInformation.text}
        text={EXECUTED_NOTIFICATIONS.IBCTransferInformation.subtext}
      />
    ),
    type: "default",
  });
}

export function snackExecuteIBCTransfer(res: executeIBCTransferResponse) {
  return addSnackbar({
    id: 0,
    content:
      res.error === true ? (
        <SimpleSnackbar title={res.title} text={res.message} />
      ) : (
        <ViewExplorerSnackbar
          values={{
            title: res.title,
            hash: res.txHash,
            explorerTxUrl: res.explorerTxUrl,
          }}
        />
      ),
    type: res.error === true ? "error" : "success",
  });
}

export function snackErrorConnectingKeplr() {
  return addSnackbar({
    id: 0,
    content: (
      <SimpleSnackbar
        title={KEPLR_NOTIFICATIONS.ErrorTitle}
        text={KEPLR_NOTIFICATIONS.RequestRejectedSubtext}
      />
    ),
    type: "error",
  });
}

export function snackErrorConnectingMetaMask() {
  return addSnackbar({
    id: 0,
    content: (
      <SimpleSnackbar
        title={METAMASK_NOTIFICATIONS.ErrorTitle}
        text={KEPLR_NOTIFICATIONS.RequestRejectedSubtext}
      />
    ),

    type: "error",
  });
}

export function snackErrorGettingBalanceExtChain() {
  return addSnackbar({
    id: 0,
    content: BALANCE_NOTIFICATIONS.ErrorGetBalanceExtChain,
    type: "error",
  });
}

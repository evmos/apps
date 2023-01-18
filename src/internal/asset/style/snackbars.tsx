import { SimpleSnackbar } from "../../../components/notification/content/SimpleSnackbar";
import { ViewExplorerSnackbar } from "../../../components/notification/content/ViexExplorerSnackbar";
import { addSnackbar } from "../../../components/notification/redux/notificationSlice";
import { KEPLR_NOTIFICATIONS } from "../../wallet/functionality/errors";
import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
} from "../functionality/transactions/errors";

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

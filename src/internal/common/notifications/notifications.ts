import { addSnackbar } from "../../../components/notification/redux/notificationSlice";
import { SNACKBAR_TYPES } from "../../../components/notification/types";
import { ReduxWalletStore } from "../../../components/wallet/redux/WalletSlice";

function notify(
  type: string,
  content: {
    type: string;
    title: string;
    text?: string;
    hash?: string;
    explorerTxUrl?: string;
  },
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    store.dispatch(
      addSnackbar({
        // Note: id can be any number, it gets overwritten by redux with the correct value
        // Using id here, to keep the Snackbar interface for the payload
        id: 0,
        type: type,
        content: content,
      })
    );
  }
}

export function NotifyError(
  content: {
    type: string;
    title: string;
    text?: string;
    hash?: string;
    explorerTxUrl?: string;
  },
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify(SNACKBAR_TYPES.ERROR, content, store, isEnabled);
  }
}

export function NotifySuccess(
  content: {
    type: string;
    title: string;
    text?: string;
    hash?: string;
    explorerTxUrl?: string;
  },
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify(SNACKBAR_TYPES.SUCCESS, content, store, isEnabled);
  }
}

export function NotifyWarning(
  content: {
    type: string;
    title: string;
    text?: string;
    hash?: string;
    explorerTxUrl?: string;
  },
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify(SNACKBAR_TYPES.DEFAULT, content, store, isEnabled);
  }
}

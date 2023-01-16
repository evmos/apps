import { addSnackbar } from "../../../components/notification/redux/notificationSlice";
import { ReduxWalletStore } from "../../../components/wallet/redux/WalletSlice";

function notify(
  type: string,
  content: JSX.Element | string,
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
  content: JSX.Element | string,
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify("error", content, store, isEnabled);
  }
}

export function NotifySuccess(
  content: JSX.Element | string,
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify("success", content, store, isEnabled);
  }
}

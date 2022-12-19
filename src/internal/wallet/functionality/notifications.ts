import { addSnackbar } from "../../../components/notification/redux/notificationSlice";
import { ReduxWalletStore } from "../../../components/wallet/redux/WalletSlice";

function notify(
  type: string,
  text: string,
  subtext: string,
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
        text: text,
        subtext: subtext,
      })
    );
  }
}

export function NotifyError(
  text: string,
  subtext: string,
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify("error", text, subtext, store, isEnabled);
  }
}

export function NotifySuccess(
  text: string,
  subtext: string,
  store: ReduxWalletStore,
  isEnabled: boolean
) {
  if (isEnabled) {
    notify("success", text, subtext, store, isEnabled);
  }
}

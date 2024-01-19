// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { addSnackbar } from "../../../notification/redux/notificationSlice";
import { SNACKBAR_TYPES } from "../../../notification/types";
import { ReduxWalletStore } from "../../../wallet/redux/WalletSlice";

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
  isEnabled: boolean,
) {
  if (isEnabled) {
    store.dispatch(
      addSnackbar({
        // Note: id can be any number, it gets overwritten by redux with the correct value
        // Using id here, to keep the Snackbar interface for the payload
        id: 0,
        type: type,
        content: content,
      }),
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
  isEnabled: boolean,
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
  isEnabled: boolean,
) {
  if (isEnabled) {
    notify(SNACKBAR_TYPES.SUCCESS, content, store, isEnabled);
  }
}

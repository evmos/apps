// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { configureStore } from "@reduxjs/toolkit";
import { NotificacionReducer } from "../notification/redux/notificationSlice";
import { WalletReducer } from "../wallet/redux/WalletSlice";

export const store = configureStore({
  reducer: {
    wallet: WalletReducer,
    snackbar: NotificacionReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;

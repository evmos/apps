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
export type AppDispatch = typeof store.dispatch;

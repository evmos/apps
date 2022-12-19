import { configureStore } from "@reduxjs/toolkit";
import { NotificacionReducer } from "../components/notification/redux/notificationSlice";
import { WalletReducer } from "../components/wallet/redux/WalletSlice";

export const store = configureStore({
  reducer: {
    wallet: WalletReducer,
    snackbar: NotificacionReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

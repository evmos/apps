import { configureStore } from "@reduxjs/toolkit";
import { WalletReducer } from "../components/wallet/redux/WalletSlice";
import { WalletExtension } from "../internal/wallet/functionality/wallet";

export const store = configureStore({
  reducer: {
    wallet: WalletReducer,
  },
});

export declare type StoreType = {
  wallet: {
    value: WalletExtension;
  };
};

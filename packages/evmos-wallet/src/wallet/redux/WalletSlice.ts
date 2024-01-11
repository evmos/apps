// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { AnyAction, createSlice, ThunkMiddleware } from "@reduxjs/toolkit";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

export declare type ReduxWalletStore = ToolkitStore<
  {
    wallet: {
      value: WalletExtension;
    };
  },
  AnyAction,
  [
    ThunkMiddleware<
      {
        wallet: {
          value: WalletExtension;
        };
      },
      AnyAction,
      undefined
    >,
  ]
>;

const initialValue: WalletExtension = {
  active: false,
  extensionName: "",
  evmosAddressEthFormat: "",
  evmosAddressCosmosFormat: "",
  evmosPubkey: null,
  osmosisPubkey: null,
  accountName: null,
};

const walletSlice = createSlice({
  name: "walletSlice",
  initialState: {
    value: initialValue,
  },
  reducers: {
    setWallet: (state, action: { type: string; payload: WalletExtension }) => {
      state.value = action.payload;
    },
    resetWallet: (state) => {
      state.value = initialValue;
    },
  },
});

export const { setWallet, resetWallet } = walletSlice.actions;

export const WalletReducer = walletSlice.reducer;

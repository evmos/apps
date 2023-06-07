// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;
import { AnyAction, ThunkMiddleware } from "@reduxjs/toolkit";

import type { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";

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
    >
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

export const walletSlice = createSlice({
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

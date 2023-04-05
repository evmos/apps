import { AnyAction, createSlice, ThunkMiddleware } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
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

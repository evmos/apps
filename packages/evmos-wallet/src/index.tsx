// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export * from "./wallet";
export * from "./api";
export * from "./utils";
export * from "./registry-actions";

// snackbars
export { Snackbars } from "./notification/Snackbars";
export { addSnackbar } from "./notification/redux/notificationSlice";
export { KEPLR_NOTIFICATIONS } from "./internal/wallet/functionality/errors";
export { SNACKBAR_TYPES } from "./notification/types";
export { SNACKBAR_CONTENT_TYPES } from "./notification/types";
export { MODAL_NOTIFICATIONS } from "./notification/errors";
export { BROADCASTED_NOTIFICATIONS } from "./notification/errors";
export { GENERATING_TX_NOTIFICATIONS } from "./notification/errors";
export { WALLET_NOTIFICATIONS } from "./notification/errors";

export { snackBroadcastSuccessful } from "./notification/helpers";
export { snackErrorGeneratingTx } from "./notification/helpers";
export { snackRequestRejected } from "./notification/helpers";
export { snackExecuteIBCTransfer } from "./notification/helpers";

export { snackWarningLedger } from "./notification/helpers";

// redux
export { store } from "./redux/Store";
export { KEPLR_KEY } from "./internal/wallet/functionality/wallet";

export type { StoreType } from "./redux/Store";

export * from "./internal/wallet/functionality/wallet";
// components

// configs
export { EVMOS_SYMBOL } from "@evmosapps/constants";
export { EVMOS_DECIMALS } from "@evmosapps/constants";
export { EVMOS_BACKEND } from "@evmosapps/constants";

export { EVMOS_MINIMAL_COIN_DENOM } from "@evmosapps/constants";

// utils
export { truncateAddress } from "./internal/wallet/style/format";

// wallet
export { addToken } from "./internal/wallet/functionality/metamask/metamaskHelpers";
export type { Token } from "./internal/wallet/functionality/metamask/metamaskHelpers";

// Probably move it to assets
export type { ConvertMsg } from "./notification/transactionsTypes";

export type { txStatusError } from "./notification/transactionsTypes";

export { useAssets } from "./api/useAssets";
export { useRewards } from "./hooks/rewards/useRewards";

// styles
import "./styles.css";

// libs
export { WagmiConfig } from "wagmi";
export { Web3Modal } from "@web3modal/react";

// snackbars
export { Snackbars } from "./notification/Snackbars";
export { addSnackbar } from "./notification/redux/notificationSlice";
export { KEPLR_NOTIFICATIONS } from "./internal/wallet/functionality/errors";
export { METAMASK_NOTIFICATIONS } from "./internal/wallet/functionality/errors";
export { SNACKBAR_TYPES } from "./notification/types";
export { SNACKBAR_CONTENT_TYPES } from "./notification/types";
export { MODAL_NOTIFICATIONS } from "./notification/errors";
export { BROADCASTED_NOTIFICATIONS } from "./notification/errors";
export { EXECUTED_NOTIFICATIONS } from "./notification/errors";
export { GENERATING_TX_NOTIFICATIONS } from "./notification/errors";
export { WALLET_NOTIFICATIONS } from "./notification/errors";
export { BALANCE_NOTIFICATIONS } from "./notification/errors";
export { SIGNING_NOTIFICATIONS } from "./notification/errors";
export { INCLUDED_BLOCK_NOTIFICATIONS } from "./notification/errors";
export { snackErrorConnectingKeplr } from "./notification/helpers";
export { snackErrorConnectingMetaMask } from "./notification/helpers";
export { snackErrorGettingBalanceExtChain } from "./notification/helpers";
export { snackBroadcastSuccessful } from "./notification/helpers";
export { snackErrorGeneratingTx } from "./notification/helpers";
export { snackRequestRejected } from "./notification/helpers";
export { snackExecuteIBCTransfer } from "./notification/helpers";
export { snackIBCInformation } from "./notification/helpers";
export { snackWarningLedger } from "./notification/helpers";

// redux
export { store } from "./redux/Store";
export { Provider } from "react-redux";
export { KEPLR_KEY } from "./internal/wallet/functionality/wallet";
export { METAMASK_KEY } from "./internal/wallet/functionality/wallet";
export { WALLECT_CONNECT_KEY } from "./internal/wallet/functionality/wallet";
export type { StoreType } from "./redux/Store";
export type { AppDispatch } from "./redux/Store";
export { getAllSnackbars } from "./notification/redux/notificationSlice";

// components
export {
  ethereumClient,
  projectId,
  wagmiClient,
} from "../src/internal/wallet/functionality/walletconnect/walletconnectConstants";
export { ButtonWalletConnection } from "./wallet/ButtonWalletConnection";

// configs
export { EVMOS_SYMBOL } from "./internal/wallet/functionality/networkConfig";
export { EVMOS_BACKEND } from "./internal/wallet/functionality/networkConfig";
export { EVMOS_NETWORK_FOR_BACKEND } from "./internal/wallet/functionality/networkConfig";
export { EVMOS_CHAIN } from "./internal/wallet/functionality/networkConfig";
export { EVMOS_MINIMAL_COIN_DENOM } from "./internal/wallet/functionality/networkConfig";

// utils
export { truncateAddress } from "./internal/wallet/style/format";
export { fetchWithTimeout } from "./internal/wallet/functionality/fetch";

// wallet
export { getKeplrAddressByChain } from "./internal/wallet/functionality/keplr/keplrHelpers";
export { getWallet } from "./internal/wallet/functionality/metamask/metamaskHelpers";
export { addToken } from "./internal/wallet/functionality/metamask/metamaskHelpers";
export type { Token } from "./internal/wallet/functionality/metamask/metamaskHelpers";
export { Signer } from "./internal/wallet/functionality/signing/genericSigner";
export { broadcastAminoBackendTxToBackend } from "./internal/wallet/functionality/signing";
// Probably move it to assets
export type { IBCChainParams } from "./notification/transactionsTypes";
export type { IBCTransferResponse } from "./notification/transactionsTypes";
export type { ConvertMsg } from "./notification/transactionsTypes";
export type { executedTx } from "./notification/transactionsTypes";
export { TransactionStatus } from "./notification/transactionsTypes";
export type { txStatusErrorResponse } from "./notification/transactionsTypes";
export type { txStatusResponse } from "./notification/transactionsTypes";

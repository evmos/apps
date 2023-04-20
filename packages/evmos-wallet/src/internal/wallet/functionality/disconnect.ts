import { Dispatch } from "react";
import { resetWallet } from "../../../wallet/redux/WalletSlice";
import { unsubscribeToKeplrEvents } from "./keplr/keplrHelpers";
import { unsubscribeToEvents } from "./metamask/metamaskHelpers";

export function disconnectWallets(
  dispatch: Dispatch<{
    payload: undefined;
    type: "walletSlice/resetWallet";
  }>
) {
  console.log("disconnect wallets");
  unsubscribeToEvents();
  unsubscribeToKeplrEvents();
  dispatch(resetWallet());
}

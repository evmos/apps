import { Dispatch, SetStateAction } from "react";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import { CLICK_WC_DISCONNECT_WALLET_BUTTON, useTracker } from "tracker";
import {
  RemoveProviderFromLocalStorage,
  RemoveProviderWalletConnectToLocalStorage,
  RemoveWalletFromLocalStorage,
} from "../../internal/wallet/functionality/localstorage";
import { disconnectWallets } from "../../internal/wallet/functionality/disconnect";
export const ButtonDisconnect = ({
  walletExtension,
  dispatch,
  setShow,
  setIsCopied,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  setShow: Dispatch<SetStateAction<boolean>>;
  setIsCopied: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handlePreClickAction: trackClickDisconnectWallet } = useTracker(
    CLICK_WC_DISCONNECT_WALLET_BUTTON
  );
  return (
    <button
      className="w-full rounded font-bold uppercase border border-darkPearl hover:bg-grayOpacity p-3 mt-3"
      onClick={() => {
        trackClickDisconnectWallet({
          wallet: walletExtension?.evmosAddressEthFormat,
          provider: walletExtension?.extensionName,
        });
        RemoveWalletFromLocalStorage();
        RemoveProviderFromLocalStorage();
        RemoveProviderWalletConnectToLocalStorage();
        disconnectWallets(dispatch);
        setShow(false);
        setIsCopied(false);
      }}
    >
      disconnect
    </button>
  );
};

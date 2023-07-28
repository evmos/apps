import { Dispatch, SetStateAction } from "react";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import { CLICK_DISCONNECT_WALLET_BUTTON, useTracker } from "tracker";
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
    CLICK_DISCONNECT_WALLET_BUTTON
  );
  return (
    <button
      className="border-darkPearl hover:bg-grayOpacity mt-3 w-full rounded border p-3 font-bold uppercase"
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

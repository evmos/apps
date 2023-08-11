import { Dispatch, SetStateAction } from "react";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import { CLICK_DISCONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { disconnect } from "@wagmi/core";

export const ButtonDisconnect = ({
  walletExtension,
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
      onClick={async () => {
        await disconnect();
        trackClickDisconnectWallet({
          wallet: walletExtension?.evmosAddressEthFormat,
          provider: walletExtension?.extensionName,
        });

        setShow(false);
        setIsCopied(false);
      }}
    >
      disconnect
    </button>
  );
};

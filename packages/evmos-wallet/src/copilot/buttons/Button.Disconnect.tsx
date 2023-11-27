// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import { CLICK_DISCONNECT_WALLET_BUTTON, useTracker } from "tracker";
import { disconnect } from "wagmi/actions";

export const ButtonDisconnect = ({
  walletExtension,
  setIsOpen,
  setIsCopied,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>; // eslint-disable-next-line sonarjs/cognitive-complexity
  setIsOpen: Dispatch<SetStateAction<boolean>>;
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

        setIsOpen(false);
        setIsCopied(false);
      }}
    >
      disconnect
    </button>
  );
};

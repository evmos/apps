// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch } from "react";
import { useWalletConnect } from "../../internal/wallet/functionality/walletconnect/walletconnect";
import { store } from "../../redux/Store";
import ButtonWallet from "../ButtonWallet";
import {
  GetProviderWalletConnectFromLocalStorage,
  GetWalletFromLocalStorage,
} from "../../internal/wallet/functionality/localstorage";
import { WALLECT_CONNECT_KEY } from "../../internal/wallet/functionality/wallet";
import ContentModalConnect from "../ContentModalConnect";
import { WalletConnectIcon } from "icons";
import { CLICK_CONNECTED_WITH, useTracker } from "tracker";
export const ButtonWalletConnect = ({
  setShow,
}: {
  setShow: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const useWalletConnectHook = useWalletConnect(store);

  const { handlePreClickAction: trackConnectedWithWallet } =
    useTracker(CLICK_CONNECTED_WITH);

  return (
    <ButtonWallet
      onClick={async () => {
        setShow(false);
        await useWalletConnectHook.connect();
        trackConnectedWithWallet({
          wallet: GetWalletFromLocalStorage(),
          provider: WALLECT_CONNECT_KEY,
          walletSelected: GetProviderWalletConnectFromLocalStorage(),
        });
      }}
    >
      <ContentModalConnect>
        <WalletConnectIcon />
        <span>Wallet Connect </span>
      </ContentModalConnect>
    </ButtonWallet>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, useEffect, useState } from "react";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WalletExtension,
} from "../internal/wallet/functionality/wallet";
import { AnyAction } from "redux";
import { GetProviderFromLocalStorage } from "../internal/wallet/functionality/localstorage";
import { SWITCH_BETWEEN_WALLETS, useTracker } from "tracker";
import { SetStateAction } from "react";
import {
  handleWalletInLocalStorage,
  trackWallet,
  drawWalletProfileModal,
  drawConnectModal,
} from "./utils";

export const WalletConnection = ({
  walletExtension,
  dispatch,
  copilotModal,
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>;
  copilotModal?: ({
    beforeStartHook,
  }: {
    beforeStartHook: Dispatch<SetStateAction<boolean>>;
  }) => JSX.Element;
}) => {
  const [show, setShow] = useState(false);

  const { handlePreClickAction: trackChangeWallet } = useTracker(
    SWITCH_BETWEEN_WALLETS
  );

  useEffect(() => {
    // tracking address changes
    if (
      METAMASK_KEY === GetProviderFromLocalStorage() ||
      KEPLR_KEY === GetProviderFromLocalStorage()
    ) {
      trackWallet(walletExtension, trackChangeWallet);
    }
  }, [trackChangeWallet, walletExtension]);

  useEffect(() => {
    handleWalletInLocalStorage(walletExtension);
  }, [walletExtension]);

  return walletExtension.active === true
    ? drawWalletProfileModal({ setShow, walletExtension, show, dispatch })
    : drawConnectModal({ setShow, show, dispatch, copilotModal });
};

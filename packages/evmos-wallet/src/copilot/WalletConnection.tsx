"use client";
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
  ConnectModal,
} from "./utils";

export const WalletConnection = ({
  walletExtension,
  dispatch,
  copilotModal,
  variant = "primary",
}: {
  walletExtension: WalletExtension;
  dispatch: Dispatch<AnyAction>;
  copilotModal?: ({
    beforeStartHook,
  }: {
    beforeStartHook: Dispatch<SetStateAction<boolean>>;
  }) => JSX.Element;
  variant?: "primary" | "outline-primary" | "primary-lg";
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return walletExtension.active === true ? (
    drawWalletProfileModal({ setIsOpen, walletExtension, isOpen, dispatch })
  ) : (
    <ConnectModal
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      dispatch={dispatch}
      copilotModal={copilotModal}
      variant={variant}
      // ({ setIsOpen, isOpen, dispatch, copilotModal, variant })
    />
  );
};

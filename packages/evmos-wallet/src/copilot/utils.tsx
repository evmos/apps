// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  GetWalletFromLocalStorage,
  SaveWalletToLocalStorage,
} from "../internal/wallet/functionality/localstorage";
import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  WalletExtension,
} from "../internal/wallet/functionality/wallet";
import { KeplrIcon, MetamaskIcon, WalletConnectIcon } from "icons";
import { ButtonProfile } from "./buttons/Button.Profile";
import { WalletProfileModal } from "./WalletProfileModal";
import { Dispatch, SetStateAction } from "react";
import { AnyAction } from "redux";
import { ButtonConnectWallet } from "./buttons/Button.ConnectWallet";
import { WalletConnectModal } from "./WalletConnectModal";

export const ProvidersIcons: { [key: string]: JSX.Element } = {
  [METAMASK_KEY]: <MetamaskIcon width={21} height={24} />,
  [KEPLR_KEY]: <KeplrIcon width={24} height={24} />,
  [WALLECT_CONNECT_KEY]: <WalletConnectIcon width={24} height={24} />,
};

export function trackWallet(
  walletExtension: WalletExtension,
  trackChangeWallet: (
    extraProperties?: Record<string, unknown> | undefined
  ) => void
) {
  const walletLocalStorage = GetWalletFromLocalStorage();
  // walletExtension is not set
  if (walletExtension.evmosAddressEthFormat === "") {
    return;
  }
  // walletLocalStorage is not set
  if (walletLocalStorage === null) {
    return;
  }
  // track the wallet change if the wallets are different
  if (walletExtension.evmosAddressEthFormat !== walletLocalStorage) {
    trackChangeWallet({
      provider: walletExtension.extensionName,
      wallet: walletExtension.evmosAddressEthFormat,
    });
    SaveWalletToLocalStorage(walletExtension.evmosAddressEthFormat);
  }
}

export const handleWalletInLocalStorage = (
  walletExtension: WalletExtension
) => {
  const walletLocalStorage = GetWalletFromLocalStorage();
  // avoid saving the evmos address if it is empty or is already stored.
  if (walletExtension.evmosAddressEthFormat === "") {
    return;
  }
  if (walletLocalStorage === walletExtension.evmosAddressEthFormat) {
    return;
  }
  SaveWalletToLocalStorage(walletExtension.evmosAddressEthFormat);
};

type WalletProfileModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  walletExtension: WalletExtension;
  isOpen: boolean;
  dispatch: Dispatch<AnyAction>;
};

export const drawWalletProfileModal = (props: WalletProfileModalProps) => {
  return (
    <>
      {/* open profile modal */}
      <ButtonProfile
        setIsOpen={props.setIsOpen}
        walletExtension={props.walletExtension}
      />
      {/* display profile modal */}
      <WalletProfileModal
        walletExtension={props.walletExtension}
        dispatch={props.dispatch}
        isOpen={props.isOpen}
        setIsOpen={props.setIsOpen}
      />
    </>
  );
};

type WalletConnectModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  dispatch: Dispatch<AnyAction>;
  copilotModal?: ({
    beforeStartHook,
  }: {
    beforeStartHook: Dispatch<SetStateAction<boolean>>;
  }) => JSX.Element;
  variant: "primary" | "outline-primary" | "primary-lg";
};

export const ConnectModal = (props: WalletConnectModalProps) => {
  return (
    <div className="flex justify-center">
      {/* open connect modal */}
      <ButtonConnectWallet
        setIsOpen={props.setIsOpen}
        variant={props.variant}
      />
      {/* display connect modal */}
      <WalletConnectModal
        copilotModal={
          props.copilotModal
            ? props.copilotModal({
                beforeStartHook: () => props.setIsOpen(false),
              })
            : undefined
        }
        isOpen={props.isOpen}
        setIsOpen={props.setIsOpen}
      />
    </div>
  );
};

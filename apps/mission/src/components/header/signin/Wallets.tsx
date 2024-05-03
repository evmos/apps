// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { WALLETS_TYPE, useSignIn } from "./useSignIn";
import { useMemo, useState } from "react";
import { getActiveProviderKey, useWallet } from "@evmosapps/evmos-wallet";
import { Spinner } from "@evmosapps/ui/components/spinners/Spinner.tsx";
import { IconCross } from "@evmosapps/ui/icons/line/basic/cross.tsx";
import { IconCheck } from "@evmosapps/ui/icons/line/basic/check.tsx";
import { useInstallProvider } from "./useWalletInstalled";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { Connector } from "wagmi";
import { useTranslation } from "@evmosapps/i18n/client";
import { isKeplrInstalled, isLeapInstalled } from "./helpers";

export const Wallets = ({ wallets }: { wallets: WALLETS_TYPE[] }) => {
  const { connectors, connect, error } = useSignIn();
  const { isConnecting, isConnected } = useWallet();
  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");
  const [setProviderStatus] = useInstallProvider(walletSelectedToConnect);
  const { t } = useTranslation("dappStore");

  const isWalletDetected = (
    wallet: string,
    connector: Connector | undefined,
  ) => {
    if (
      (wallet === "Keplr" && !isKeplrInstalled()) ||
      (wallet === "Leap" && !isLeapInstalled()) ||
      (isConnected && isWalletconnected(wallet)) ||
      isConnected ||
      error ||
      isConnecting ||
      !connector
    ) {
      return false;
    }
    return true;
  };

  const isWalletRecommended = (wallet: string) => {
    return wallet === "MetaMask" && !error && !isConnected && !isConnecting;
  };

  const hasError = (wallet: string) => {
    return error && error.name === wallet;
  };

  const isWalletLoading = (wallet: string) => {
    return isConnecting && walletSelectedToConnect === wallet && !error;
  };

  const isWalletconnected = (wallet: string) => {
    return getActiveProviderKey()?.toLowerCase() === wallet.toLowerCase();
  };

  const isWalletDisabled = (wallet: string) => {
    return (isConnected || isConnecting) && getActiveProviderKey() === wallet;
  };

  const handleConnect = (
    e: React.MouseEvent<HTMLButtonElement>,
    connector: Connector | undefined,
    wallet: WALLETS_TYPE,
  ) => {
    if (wallet === undefined) return;
    e.preventDefault();

    if (
      !connector ||
      (connector && wallet.name === "Keplr" && !isKeplrInstalled()) ||
      (connector && wallet.name === "Leap" && !isLeapInstalled())
    ) {
      window.open(wallet.url, "_blank");
      setProviderStatus("started-install");
      localStorage.setItem("redirect-wallet", "true");
    } else {
      connect({ connector });
      setWalletSelectedToConnect(connector.name);
    }
  };

  const listWallets = useMemo(() => {
    if (getActiveProviderKey() !== null) {
      const indexForWallet = wallets.findIndex(
        (wallet) => wallet?.name === getActiveProviderKey(),
      );
      const listWallets = wallets.slice();
      const selectedWallet = listWallets.splice(indexForWallet, 1)[0];
      listWallets.unshift(selectedWallet);
      return listWallets;
    }
    return wallets;
  }, [wallets]);

  return listWallets?.map((wallet) => {
    if (!wallet) return;
    const Icon = wallet.icon as React.FC<React.SVGAttributes<SVGElement>>;
    const connector = connectors.find((c) => c.name === wallet.name);

    return (
      <Dropdown.Item
        as="button"
        disabled={isWalletDisabled(wallet.name)}
        key={wallet.name}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleConnect(e, connector, wallet)
        }
      >
        {Icon && <Icon className="w-7 h-7 shrink-0" />}
        <div className="text-left flex justify-between w-full items-center ">
          <div className="text-sm">
            {wallet.displayName}
            {isWalletRecommended(wallet.name) && (
              <div className="text-paragraph dark:text-paragraph-dark text-xs">
                {t("signIn.wallet.recommended")}
              </div>
            )}
            {hasError(wallet.name) && (
              <div className="text-error-container dark:text-error-container-dark  text-xs font-medium leading-4">
                {error?.error}
              </div>
            )}
          </div>
          {isWalletDetected(wallet.name, connector) && (
            <p className="text-paragraph dark:text-paragraph-dark text-xs font-medium leading-4">
              {t("signIn.wallet.detected")}
            </p>
          )}
          {isWalletLoading(wallet.name) && <Spinner />}
          {isWalletconnected(wallet.name) && (
            <IconButton as="div" variant="success" size="sm">
              <IconCheck />
            </IconButton>
          )}

          {hasError(wallet.name) && (
            <IconButton as="div" variant="danger" size="sm">
              <IconCross />
            </IconButton>
          )}
        </div>
      </Dropdown.Item>
    );
  });
};

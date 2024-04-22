// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useMemo, useState } from "react";
import { getActiveProviderKey, useWallet } from "@evmosapps/evmos-wallet";
import { Spinner } from "./Spinner";
import { IconCross } from "@evmosapps/ui/icons/line/basic/cross.tsx";
import { IconCheck } from "@evmosapps/ui/icons/line/basic/check.tsx";
import { useInstallProvider } from "./useWalletInstalled";

import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { WALLETS_TYPE, useSignIn } from "./useSignIn";

export const WalletsForModal = ({ wallets }: { wallets: WALLETS_TYPE[] }) => {
  const { connectors, connect, error } = useSignIn();
  const { isConnecting, isConnected } = useWallet();
  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");

  // TODO Mili: fix this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [providerStatus, setProviderStatus] = useInstallProvider(
    walletSelectedToConnect,
  );

  const tempWallet = useMemo(() => {
    if (getActiveProviderKey() !== null) {
      const indexForWallet = wallets.findIndex(
        (wallet) => wallet?.name === getActiveProviderKey(),
      );
      const tempWallet = wallets.slice();
      const selectedWallet = tempWallet.splice(indexForWallet, 1)[0];
      tempWallet.unshift(selectedWallet);
      return tempWallet;
    }
    return wallets;
  }, [wallets]);

  return tempWallet?.map((wallet) => {
    if (!wallet) return;
    const Icon = wallet.icon as React.FC<React.SVGAttributes<SVGElement>>;
    const connector = connectors.find((c) => c.name === wallet.name);

    return (
      <button
        className="flex w-full items-center mb-2 bg-surface-container dark:bg-surface-container-dark py-3 px-3 gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark"
        disabled={
          (isConnected || isConnecting) &&
          getActiveProviderKey() === wallet.name
        }
        key={wallet.name}
        onClick={(e) => {
          e.preventDefault();

          if (connector) {
            connect({ connector });
            setWalletSelectedToConnect(connector.name);
          } else {
            window.open(wallet.url, "_blank");
            setProviderStatus("started-install");
            localStorage.setItem("redirect-wallet", "true");
          }
        }}
      >
        {Icon && <Icon className="w-7 h-7" />}
        <div className="text-left flex justify-between w-full items-center ">
          <div className="text-sm">
            {wallet.name}
            {wallet.name === "MetaMask" &&
              !error &&
              !isConnected &&
              !isConnecting && (
                <div className="text-paragraph dark:text-paragraph-dark text-xs">
                  Recommended
                </div>
              )}
            {error && error.name === wallet.name && (
              <div className="text-error-container dark:text-error-container-dark  text-xs font-medium leading-4">
                {error.error}
              </div>
            )}
          </div>
          {connector && !isConnecting && !error && !isConnected && (
            <p className="text-paragraph dark:text-paragraph-dark text-xs font-medium leading-4">
              Detected
            </p>
          )}
          {isConnecting &&
            walletSelectedToConnect === wallet.name &&
            !error && <Spinner />}
          {getActiveProviderKey()?.toLowerCase() ===
            wallet.name.toLowerCase() && (
            <IconButton variant="success" size="sm">
              <IconCheck />
            </IconButton>
          )}

          {error && error.name === wallet.name && (
            <IconButton variant="danger" size="sm">
              <IconCross />
            </IconButton>
          )}
        </div>
      </button>
    );
  });
};

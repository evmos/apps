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

export const Wallets = ({ wallets }: { wallets: WALLETS_TYPE[] }) => {
  const { connectors, connect, error } = useSignIn();
  const { isConnecting, isConnected } = useWallet();
  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");

  const [setProviderStatus] = useInstallProvider(walletSelectedToConnect);

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
      <Dropdown.Item
        as="button"
        disabled={
          (isConnected || isConnecting) &&
          getActiveProviderKey() === wallet.name
        }
        key={wallet.name}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
          {((isConnected &&
            getActiveProviderKey()?.toLowerCase() !==
              wallet.name.toLowerCase()) ||
            !isConnected) &&
            !error &&
            !isConnecting &&
            connector && (
              // TODO Miili: check if it is keplr or leap and check for the global provider to show detected
              // same for the redirection when trying to connect
              <p className="text-paragraph dark:text-paragraph-dark text-xs font-medium leading-4">
                Detected
              </p>
            )}
          {isConnecting &&
            walletSelectedToConnect === wallet.name &&
            !error && <Spinner />}
          {getActiveProviderKey()?.toLowerCase() ===
            wallet.name.toLowerCase() && (
            <IconButton as="div" variant="success" size="sm">
              <IconCheck />
            </IconButton>
          )}

          {error && error.name === wallet.name && (
            <IconButton as="div" variant="danger" size="sm">
              <IconCross />
            </IconButton>
          )}
        </div>
      </Dropdown.Item>
    );
  });
};

import { Menu } from "@headlessui/react";

import { WALLETS_TYPE, useSignIn2 } from "./useSignin2";
import { useState } from "react";
import { getActiveProviderKey, useWallet } from "@evmosapps/evmos-wallet";
import { Spinner } from "./Spinner";
import { IconCross } from "@evmosapps/ui/icons/line/basic/cross.tsx";
import { IconCheck } from "@evmosapps/ui/icons/line/basic/check.tsx";
import { useInstallProvider } from "./useWalletInstalled";
import { useDisconnect } from "wagmi";

export const Wallets = ({ wallets }: { wallets: WALLETS_TYPE[] }) => {
  const { connectors, connect, error } = useSignIn2();
  const { isConnecting, isConnected } = useWallet();
  const [walletSelectedToConnect, setWalletSelectedToConnect] = useState("");

  const [providerStatus, setProviderStatus] = useInstallProvider(
    walletSelectedToConnect,
  );

  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        // setIsOpen(false);
      },
    },
  });

  return wallets?.map((wallet) => {
    if (!wallet) return;
    const Icon = wallet.icon as React.FC<React.SVGAttributes<SVGElement>>;
    const connector = connectors.find((c) => c.name === wallet.name);
    return (
      <Menu.Item
        as="button"
        className="flex w-full items-center [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark py-3 px-3 gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark"
        disabled={
          (isConnected || isConnecting) &&
          getActiveProviderKey() === wallet.name
        }
        key={wallet.name}
        onClick={(e) => {
          e.preventDefault();
          if (isConnected) {
            disconnect();
          }
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
          <div>
            {wallet.name}
            {wallet.name === "MetaMask" && !error && !isConnected && (
              <div className="text-paragraph dark:text-paragraph-dark text-sm">
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
          {(isConnected && walletSelectedToConnect === wallet.name && !error) ||
            (isConnected && getActiveProviderKey() === wallet.name && (
              <IconCheck />
            ))}

          {error && error.name === wallet.name && (
            <div className="text-error-container dark:text-error-container-dark">
              {/* TODO Mili: update icon when library is updated */}
              <IconCross />
            </div>
          )}
        </div>
      </Menu.Item>
    );
  });
};

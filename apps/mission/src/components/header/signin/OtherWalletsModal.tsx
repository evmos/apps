// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui-helpers";

import { useModal } from "helpers";
import { useSignIn } from "./useSignIn";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import Image from "next/image";
import { supportedWallets } from "./supportedWallets";

export const useOtherWalletsModal = () => useModal("supported-wallets");

export const OtherWalletsModal = () => {
  const { isOpen, setIsOpen } = useOtherWalletsModal();
  const { providers, connect, data, error } = useSignIn();
  const isWalletInstalled = (name: string) => {
    const wallets = data ?? [];
    return wallets.find(
      (item) => item.name === name && item.installed === true,
    );
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        {/* {modalProps && (
          <div className="space-y-5">
            <Modal.Header>hola</Modal.Header>
          </div>
        )} */}
        {providers.map((connector) => {
          const Icon = ProvidersIcons[connector.name];

          return (
            <button
              className="flex items-center border-b border-b-surface-container-high dark:border-b-surface-container-high-dark pt-3 pb-2 px-3 gap-4"
              key={connector.uid}
              data-testid={`connect-with-${connector.name}`}
              onClick={(e) => {
                e.preventDefault();
                //   sendEvent(CLICK_CONNECTED_WITH, {
                //     "Wallet Provider": connector.name,
                //   });
                if (!isWalletInstalled(connector.name)) {
                  const web = supportedWallets.find(
                    (item) => item.name === connector.name,
                  );
                  window.open(web?.url, "_blank");
                } else {
                  connect({
                    connector,
                  });
                }
              }}
            >
              {/* {Icon && <Icon className="w-7" />}
              {connector.icon && (
                <Image
                  src={connector.icon}
                  alt={connector.name}
                  width={28}
                  height={28}
                />
              )} */}
              <div className="text-left ">
                <span>{connector.name}</span>
                {connector.name === "MetaMask" && (
                  <div className="text-paragraph dark:text-paragraph-dark text-sm">
                    Recommended
                  </div>
                )}
                {/* TODO Mili: move to the right */}
                {isWalletInstalled(connector.name) ? (
                  <div className="text-paragraph dark:text-paragraph-dark text-sm">
                    Detected
                  </div>
                ) : (
                  ""
                )}
                {error && error.name === connector.name && (
                  <div className="text-error-container dark:text-error-container-dark">
                    {error.error}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui-helpers";
import { useModal } from "helpers";
import { useSignIn2 } from "./useSignin2";

export const useOtherWalletsModal = () => useModal("supported-wallets2");

export const WalletsModal = () => {
  const { isOpen, setIsOpen } = useOtherWalletsModal();
  const { walletsToShow, connectors, connect, error } = useSignIn2();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        {walletsToShow.map((wallet) => {
          if (!wallet) return;
          const Icon = wallet.icon as React.FC<React.SVGAttributes<SVGElement>>;
          const connector = connectors.find((c) => c.name === wallet.name);
          return (
            <div
              key={wallet.name}
              onClick={() => {
                if (connector) {
                  connect({ connector });
                } else {
                  window.open(wallet.url, "_blank");
                }
              }}
            >
              {Icon && <Icon className="w-7" />}
              {wallet.name}
              {connector && "Detected"}
              {error && error.name === wallet.name && "Error"}
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

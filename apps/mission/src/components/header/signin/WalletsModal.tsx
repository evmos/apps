// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui-helpers";
import { useModal } from "helpers";
import { useSignIn2 } from "./useSignin2";
import { Wallets } from "./Wallets";
import { Menu } from "@headlessui/react";
export const useOtherWalletsModal = () => useModal("supported-wallets2");

export const WalletsModal = () => {
  const { isOpen, setIsOpen } = useOtherWalletsModal();
  const { walletsToShow } = useSignIn2();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        <Menu>
          <Wallets wallets={walletsToShow} />
        </Menu>
      </Modal.Body>
    </Modal>
  );
};

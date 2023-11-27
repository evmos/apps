// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Dispatch, SetStateAction } from "react";
import { ConnectToEvmos } from "./ConnectToEvmos";
import { ConnectToEvmosWallets } from "./ConnectToEvmosWallets";
import { ModalContainer, Modal } from "@evmosapps/ui-helpers";

export const WalletConnectModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  copilotModal?: JSX.Element;
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContainer
        introduction={<ConnectToEvmos />}
        content={<ConnectToEvmosWallets setIsOpen={setIsOpen} />}
      />
    </Modal>
  );
};

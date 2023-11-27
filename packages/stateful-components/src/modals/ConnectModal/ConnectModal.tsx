"use client";
import { ConnectToEvmos } from "@evmosapps/evmos-wallet/src/copilot/ConnectToEvmos";
import { modalLink, useModal } from "helpers";
import { ModalContainer, Modal } from "@evmosapps/ui-helpers";
import { ConnectModalContent } from "./ConnectModalContent";

export const useConnectModal = () => useModal("connect");
export const ConnectModalButton = modalLink("connect");

export const ConnectModal = () => {
  const { isOpen, setIsOpen } = useConnectModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="p-0 overflow-hidden max-w-3xl">
        <ModalContainer
          introduction={<ConnectToEvmos />}
          content={<ConnectModalContent setIsOpen={setIsOpen} />}
        />
      </Modal.Body>
    </Modal>
  );
};

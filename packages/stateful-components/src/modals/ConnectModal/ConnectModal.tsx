// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
// import { ConnectToEvmos } from "@evmosapps/evmos-wallet/src/copilot/ConnectToEvmos";
import { modalLink, useModal } from "helpers";
import {
  ModalContainer,
  Modal,
  IntroductionModal,
} from "@evmosapps/ui-helpers";
import { ConnectModalContent } from "./ConnectModalContent";

export const useConnectModal = () => useModal("connect");
export const ConnectModalTrigger = modalLink("connect");

export const ConnectModal = () => {
  const { isOpen, setIsOpen } = useConnectModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="p-0 overflow-hidden max-w-3xl">
        <ModalContainer
          introduction={
            <IntroductionModal
              title="Connect your account"
              description={
                <>
                  <p className="text-gray1 text-sm">Get started with Evmos!</p>
                  <p className="text-gray1 text-sm">
                    We recommend for first-time users to use
                    <b> Evmos Copilot</b>.
                  </p>
                </>
              }
            />
          }
          content={<ConnectModalContent setIsOpen={setIsOpen} />}
        />
      </Modal.Body>
    </Modal>
  );
};

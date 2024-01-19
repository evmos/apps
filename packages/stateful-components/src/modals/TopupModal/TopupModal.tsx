// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { TopupFlow } from "@evmosapps/copilot/src/topup/topup-flow";
import { Modal, ModalProps } from "@evmosapps/ui-helpers/src/Modal";
import { withClosePrompt } from "@evmosapps/copilot/src/partials/close-prompt";
import { modalLink, useModal } from "helpers/src/modals";
export const useTopupModal = () => useModal("topup");

export const TopupModalTrigger = modalLink("topup");
const TopupModalContent = withClosePrompt((props: ModalProps) => {
  const { isOpen } = props;
  return (
    <Modal {...props}>
      <Modal.Body className="p-0 overflow-hidden max-w-3xl">
        {isOpen && <TopupFlow />}
      </Modal.Body>
    </Modal>
  );
});
export const TopupModal = () => {
  const { isOpen, setIsOpen } = useTopupModal();
  return <TopupModalContent isOpen={isOpen} setIsOpen={setIsOpen} />;
};

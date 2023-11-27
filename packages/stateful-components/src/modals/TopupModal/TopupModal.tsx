"use client";

import { useModal } from "helpers";

import { Modal } from "@evmosapps/ui-helpers";

import { TopupFlow } from "@evmosapps/copilot/src/topup/topup-flow";
import { ModalProps } from "@evmosapps/ui-helpers/src/Modal";
import { withClosePrompt } from "@evmosapps/copilot/src/partials/close-prompt";
export const useTopupModal = () => useModal("topup");

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

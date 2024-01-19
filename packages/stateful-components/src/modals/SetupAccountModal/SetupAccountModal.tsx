// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { modalLink, useModal } from "helpers";
import { Modal } from "@evmosapps/ui-helpers";
import { SetupAccountFlow } from "@evmosapps/copilot/src/setup-account/setup-account-flow";
import { z } from "zod";
import { ModalProps } from "@evmosapps/ui-helpers/src/Modal";
import { withClosePrompt } from "@evmosapps/copilot/src/partials/close-prompt";

const setupAccountModalSchema = z.object({
  step: z.string().optional(),
});
export const useSetupCopilotModal = () =>
  useModal("setup-copilot", setupAccountModalSchema);

export const SetupAccountModalTrigger = modalLink(
  "setup-copilot",
  setupAccountModalSchema
);

const SetupAccountModalContent = withClosePrompt(
  (
    props: ModalProps & {
      onStepChange: (step: string) => void;
      initialStepId?: string;
    }
  ) => {
    const { isOpen, initialStepId, onStepChange, ...rest } = props;
    return (
      <Modal isOpen={isOpen} {...rest}>
        <Modal.Body className="p-0 overflow-hidden max-w-3xl">
          {isOpen && (
            <SetupAccountFlow
              initialStepId={initialStepId}
              onStepChange={onStepChange}
            />
          )}
        </Modal.Body>
      </Modal>
    );
  }
);
export const SetupAccountModal = () => {
  const { isOpen, setIsOpen, modalProps } = useSetupCopilotModal();
  return (
    <SetupAccountModalContent
      initialStepId={modalProps?.step}
      onStepChange={(step) => {
        modalProps?.setState((prev) => ({
          ...prev,
          step,
        }));
      }}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    />
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { useModal } from "helpers";
import { useTranslation } from "@evmosapps/i18n/client";

export const useConfirmCosmosTxModal = () => useModal("confirm-cosmos-modal");

export const ConfirmCosmosTxModal = () => {
  const { isOpen, setIsOpen } = useConfirmCosmosTxModal();
  const { t } = useTranslation("dappStore");

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Modal.Body>
        <div className="space-y-5">
          <Modal.Header>{t("profile.cosmosModal.title")}</Modal.Header>
          <div className="flex flex-col space-y-6 text-paragraph dark:text-paragraph-dark">
            <h2>{t("profile.cosmosModal.subtitle")}</h2>
            <p>{t("profile.cosmosModal.description")}</p>
          </div>

          <Modal.Separator />
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => {
                // TODO: check functionality
                setIsOpen(false);
              }}
            >
              {t("profile.cosmosModal.buttonConfirm")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

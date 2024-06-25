// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { useModal } from "helpers";
import purple from "../../../../public/purple.png";
import orange from "../../../../public/orange.png";
import { Checkbox } from "@evmosapps/ui/components/checkboxs/checkbox.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { IconAlertTriangle } from "@evmosapps/ui/icons/line/alerts/alert-triangle.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";

import { alertsManager } from "@evmosapps/ui/components/alert/alert-manager.tsx";
import { useState } from "react";
import { IconUserCross } from "@evmosapps/ui/icons/line/users/user-cross.tsx";

import { useDisconnect } from "wagmi";

export const useDeleteProfileModal = () => useModal("delete-profile");
export const profileImages = [purple, orange];

export const DeleteProfileModal = () => {
  const { isOpen, setIsOpen, modalProps } = useDeleteProfileModal();
  const { setIsDropdownOpen } = useWallet();

  const { t } = useTranslation("dappStore");
  const [checked, setChecked] = useState(false);
  const [acknowledgeDelete, setAcknowledgeDelete] = useState(false);

  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {},
    },
  });
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => {}}>
      <Modal.Body>
        {modalProps && (
          <div className="space-y-5">
            <Modal.Header showCloseButton={false}>
              <div className="flex items-center space-x-1.5 ">
                <IconAlertTriangle className="text-paragraph dark:text-paragraph-dark" />
                <h1>{t("profile.deleteModal.title")}</h1>
              </div>
            </Modal.Header>
            <div className="flex flex-col  space-y-6 text-paragraph dark:text-paragraph-dark">
              <h2 className="text-base">{t("profile.deleteModal.subtitle")}</h2>
              <p>{t("profile.deleteModal.description")}</p>
              <Checkbox
                id="delete-profile-checkbox"
                label={t("profile.deleteModal.acknowledge")}
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
                  setAcknowledgeDelete(false);
                }}
                isFocused={!checked && acknowledgeDelete ? true : false}
              />
            </div>

            <Modal.Separator />
            <div className="flex justify-end space-x-4">
              <Button
                variant="low-emphasis"
                onClick={() => {
                  setAcknowledgeDelete(false);
                  setIsOpen(false);
                  setChecked(false);
                }}
              >
                {t("profile.deleteModal.cancel")}
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setAcknowledgeDelete(true);
                  if (checked) {
                    // TODO: add db functionality to delete profile
                    setIsOpen(false);
                    alertsManager.success({
                      title: t("profile.deleteModal.alert"),
                      icon: IconUserCross,
                    });
                    setChecked(false);
                    setAcknowledgeDelete(false);
                    setIsDropdownOpen(false);
                    disconnect();
                  }
                }}
              >
                {t("profile.deleteModal.accept")}
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

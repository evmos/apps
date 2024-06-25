// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useModal } from "helpers";
import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { alertsManager } from "@evmosapps/ui/components/alert/alert-manager.tsx";

export const useReConnectModal = () => useModal("re-connect");

export const ReConnectModal = () => {
  const { isOpen, setIsOpen } = useReConnectModal();
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
          <Modal.Header>{t("profile.reconnect.title")}</Modal.Header>
          <p className="text-subheading dark:text-subheading-dark text-base">
            {t("profile.reconnect.body")}
          </p>
          <Modal.Separator />
          <div className="flex justify-end">
            <Button
              onClick={() => {
                alertsManager.success({
                  title: t("profile.reconnect.alert"),
                });
                setIsOpen(false);
                // TODO: add Re-Connect logic
              }}
            >
              {t("profile.reconnect.button")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

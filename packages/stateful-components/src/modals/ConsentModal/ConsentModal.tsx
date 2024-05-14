// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { modalLink, useModal } from "helpers";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { disableMixpanel, enableMixpanel } from "tracker";
import { Trans } from "react-i18next";
import { Button } from "@evmosapps/ui/button/index.tsx";

export const useConsentModal = () => useModal("consent");
export const ConsentModalTrigger = modalLink("consent");
export const ConsentModal = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useConsentModal();

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Modal.Body>
        {modalProps && (
          <div className="space-y-5">
            <Modal.Header>
              <h2 className="font-bold">{t("tos.title")}</h2>
            </Modal.Header>
            <div>
              <Trans
                t={t}
                i18nKey="consent.description"
                components={{
                  cookies: (
                    <Link
                      className="cursor-pointer underline"
                      href={"/cookie-policy"}
                    />
                  ),
                }}
              />
            </div>
            <div className="flex items-center justify-center space-x-5">
              <Button
                className="w-full"
                onClick={() => {
                  enableMixpanel();
                  setIsOpen(false);
                }}
              >
                {t("consent.acceptButton")}
              </Button>
              <Button
                variant="low-emphasis"
                className="w-full"
                onClick={() => {
                  disableMixpanel();
                  setIsOpen(false);
                }}
              >
                {t("consent.rejectButton")}
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

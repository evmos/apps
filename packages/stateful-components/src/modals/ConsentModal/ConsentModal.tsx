// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui-helpers";

import { modalLink, useModal } from "helpers";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import GrayButton from "@evmosapps/ui-helpers/src/GrayButton";
import { disableMixpanel, enableMixpanel } from "tracker";
import { Trans } from "react-i18next";

export const useConsentModal = () => useModal("consent");
export const ConsentModalTrigger = modalLink("consent");
export const ConsentModal = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useConsentModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
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
                  privacy: (
                    <Link
                      className="cursor-pointer underline"
                      href={"/privacy-policy"}
                    />
                  ),
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
              <GrayButton
                className="bg-red-300 hover:bg-red1 text-white"
                onClick={() => {
                  enableMixpanel();

                  setIsOpen(false);
                }}
              >
                {t("consent.acceptButton")}
              </GrayButton>
              <GrayButton
                onClick={() => {
                  disableMixpanel();
                  setIsOpen(false);
                }}
              >
                {t("consent.rejectButton")}
              </GrayButton>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

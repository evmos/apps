"use client";

import { Modal } from "@evmosapps/ui-helpers";

import { modalLink, useModal } from "helpers";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import GrayButton from "@evmosapps/ui-helpers/src/GrayButton";
import {
  DISABLE_TRACKER_LOCALSTORAGE,
  disableMixpanel,
  enableMixpanel,
} from "tracker";
import { Trans } from "react-i18next";

export const useConsentModal = () => useModal("consent");
export const ConsentModalButton = modalLink("consent");
export const ConsentModal = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useConsentModal();

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body className="bg-pearl">
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

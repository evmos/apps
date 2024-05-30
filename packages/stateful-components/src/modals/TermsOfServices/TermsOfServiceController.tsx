// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { modalLink, useModal } from "helpers";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { EVMOS_TOS_VERSION } from "@evmosapps/constants";
import { enableMixpanel } from "tracker";

import { useEffect, useState } from "react";
import { Button } from "@evmosapps/ui/button/index.tsx";

export const useTOSModal = () => useModal("tos");
export const TOSModalTrigger = modalLink("tos");

export const TermsOfServicesModalController = () => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useTOSModal();
  const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);

  useEffect(() => {
    setAcknowledgeTOS(window.localStorage.getItem(EVMOS_TOS_VERSION) !== null);
  }, [isOpen]);

  useEffect(() => {
    if (window.localStorage.getItem(EVMOS_TOS_VERSION) !== null) return;

    setIsOpen(true);
  }, [setIsOpen]);

  const guardedSetIsOpen: React.Dispatch<React.SetStateAction<boolean>> = (
    isOpen,
  ) => {
    const next = typeof isOpen === "function" ? isOpen(!isOpen) : isOpen;
    if (!next && acknowledgeTOS === false) {
      return;
    }
    setIsOpen(next);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={guardedSetIsOpen} onClose={() => {}}>
      <Modal.Body className="px-8 w-[510px]">
        <Modal.Header showCloseButton={false}>{t("tos.title")}</Modal.Header>
        {modalProps && (
          <div className="relative rounded-lg w-full mt-8 max-w-2xl">
            <div className="mb-8 border-surface-container-highest dark:border-surface-container-highest-dark space-y-3 overflow-y-auto border p-3 rounded-lg text-subheading dark:text-subheading-dark">
              <p>You are now launching the Evmos dApp Store.</p>
              <p>
                By continuing, you are acknowledging to the{" "}
                <Link className="underline" href="/terms-of-service">
                  Terms of Service
                </Link>
                ,{" "}
                <Link className="underline" href="/privacy-policy">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link className="underline" href="/cookie-policy">
                  Cookie Policy.
                </Link>
              </p>
            </div>
            <Modal.Separator />
            <div className="flex justify-end mt-6 ">
              <Button
                data-testid="accept-tos-button"
                onClick={() => {
                  localStorage.setItem(EVMOS_TOS_VERSION, "true");
                  enableMixpanel();
                  setIsOpen(false);
                }}
              >
                {t("tos.acceptButton")}
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

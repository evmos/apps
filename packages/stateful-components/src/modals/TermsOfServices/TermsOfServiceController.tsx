// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Modal } from "@evmosapps/ui-helpers";
import { cn, modalLink, useModal } from "helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { EVMOS_TOS_VERSION } from "constants-helper";
import { disableMixpanel, enableMixpanel, isTrackerEnabled } from "tracker";

import { PropsWithChildren, useEffect, useState } from "react";
import { useConsentModal } from "../ConsentModal/ConsentModal";
import { Trans } from "react-i18next";

export const useTOSModal = () => useModal("tos");
export const TOSModalTrigger = modalLink("tos");

export const TermsOfServicesModalController = ({
  children,
}: PropsWithChildren) => {
  const { t } = useTranslation();
  const { isOpen, setIsOpen, modalProps } = useTOSModal();

  const consentModal = useConsentModal();

  const [acknowledgeTOS, setAcknowledgeTOS] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setAcknowledgeTOS(window.localStorage.getItem(EVMOS_TOS_VERSION) !== null);
    setConsent(isTrackerEnabled());
  }, [isOpen]);

  useEffect(() => {
    if (window.localStorage.getItem(EVMOS_TOS_VERSION) !== null) return;

    setIsOpen(true);
  }, [setIsOpen]);

  const guardedSetIsOpen: React.Dispatch<React.SetStateAction<boolean>> = (
    isOpen
  ) => {
    const next = typeof isOpen === "function" ? isOpen(!isOpen) : isOpen;
    if (!next && acknowledgeTOS === false) {
      return;
    }
    setIsOpen(next);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={guardedSetIsOpen}>
      <Modal.Body>
        {modalProps && (
          <div className="relative rounded-lg w-full space-y-4 max-w-2xl">
            <h2 className="font-bold">{t("tos.title")}</h2>
            <div className="border-darkGray5 h-80 w-full space-y-3 overflow-y-auto border p-4 font-display">
              {children}
            </div>
            <div className={`flex items-center space-x-2`}>
              <input
                type="checkbox"
                id="acknowledgeTOS"
                data-testid="accept-tos-checkbox"
                checked={acknowledgeTOS}
                onChange={(e) => {
                  setAcknowledgeTOS(e.target.checked);
                }}
              />
              <label htmlFor="acknowledgeTOS" className="cursor-pointer">
                {t("tos.checks.acknowledgeTOS")}
              </label>
            </div>
            <div className={`flex items-center space-x-2 `}>
              <input
                type="checkbox"
                id="consent"
                data-testid="consent-checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                }}
              />
              <label htmlFor="consent" className="cursor-pointer">
                <Trans
                  t={t}
                  i18nKey={"tos.checks.consentTracking"}
                  components={{
                    button: (
                      <a
                        className="font-bold cursor-pointer hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          consentModal.setIsOpen(true, {}, true);
                        }}
                      />
                    ),
                  }}
                />
              </label>
            </div>
            <button
              className={cn(
                "bg-red-300 text-pearl hover:bg-red1 rounded px-8 py-2 text-lg font-bold uppercase w-full",
                {
                  disabled: !acknowledgeTOS,
                }
              )}
              data-testid="accept-tos-button"
              onClick={() => {
                localStorage.setItem(EVMOS_TOS_VERSION, "true");
                if (consent) {
                  enableMixpanel();
                } else {
                  disableMixpanel();
                }
                setIsOpen(false);
              }}
            >
              {t("tos.acceptButton")}
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

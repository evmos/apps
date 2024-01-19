// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { AlertIcon } from "@evmosapps/icons/AlertIcon";
import { createContext, useContext, useEffect, useState } from "react";

import { PrimaryButton } from "@evmosapps/ui-helpers";
import { Modal, ModalProps } from "@evmosapps/ui-helpers/src/Modal";
import { raise, useEffectEvent } from "helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { EXIT_OUT_COPILOT, sendEvent } from "tracker";

const ClosePromptContext = createContext<{
  setClosePromptEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isClosePromptEnabled: boolean;
} | null>(null);

export const useClosePrompt = () => {
  return (
    useContext(ClosePromptContext) ?? raise("ClosePromptContext not found")
  );
};
export const withClosePrompt = <T extends ModalProps>(
  Component: (props: T) => React.ReactElement
) => {
  return function ClosePrompt(props: T) {
    const { t } = useTranslation("copilot");
    const { setIsOpen } = props;
    const [isClosePromptOpen, setClosePromptOpen] = useState(false);
    const [isClosePromptEnabled, setClosePromptEnabled] = useState(true);

    const promptClose = useEffectEvent((open: boolean) => {
      if (isClosePromptEnabled && open === false) {
        setClosePromptOpen(true);
        return;
      }
      setIsOpen(open);
    });

    useEffect(() => {
      if (props.isOpen) {
        setClosePromptEnabled(true);
      }
    }, [props.isOpen]);
    return (
      <ClosePromptContext.Provider
        value={{ setClosePromptEnabled, isClosePromptEnabled }}
      >
        <Component {...props} setIsOpen={promptClose} />
        <Modal isOpen={isClosePromptOpen} setIsOpen={setClosePromptOpen}>
          <Modal.Body>
            <div className="flex">
              <div className="items-start justify-start">
                <span
                  role="img"
                  aria-label="alert icon"
                  className="border-pink bg-pink flex items-center justify-center rounded-full border p-2"
                >
                  <AlertIcon
                    width={24}
                    height={24}
                    color="#dc2626"
                    className="relative -top-[1px]"
                  />
                </span>
              </div>
              <div className="mx-5 mt-0 space-y-3">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  {t("exitPrompt.title")}
                </h3>

                <p>{t("exitPrompt.description")}</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setClosePromptOpen(false);
                    }}
                    className="color-gray300 border-gray300 rounded-lg border px-8 py-2 font-normal shadow transition-all duration-300 hover:shadow-md focus-visible:outline-none"
                  >
                    {t("exitPrompt.accept")}
                  </button>

                  <PrimaryButton
                    onClick={() => {
                      setIsOpen(false);
                      setClosePromptOpen(false);
                      sendEvent(EXIT_OUT_COPILOT);
                    }}
                    className="w-auto px-8"
                  >
                    {t("exitPrompt.reject")}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </ClosePromptContext.Provider>
    );
  };
};

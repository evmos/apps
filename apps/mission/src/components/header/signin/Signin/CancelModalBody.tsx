// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { useTranslation } from "@evmosapps/i18n/client";

export const CancelModalBody = ({
  setIsOpen,
  setSignInStep,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSignInStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation("dappStore");

  const handleOnClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="space-y-5">
        <Modal.Header showCloseButton={false}>
          {t("signIn.modal.cancel.title")}
        </Modal.Header>
        <p className="text-subheading mr-10 dark:text-subheading-dark">
          {t("signIn.modal.cancel.body")}
        </p>
        <Modal.Separator />

        <div className="flex justify-end gap-3 items-center">
          <div className="flex justify-end">
            <Button
              variant="low-emphasis"
              onClick={() => {
                setSignInStep(0);
              }}
            >
              {t("signIn.modal.button")}
            </Button>
          </div>
          <div className="flex justify-end">
            <Button variant="error" onClick={handleOnClick}>
              {t("signIn.modal.skip.button")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

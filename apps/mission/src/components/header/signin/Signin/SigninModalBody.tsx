// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Chip } from "@evmosapps/ui/chips/Chip.tsx";
import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { IconCheck } from "@evmosapps/ui/icons/line/basic/check.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { useState } from "react";

export const SigninModalBody = ({
  modalProps,
  setSignInStep,
}: {
  modalProps: "";
  setSignInStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation("dappStore");
  const { address } = useWallet();
  const [verified] = useState(false);

  const handleOnClick = () => {
    setSignInStep(1);
  };

  return (
    <>
      {modalProps && (
        <div className="space-y-5">
          <Modal.Header>{t("signIn.modal.title")}</Modal.Header>
          <p className="text-subheading mr-10 dark:text-subheading-dark">
            {t("signIn.modal.body")}
          </p>
          <Modal.Separator />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div
                className="text-base bg-success/5 dark:bg-success-dark/5 text-success dark:text-success-dark flex items-center justify-center rounded-full"
                style={{ width: "40px", height: "40px" }}
              >
                01
              </div>
              <div>
                <div className="text-base text-heading dark:text-heading-dark">
                  {t("signIn.modal.connectWallet")}
                </div>
                <div className="text-base text-subheading dark:text-subheading-dark">
                  {`${address?.slice(0, 6)}...${address?.slice(-3)}`}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Chip variant={"success"}>
                <IconCheck />
                {t("signIn.modal.connected")}
              </Chip>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div
                className="text-base bg-primary-container dark:bg-primary-container-dark text-on-primary-container dark:text-on-primary-container-dark flex items-center justify-center rounded-full"
                style={{ width: "40px", height: "40px" }}
              >
                02
              </div>
              <div>
                <div className="text-base text-heading dark:text-heading-dark">
                  {t("signIn.modal.verify")}
                </div>
                <div className="text-base text-subheading dark:text-subheading-dark">
                  {t("signIn.modal.signature")}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              {verified ? (
                <Chip variant={"success"}>
                  <IconCheck />
                  {t("signIn.modal.verified")}
                </Chip>
              ) : (
                <Button onClick={handleOnClick}>
                  {t("signIn.modal.button")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

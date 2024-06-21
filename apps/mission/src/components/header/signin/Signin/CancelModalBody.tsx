import { Chip } from "@evmosapps/ui/chips/Chip.tsx";
import { Modal, ModalProps } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { IconCheck } from "@evmosapps/ui/icons/line/basic/check.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { useState } from "react";

export const CancelModalBody = ({modalProps, setIsOpen, setSignInStep} : {modalProps: any, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, setSignInStep: React.Dispatch<React.SetStateAction<number>>}) => {
    const { t } = useTranslation("dappStore");


    const handleOnClick = () => {
      setIsOpen(false)
    };
    
    return (
      <>
        {modalProps && (
          <div className="space-y-5">
            <Modal.Header showCloseButton={false}>{t("signIn.modal.cancel.title")}</Modal.Header>
            <p className="text-subheading mr-10 dark:text-subheading-dark">
              {t("signIn.modal.cancel.body")}
            </p>
            <Modal.Separator />
            
            <div className="flex justify-end gap-5 items-center">
              <div className="flex justify-end">
                 <Button variant="low-emphasis" onClick={() => {
                  setSignInStep(0)
                 }}>
                 {t("signIn.modal.button")}
                </Button>
              </div>
              <div className="flex justify-end">
                 <Button variant="error" onClick={handleOnClick}>
                 {t("skip.button")}
                </Button>
              </div>
            </div>
          </div>
        )}
        </>
    )
}
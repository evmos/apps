// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { useModal } from "helpers";
import { Checkbox } from "@evmosapps/ui/components/checkboxs/checkbox.tsx";
import { Trans, useTranslation } from "@evmosapps/i18n/client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

export const useConfirmEVMTxModal = () => useModal("confirm-evm-modal");

export const ConfirmEVMTxModal = () => {
  const { isOpen, setIsOpen } = useConfirmEVMTxModal();
  // TODO: use the profile address
  const { address } = useAccount();
  const { t } = useTranslation("dappStore");
  const [checked, setChecked] = useState(false);
  const [acknowledgeDelete, setAcknowledgeDelete] = useState(false);
  const router = useRouter();
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
          <Modal.Header>{t("profile.evmModal.title")}</Modal.Header>
          <div className="flex flex-col space-y-6 text-paragraph dark:text-paragraph-dark">
            <h2>{t("profile.evmModal.subtitle")}</h2>
            <p>
              <Trans
                ns="dappStore"
                shouldUnescape={true}
                i18nKey="profile.evmModal.description"
                components={{
                  span: (
                    <span className="text-primary-container dark:text-primary-container-dark break-all" />
                  ),
                }}
                values={{
                  address: address,
                }}
              />
            </p>
            <Checkbox
              id="delete-profile-checkbox"
              label={
                <Trans
                  ns="dappStore"
                  shouldUnescape={true}
                  i18nKey="profile.evmModal.acknowledge"
                  components={{
                    span: (
                      <span className="text-primary-container dark:text-primary-container-dark break-all" />
                    ),
                  }}
                  values={{
                    address: `${address?.slice(0, 6)}...${address?.slice(-3)}`,
                  }}
                />
              }
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                setAcknowledgeDelete(false);
              }}
              isFocused={!checked && acknowledgeDelete ? true : false}
            />
          </div>

          <Modal.Separator />
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => {
                setAcknowledgeDelete(true);
                if (checked) {
                  // TODO: allow the tx to go through
                  setIsOpen(false);
                  setChecked(false);
                  setAcknowledgeDelete(false);
                  // TODO: I created this approach but maybe we have to rethink it when we use it on the modals for the txns
                  const url = new URL(window.location.href);
                  url.searchParams.delete("action");
                  url.searchParams.set("confirm-evm-tx", checked.toString());
                  router.push(url.toString());
                }
              }}
            >
              {t("profile.evmModal.buttonConfirm")}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

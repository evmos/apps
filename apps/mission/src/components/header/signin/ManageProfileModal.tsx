// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useModal } from "helpers";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";

// import { useWallet } from "@evmosapps/evmos-wallet";
import { useTranslation } from "@evmosapps/i18n/client";

export const useManageProfileModal = () => useModal("manage-profile");

export const ManageProfileModal = () => {
  const { isOpen, setIsOpen } = useManageProfileModal();
  //   const { setIsDropdownOpen } = useWallet();

  const { t } = useTranslation("dappStore");
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        // setIsOpen(false);
        // setIsDropdownOpen(true);
      }}
    >
      <Modal.Body>
        <div className="space-y-5">
          <Modal.Header>{t("manageProfile.title")}</Modal.Header>
          <p className="text-subheading mr-10 dark:text-subheading-dark">
            {t("manageProfile.description")}
          </p>
          <Modal.Separator />
        </div>
      </Modal.Body>
    </Modal>
  );
};

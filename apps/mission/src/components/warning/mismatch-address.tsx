// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useEffect, useState } from "react";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { Alert } from "@evmosapps/ui/components/alert/index.tsx";
import { IconAlertCircle } from "@evmosapps/ui/icons/line/alerts/alert-circle.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { useManageProfileModal } from "../header/signin/ManageProfileModal";
import { useAccount } from "wagmi";

export const MismatchAddress = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const { t } = useTranslation("dappStore");

  const handleDismiss = () => {
    setAlertVisible(false);
  };

  const { address } = useAccount();

  useEffect(() => {
    // TODO: compare between the address on the wallet and the one on the profile
    if (address) {
      // we only dismiss the alert if the user changes addresses or x'out
      setAlertVisible(true);
    }
  }, [address]);

  const manageProfileModal = useManageProfileModal();
  const handleClick = () => {
    manageProfileModal.setIsOpen(true, {}, true);
  };

  if (!isAlertVisible) {
    return null;
  }
  return (
    <div className="my-4">
      <Alert variant="warning" dismiss={handleDismiss}>
        <Alert.Header icon={IconAlertCircle}>
          {t("warning.mismatch.title")}
        </Alert.Header>
        <Alert.Body>{t("warning.mismatch.body")}</Alert.Body>
        <Alert.Actions>
          <Button size="sm" variant="warning" onClick={handleClick}>
            <span>{t("warning.mismatch.button")}</span>
          </Button>
        </Alert.Actions>
      </Alert>
    </div>
  );
};

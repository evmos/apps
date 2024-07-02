// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { Alert } from "@evmosapps/ui/components/alert/index.tsx";
import { IconAlertCircle } from "@evmosapps/ui/icons/line/alerts/alert-circle.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { useManageProfileModal } from "../header/signin/ManageProfileModal";
import { useAccount } from "wagmi";
import { useUserSession } from "@evmosapps/user/auth/use-user-session.ts";

// Implement withSuspense
const withSuspense = <P extends JSX.IntrinsicElements["div"]>(
  Component: React.ComponentType<P>,
  { fallback }: { fallback: React.ReactNode },
) => {
  const Suspended = (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );

  Suspended.displayName = `withSuspense(${Component.displayName || Component.name || "Component"})`;

  return Suspended;
};

// Define MismatchAddressComponent
const MismatchAddressComponent: React.FC = () => {
  const [isAlertVisible, setAlertVisible] = useState(false);

  const { t } = useTranslation("dappStore");

  const handleDismiss = () => {
    setAlertVisible(false);
  };

  const { address } = useAccount();

  const { data: session } = useUserSession();

  const user = session?.user;
  const profileAddress = user?.walletAccount[0]?.address;
  useEffect(() => {
    if (user && address !== undefined && address !== profileAddress) {
      // we only dismiss the alert if the user changes addresses or x'out
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }
  }, [address, user]);

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

// Export MismatchAddress with Suspense
export const MismatchAddress = withSuspense(MismatchAddressComponent, {
  fallback: null,
});

MismatchAddressComponent.displayName = "MismatchAddressComponent";

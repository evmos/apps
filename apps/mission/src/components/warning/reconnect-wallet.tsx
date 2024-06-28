// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import React, { Suspense, useState } from "react";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { Alert } from "@evmosapps/ui/components/alert/index.tsx";
import { IconAlertCircle } from "@evmosapps/ui/icons/line/alerts/alert-circle.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { useReConnectModal } from "../header/signin/ModalReConnect";

// Implement withSuspense
const withSuspense = <P extends JSX.IntrinsicElements["div"]>(
  Component: React.ComponentType<P>,
  { fallback }: { fallback: React.ReactNode },
) => {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );

  WrappedComponent.displayName = `withSuspense(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};

// Define ReconnectWarning component
const ReconnectWarningComponent: React.FC = () => {
  const [isAlertVisible, setAlertVisible] = useState(true);
  const { t } = useTranslation("dappStore");

  const handleDismiss = () => {
    setAlertVisible(false);
  };

  const ReConnectModal = useReConnectModal();
  const handleReconnect = () => {
    ReConnectModal.setIsOpen(true, {}, true);
    //TODO: A reconnection is needed. Now a modal is executed just to test it.
  };

  const handleTestAlert = () => {
    setAlertVisible(true);
  };

  return (
    <div className="my-4">
      {isAlertVisible ? (
        <Alert variant="warning" dismiss={handleDismiss}>
          <Alert.Header icon={IconAlertCircle}>
            {t("warning.reconnect.title")}
          </Alert.Header>
          <Alert.Body>{t("warning.reconnect.body")}</Alert.Body>
          <Alert.Actions>
            <Button size="sm" variant="warning" onClick={handleReconnect}>
              <span>{t("warning.reconnect.button")}</span>
            </Button>
          </Alert.Actions>
        </Alert>
      ) : (
        <Button size="sm" variant="warning" onClick={handleTestAlert}>
          <span>Test alert</span>
        </Button>
      )}
    </div>
  );
};

// Export ReconnectWarning with Suspense
export const ReconnectWarning = withSuspense(ReconnectWarningComponent, {
  fallback: null,
});

ReconnectWarningComponent.displayName = "ReconnectWarningComponent";

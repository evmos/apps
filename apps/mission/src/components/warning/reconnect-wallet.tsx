// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useState } from "react";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { Alert } from "@evmosapps/ui/components/alert/index.tsx";
import { IconAlertCircle } from "@evmosapps/ui/icons/line/alerts/alert-circle.tsx";

export const ReconnectWarning = () => {
  const [isAlertVisible, setAlertVisible] = useState(true);

  const handleDismiss = () => {
    setAlertVisible(false);
  };

  const handleReconnect = () => {
    //Sign In
  };

  const handleTestAlert = () => {
    setAlertVisible(true);
  };

  return (
    <div className="my-4">
      {isAlertVisible ? (
        <Alert variant="warning" dismiss={handleDismiss}>
          <Alert.Header icon={IconAlertCircle}>
            Re-connect your wallet.
          </Alert.Header>
          <Alert.Body>
            It seems like your wallet’s been disconnected - re-connect to
            continue using the dApp Store.
          </Alert.Body>
          <Alert.Actions>
            <Button size="sm" variant="warning" onClick={handleReconnect}>
              <span>Connect</span>
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

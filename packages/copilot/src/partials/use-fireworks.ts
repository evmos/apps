// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useRef } from "react";
import { FireworksHandlers } from "@fireworks-js/react";

export const useFireworks = () => {
  const portalContainer = document.createElement("div");
  const fireworksRef = useRef<FireworksHandlers | null>(null);

  const handleStopFireworks = async () => {
    if (fireworksRef.current) {
      await fireworksRef.current.waitStop();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(async () => {
      await handleStopFireworks();
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    document.body.appendChild(portalContainer);
    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);
  return { fireworksRef, portalContainer };
};

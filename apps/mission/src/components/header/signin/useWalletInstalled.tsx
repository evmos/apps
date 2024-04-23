// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useEffect, useState } from "react";

const isProviderInstalled = (provider: string) => {
  return provider in window;
};

export const useInstallProvider = (provider: string) => {
  const [status, setStatus] = useState<
    "not-installed" | "started-install" | "installed"
  >(isProviderInstalled(provider) ? "installed" : "not-installed");

  useEffect(() => {
    if (status !== "started-install") return;
    const handleFocus = () => {
      const isInstalled = isProviderInstalled(provider);

      if (isInstalled) {
        setStatus("installed");
        // sendEvent(SUCCESSFUL_WALLET_INSTALLATION_COPILOT, {
        //   "Wallet Provider": "MetaMask",
        // });
        return;
      }
      // for chrome and brave we need to reload the page to know if the user has Metamask installed
      window.location.reload();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [status, provider]);
  return [setStatus] as const;
};

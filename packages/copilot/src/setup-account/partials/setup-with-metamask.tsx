import { useTranslation } from "@evmosapps/i18n/client";

import { metamaskConnector } from "@evmosapps/evmos-wallet";
import { METAMASK_DOWNLOAD_URL } from "constants-helper";
import { useEffect, useMemo, useState } from "react";
import { E } from "helpers";
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { SetupStep } from "./setup-step";
import {
  CLICK_ON_CONNECT_ACCOUNT_COPILOT,
  CLICK_ON_INSTALL_ACCOUNT_COPILOT,
  SUCCESSFUL_WALLET_INSTALLATION_COPILOT,
  UNSUCCESSFUL_WALLET_CONNECTION_COPILOT,
  sendEvent,
} from "tracker";
import { getEvmosChainInfo } from "@evmosapps/evmos-wallet/src/wallet/wagmi/chains";

const evmosInfo = getEvmosChainInfo();

const isMetamaskInstalled = () => {
  return metamaskConnector.ready;
};

const useInstallMetamask = () => {
  const [status, setStatus] = useState<
    "not-installed" | "started-install" | "installed"
  >(isMetamaskInstalled() ? "installed" : "not-installed");

  useEffect(() => {
    if (status !== "started-install") return;
    const handleFocus = () => {
      const isInstalled = isMetamaskInstalled();

      if (isInstalled) {
        setStatus("installed");
        sendEvent(SUCCESSFUL_WALLET_INSTALLATION_COPILOT);
        return;
      }
      // for chrome and brave we need to reload the page to know if the user has Metamask installed
      window.location.reload();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [status]);
  return [status, setStatus] as const;
};

export const SetupWithMetamaskSteps = () => {
  const { t } = useTranslation("copilot-setup-account");

  const [metamaskStatus, setMetamaskStatus] = useInstallMetamask();

  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const {
    connect,
    isLoading: isConnecting,
    status,
    error: connectError,
  } = useConnect({
    chainId: evmosInfo.id,
  });
  const { switchNetwork, error: switchError } = useSwitchNetwork({
    chainId: evmosInfo.id,
  });

  const mappedConnectError = useMemo(() => {
    if (!connectError && !switchError) return;

    if (
      E.match.byPattern(connectError, /Already processing eth_requestAccounts/)
    ) {
      return t("connectStep.actions.connect.error.pendingRequest");
    }
    if (E.match.byPattern(connectError, /User rejected/)) {
      return t("connectStep.actions.connect.error.rejected");
    }
    if (E.match.byPattern(switchError, /User rejected/g)) {
      return t("connectStep.actions.connect.error.switchRejected");
    }
    if (E.match.byPattern(connectError, /Connector already connected/)) {
      return;
    }

    return connectError?.message;
  }, [connectError, switchError]);

  useEffect(() => {
    if (!mappedConnectError) return;
    sendEvent(UNSUCCESSFUL_WALLET_CONNECTION_COPILOT);
  }, [mappedConnectError]);

  const completedConnection = isConnected && chain?.id === evmosInfo.id;

  return (
    <ul className="gap-y-6 flex flex-col w-full py-2">
      <SetupStep
        onClick={() => {
          sendEvent(CLICK_ON_INSTALL_ACCOUNT_COPILOT);
          window.open(METAMASK_DOWNLOAD_URL, "_blank");
          setMetamaskStatus("started-install");
        }}
        disabled={metamaskStatus !== "not-installed"}
        completed={metamaskStatus === "installed"}
      >
        {metamaskStatus === "not-installed" &&
          t("connectStep.actions.installMetamask.request")}
        {metamaskStatus === "started-install" &&
          t("connectStep.actions.installMetamask.inProgress")}
        {metamaskStatus === "installed" &&
          t("connectStep.actions.installMetamask.installed")}
      </SetupStep>

      <SetupStep
        onClick={() => {
          sendEvent(CLICK_ON_CONNECT_ACCOUNT_COPILOT);

          connect({ connector: metamaskConnector, chainId: evmosInfo.id });
          switchNetwork?.(evmosInfo.id);
        }}
        completed={completedConnection}
        disabled={metamaskStatus !== "installed" || completedConnection}
        error={mappedConnectError}
      >
        {status === "loading" &&
          t("connectStep.actions.connect.waitingApproval")}
        {status !== "loading" &&
          !isConnecting &&
          !completedConnection &&
          t("connectStep.actions.connect.request")}
        {completedConnection && t("connectStep.actions.connect.connected")}
      </SetupStep>
    </ul>
  );
};

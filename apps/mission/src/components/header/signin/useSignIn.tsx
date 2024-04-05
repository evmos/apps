import { getGlobalKeplrProvider } from "@evmosapps/evmos-wallet";
import { useCallback, useMemo, useState } from "react";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { getGlobalLeapProvider } from "@evmosapps/evmos-wallet/src/wallet/utils/leap/getLeapProvider";
import { useQuery } from "@tanstack/react-query";
import { useConnect } from "wagmi";
import { E } from "helpers";
import { WALLET_NOTIFICATIONS } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/errors";

export const useSignIn = () => {
  const { connectors, connect } = useConnect({
    mutation: {
      onSuccess: (_, { connector }) => {
        console.log("connect with ", connector);
        // sendEvent(SUCCESSFUL_WALLET_CONNECTION, {
        //   "Wallet Provider": connector.name,
        // });
        // setIsOpen(false);
      },

      onError: (e, { connector }) => {
        // sendEvent(UNSUCCESSFUL_WALLET_CONNECTION, {
        //   "Wallet Provider": connector.name,
        //   "Error Message": `Failed to connect with ${connector.name}`,
        // });
        if (E.match.byPattern(e, /Connector not found/)) {
          setError({
            error: WALLET_NOTIFICATIONS.ExtensionNotFoundSubtext,
            name: connector.name,
          });

          return;
        }
        if (
          E.match.byCode(e, -32002) || // metamask
          // same message for Leap ?
          E.match.byMessage(e, "PROVIDER_NOT_AVAILABLE") // keplr
        ) {
          setError({
            error: WALLET_NOTIFICATIONS.AddressSubtext,
            name: connector.name,
          });

          return;
        }
        if (
          E.match.byCode(e, 4001) ||
          E.match.byPattern(e, /Connection request reset/) || // wallet connect
          E.match.byPattern(e, /Request rejected/) // keplr
        ) {
          setError({ error: "Connection Rejected", name: connector.name });

          return;
        }

        // Didn't find a match, so we'll just isOpen the error
        setError({
          error: WALLET_NOTIFICATIONS.ErrorTitle,
          name: connector.name,
        });
      },
    },
  });

  const providersDetected = async () => {
    const connected = await Promise.all(
      connectors?.map(async (connector) => {
        if (isCosmosBasedWallet(connector.name)) {
          if (connector.name === "Keplr" && getGlobalKeplrProvider() !== null) {
            return { name: connector.name, installed: true };
          }
          if (connector.name === "Leap" && getGlobalLeapProvider() !== null) {
            return { name: connector.name, installed: true };
          }

          return { name: connector.name, installed: false };
        } else {
          const connec = await connector.getProvider();

          return connec
            ? { name: connector.name, installed: true }
            : { name: connector.name, installed: false };
        }
      }),
    );
    console.log("connected", connected);

    return connected;
  };

  const connectionResponse = useQuery({
    queryKey: ["providers"],
    queryFn: () => providersDetected(),
  });

  const [error, setError] = useState({ name: "", error: "" });
  console.log("connectionResponsedata:", connectionResponse.data);
  return {
    data: connectionResponse.data,
    error,
    isLoading: connectionResponse.isLoading,
    connectors,
    connect,
  };
};

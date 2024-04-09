import { getGlobalKeplrProvider } from "@evmosapps/evmos-wallet";
import { useCallback, useMemo, useState } from "react";
import { isCosmosBasedWallet } from "helpers/src/crypto/wallets/is-cosmos-wallet";
import { getGlobalLeapProvider } from "@evmosapps/evmos-wallet/src/wallet/utils/leap/getLeapProvider";
import { useQuery } from "@tanstack/react-query";
import { Connector, useConnect } from "wagmi";
import { E } from "helpers";
import { WALLET_NOTIFICATIONS } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/errors";

const predefinedWallets = [
  "MetaMask",
  "Rainbow",
  "Coinbase Wallet",
  "Leap",
  "WalletConnect",
];

export const useSignIn = () => {
  const [error, setError] = useState({ name: "", error: "" });

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
        console.log(e);
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
    // Use Promise.all to wait for all promises in `temp` to resolve
    const connected = await Promise.all(
      connectors.map(async (connector) => {
        if (connector.name === "WalletConnect") {
          return { name: connector.name, installed: true };
        }
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

    return connected;
  };

  const connectionResponse = useQuery({
    queryKey: ["test"],
    queryFn: async () => await providersDetected(),
  });

  const cleanProviders = () => {
    return connectors.filter((connector) => {
      if (connector.id.startsWith("io.")) {
        return false;
      }
      if (connector.name === "Safe") return false;
      if (connector.id === "me.rainbow") return false;
      return true;
    });
  };

  const defaultProviders = () => {
    return cleanProviders().filter((connector) => {
      if (!predefinedWallets.includes(connector.name)) {
        return false;
      }
      return true;
    });
  };

  function getProviders(
    defaultProviders: Connector[],
    allProviders: readonly Connector[],
  ) {
    // Create a set of names from default providers for efficient lookups
    const defaultProviderNames = new Set(
      defaultProviders.map((provider) => provider.name),
    );

    // Filter allProviders to exclude providers present in defaultProviderNames
    const missingProviders = allProviders.filter(
      (provider) => !defaultProviderNames.has(provider.name),
    );

    // Return the list of missing providers
    return missingProviders;
  }

  const providers = getProviders(defaultProviders(), cleanProviders());
  return {
    // data: tempResponse,
    data: connectionResponse.data,
    defaultProviders,
    providers,
    error,
    isLoading: false,
    // isLoading: connectionResponse.isLoading,
    connectors,
    connect,
  };
};

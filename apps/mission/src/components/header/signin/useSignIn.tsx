"use client";
import { E } from "helpers";
import { Connector, useConnect } from "wagmi";
import { supportedWallets } from "./supportedWallets";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useState,
} from "react";
import { WALLET_NOTIFICATIONS } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/errors";
import { wagmiConfig } from "@evmosapps/evmos-wallet";
import { disconnect } from "wagmi/actions";

const predefinedWallets = [
  "MetaMask",
  "Rainbow",
  "Coinbase Wallet",
  "Leap",
  "WalletConnect",
];

export type WALLETS_TYPE =
  | {
      name: string;
      url: string;
      icon: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, "ref"> & RefAttributes<SVGSVGElement>
      >;
    }
  | undefined;

export const useSignIn = () => {
  const [error, setError] = useState<
    { name: string; error: string } | undefined
  >();
  const [currentConnector, setCurrentConnector] = useState<
    string | undefined
  >();
  const { connectors, connect } = useConnect({
    mutation: {
      onMutate: async () => {
        setError(undefined);
        const temp = await wagmiConfig.storage?.getItem("recentConnectorId");
        if (temp) {
          setCurrentConnector(temp);
        }
      },
      onSuccess: async (_, { connector }) => {
        if (
          currentConnector &&
          (connector as Connector).id !== currentConnector
        ) {
          await disconnect(wagmiConfig, {
            connector: connectors.find((c) => c.id === currentConnector),
          });
        }

        // sendEvent(SUCCESSFUL_WALLET_CONNECTION, {
        //   "Wallet Provider": connector.name,
        // });
        // setIsOpen(false);
        setError(undefined);
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

  const walletsToShow = supportedWallets.map((wallet) => {
    if (!predefinedWallets.includes(wallet.name)) {
      return wallet;
    }
  });

  const defaultWallets = supportedWallets.map((wallet) => {
    if (predefinedWallets.includes(wallet.name)) {
      return wallet;
    }
  });

  return {
    defaultWallets,
    walletsToShow,
    connectors,
    connect,
    error,
  };
};

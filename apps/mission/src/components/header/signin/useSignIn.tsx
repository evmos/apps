// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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
import { WalletsContext, useWAlletsContext } from "./useWallets";
import { useOtherWalletsModal } from "./WalletsModal";
import useComponentVisible from "./useComponentVisible";

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
  const { setIsOpen } = useOtherWalletsModal();
  const { setIsComponentVisible } = useComponentVisible();
  const { wallets, setWallets } = useWAlletsContext() as WalletsContext;
  const defaultWallets = supportedWallets.filter((item) =>
    wallets.includes(item.name),
  );

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

        setError(undefined);
        setIsOpen(false);
        setWallets(connector.name);
        // TODO Mili: create context for maintaining the dropdown state
        // setIsComponentVisible(true);
      },

      onError: (e, { connector }) => {
        // console.log(e);
        // sendEvent(UNSUCCESSFUL_WALLET_CONNECTION, {
        //   "Wallet Provider": connector.name,
        //   "Error Message": `Failed to connect with ${connector.name}`,
        // });
        if (E.match.byPattern(e, /Connector not found/)) {
          setError({ error: "Connection failed.", name: connector.name });

          return;
        }
        if (
          E.match.byCode(e, -32002) || // metamask
          // same message for Leap ?
          E.match.byMessage(e, "PROVIDER_NOT_AVAILABLE") // keplr
        ) {
          setError({ error: "Connection failed.", name: connector.name });

          return;
        }
        if (
          E.match.byCode(e, 4001) ||
          E.match.byPattern(e, /Connection request reset/) || // wallet connect
          E.match.byPattern(e, /Request rejected/) // keplr
        ) {
          setError({ error: "Connection failed.", name: connector.name });

          return;
        }

        // Didn't find a match, so we'll just isOpen the error
        setError({ error: "Connection failed.", name: connector.name });
      },
    },
  });

  const walletsToShow = supportedWallets.filter(
    (item) => !wallets.includes(item.name),
  );

  return {
    defaultWallets,
    walletsToShow,
    connectors,
    connect,
    error,
  };
};

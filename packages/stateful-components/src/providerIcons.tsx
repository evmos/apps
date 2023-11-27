"use client";
import { KeplrIcon, MetamaskIcon, WalletConnectIcon } from "icons";
import {
  metamaskConnector,
  keplrConnector,
  walletConnectConnector,
} from "@evmosapps/evmos-wallet";

export const ProvidersIcons: {
  [key: string]: React.FC<React.SVGAttributes<SVGElement>>;
} = {
  // [metamaskConnector.id]: <MetamaskIcon width={21} height={24} />,
  // [keplrConnector.id]: <KeplrIcon width={24} height={24} />,
  // [walletConnectConnector.id]: <WalletConnectIcon width={24} height={24} />,
  [metamaskConnector.id]: MetamaskIcon,
  [keplrConnector.id]: KeplrIcon,
  [walletConnectConnector.id]: WalletConnectIcon,
};

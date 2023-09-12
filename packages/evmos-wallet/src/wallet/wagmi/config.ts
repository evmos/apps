import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  keplrConnector,
  metamaskConnector,
  safeConnector,
  walletConnectConnector,
} from "./connectors";
import { getEvmosChainInfo } from "./chains";

const { publicClient } = configureChains(
  [getEvmosChainInfo()],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...(safeConnector.ready
      ? [safeConnector]
      : [metamaskConnector, walletConnectConnector, keplrConnector]),
  ],
  publicClient,
});

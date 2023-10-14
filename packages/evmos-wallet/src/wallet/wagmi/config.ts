import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  keplrConnector,
  metamaskConnector,
  safeConnector,
  walletConnectConnector,
} from "./connectors";
import { getEvmosChainInfo } from "./chains";
const evmos = getEvmosChainInfo();
const { publicClient } = configureChains(
  [getEvmosChainInfo()],
  [publicProvider()]
);
export const evmosClient = publicClient({
  chainId: evmos.id,
});
export const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: [
    ...(safeConnector.ready
      ? [safeConnector]
      : [metamaskConnector, walletConnectConnector, keplrConnector]),
  ],
  publicClient,
});

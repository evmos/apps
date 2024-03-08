// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  ThemeContextProvider,
  ThemeDefinition,
  WalletClientContextProvider,
  darkTheme,
  LiquidityView,
  Tabs,
  TabsConfig,
} from "@leapwallet/elements";
import "@leapwallet/elements/styles.css";
import { useElementsWalletClientConfig } from "./wallet";
import "@interchain-ui/react/styles";

const customElementsTheme: ThemeDefinition = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: "#AC4BFF",
    primaryButton: "#AC4BFF",
  },
  fontFamily: "Inter",
};

const defaults: TabsConfig = {
  [Tabs.SWAP]: {
    defaults: {
      sourceChainId: "osmosis-1",
      destinationChainId: "evmos_9001-2",
    },
  },
  [Tabs.TRANSFER]: {
    title: "Transfers",
    defaults: {
      sourceChainId: "evmos_9001-2",
      sourceAssetSelector: ["denom", "evmos"],
    },
  },
  [Tabs.CROSS_CHAIN_SWAPS]: {
    defaults: {
      destinationChainId: "evmos_9001-2",
    },
  },
};

const CustomLiquidity = () => {
  const walletClientConfig = useElementsWalletClientConfig();

  return (
    <div
      className="rounded-lg md:w-[40rem]"
      style={{
        backgroundColor: darkTheme.colors.backgroundSecondary,
      }}
    >
      <ThemeContextProvider theme={customElementsTheme}>
        <WalletClientContextProvider value={walletClientConfig}>
          <LiquidityView tabsConfig={defaults} />
        </WalletClientContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default CustomLiquidity;

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  ThemeContextProvider,
  ThemeDefinition,
  WalletClientContextProvider,
  darkTheme,
  LiquidityView,
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

const CustomLiquidity = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const walletClientConfig = useElementsWalletClientConfig();

  return (
    <div
      className="rounded-lg"
      style={{
        backgroundColor: darkTheme.colors.backgroundSecondary,
      }}
    >
      <ThemeContextProvider theme={customElementsTheme}>
        <WalletClientContextProvider value={walletClientConfig}>
          <LiquidityView />
        </WalletClientContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default CustomLiquidity;

import { BrowserContext, test } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";
import {
  EVMOS_RPC_URL,
  EVMOS_CHAIN,
  EVMOS_SYMBOL,
  EVMOS_CHAIN_NAME,
} from "evmos-wallet";

export const web3Test = test.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    const [wallet, _, context] = await dappwright.bootstrap("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed:
        process.env.E2E_TEST_SEED ??
        "test test test test test test test test test test test junk",
      headless: false,
    });

    await wallet.addNetwork({
      networkName: EVMOS_CHAIN_NAME,
      rpc: EVMOS_RPC_URL,
      chainId: EVMOS_CHAIN.chainId,
      symbol: EVMOS_SYMBOL,
    });

    await use(context);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

export const helpers = { web3Test };

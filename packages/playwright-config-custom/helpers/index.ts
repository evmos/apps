import { BrowserContext, test } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";

export const web3Test = test.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    const [wallet, _, context] = await dappwright.bootstrap("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed: "test test test test test test test test test test test junk", // could be replaced by a secret seed in the future
      headless: false, // add env and pass it to the command for now tests are defaulted to headed
    });

    // This needs to be refactored using the default constants
    await wallet.addNetwork({
      networkName: "Evmos",
      rpc: "https://evmos-evm.publicnode.com",
      chainId: 9001,
      symbol: "EVMOS",
    });

    await use(context);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

export const helpers = { web3Test };

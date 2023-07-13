import { BrowserContext, test } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";

const E2E_TEST_EVMOS_CHAIN_NAME =
  process.env.E2E_TEST_EVMOS_CHAIN_NAME ?? "Evmos";
const E2E_TEST_EVMOS_RPC_URL =
  process.env.E2E_TEST_EVMOS_RPC_URL ?? "https://eth.bd.evmos.org:8545/";
const E2E_TEST_EVMOS_CHAIN_ID = parseInt(
  process.env.E2E_TEST_EVMOS_CHAIN_ID ?? "9001"
);
const E2E_TEST_EVMOS_SYMBOL = process.env.E2E_TEST_EVMOS_SYMBOL ?? "EVMOS";

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
      networkName: E2E_TEST_EVMOS_CHAIN_NAME,
      rpc: E2E_TEST_EVMOS_RPC_URL,
      chainId: E2E_TEST_EVMOS_CHAIN_ID,
      symbol: E2E_TEST_EVMOS_SYMBOL,
    });

    await use(context);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

export const helpers = { web3Test };

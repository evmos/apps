// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BrowserContext, test } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";
import { launch } from "./metamask-utils";

const E2E_TEST_EVMOS_CHAIN_NAME =
  process.env.E2E_TEST_EVMOS_CHAIN_NAME ?? "Evmos";
const E2E_TEST_EVMOS_RPC_URL =
  process.env.E2E_TEST_EVMOS_RPC_URL ?? "https://evmos.lava.build/";
const E2E_TEST_EVMOS_CHAIN_ID = parseInt(
  process.env.E2E_TEST_EVMOS_CHAIN_ID ?? "9001",
);
const E2E_TEST_EVMOS_SYMBOL = process.env.E2E_TEST_EVMOS_SYMBOL ?? "EVMOS";

const web3Test = test.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    // await cleanupPromise;
    const { wallet, browserContext } = await launch("web3", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed:
        process.env.E2E_TEST_SEED ??
        "test test test test test test test test test test test junk",
      headless: false,
    });
    try {
      await wallet.addNetwork({
        networkName: E2E_TEST_EVMOS_CHAIN_NAME,
        rpc: E2E_TEST_EVMOS_RPC_URL,
        chainId: E2E_TEST_EVMOS_CHAIN_ID,
        symbol: E2E_TEST_EVMOS_SYMBOL,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }

    await use(browserContext);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

const web3TestWithoutNetwork = test.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    const { browserContext } = await launch("nonetweb3", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed:
        process.env.E2E_TEST_SEED ??
        "test test test test test test test test test test test junk",
      headless: false,
    });
    await use(browserContext);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

export const mmFixture = {
  test: web3Test,
  ...web3Test,
};

export const noNetworkMMFixture = {
  test: web3TestWithoutNetwork,
  ...web3TestWithoutNetwork,
};

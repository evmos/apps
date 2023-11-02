import { BrowserContext, test } from "@playwright/test";
import dappwright, {
  Dappwright,
  MetaMaskWallet,
  getWallet,
} from "@tenkeylabs/dappwright";
import os from "os";
import path from "path";
import { rm } from "fs/promises";
import { launch } from "./metamask-utils";

const E2E_TEST_EVMOS_CHAIN_NAME =
  process.env.E2E_TEST_EVMOS_CHAIN_NAME ?? "Evmos";
const E2E_TEST_EVMOS_RPC_URL =
  process.env.E2E_TEST_EVMOS_RPC_URL ?? "https://evmos.lava.build/";
const E2E_TEST_EVMOS_CHAIN_ID = parseInt(
  process.env.E2E_TEST_EVMOS_CHAIN_ID ?? "9001"
);
const E2E_TEST_EVMOS_SYMBOL = process.env.E2E_TEST_EVMOS_SYMBOL ?? "EVMOS";

const clearDappwright = async () => {
  try {
    const workerIndex = process.env.TEST_WORKER_INDEX || "0";

    await rm(
      path.resolve(
        os.tmpdir(),
        "dappwright",
        "session",
        "metamask",
        workerIndex
      ),
      {
        recursive: true,
      }
    );
  } catch (e) {}
};
const cleanupPromise = clearDappwright();
export const web3Test = test.extend<{
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
    // const [wallet, , context] = await dappwright.bootstrap("", {
    //   wallet: "metamask",
    //   version: MetaMaskWallet.recommendedVersion,
    //   seed:
    //     process.env.E2E_TEST_SEED ??
    //     "test test test test test test test test test test test junk",
    //   headless: false,
    // });

    await wallet.addNetwork({
      networkName: E2E_TEST_EVMOS_CHAIN_NAME,
      rpc: E2E_TEST_EVMOS_RPC_URL,
      chainId: E2E_TEST_EVMOS_CHAIN_ID,
      symbol: E2E_TEST_EVMOS_SYMBOL,
    });

    await use(browserContext);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

export const web3TestWithoutNetwork = test.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    // await cleanupPromise;
    // const [, , context] = await dappwright.bootstrap("", {
    //   wallet: "metamask",
    //   version: MetaMaskWallet.recommendedVersion,

    //   seed:
    //     process.env.E2E_TEST_SEED ??
    //     "test test test test test test test test test test test junk",
    //   headless: false,
    // });
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

export const helpers = { web3Test, web3TestWithoutNetwork };
export const mmFixture = {
  test: web3Test,
  ...web3Test,
};

export const noNetworkMMFixture = {
  test: web3TestWithoutNetwork,
  ...web3TestWithoutNetwork,
};

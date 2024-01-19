// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  DappwrightLaunchResponse,
  MetaMaskWallet,
  OfficialOptions,
  getWallet,
} from "@tenkeylabs/dappwright";

import { rm } from "fs/promises";
import os from "os";
import * as path from "path";
import { chromium } from "@playwright/test";

/**
 * Launch Playwright chromium instance with wallet plugin installed
 * */
const sessionPath = path.resolve(os.tmpdir(), "dappwright", "session");

export async function launch(
  browserName: string,
  options: OfficialOptions
): Promise<DappwrightLaunchResponse> {
  const { ...officialOptions } = options;

  const extensionPath = await MetaMaskWallet.download(officialOptions);

  const browserArgs = [
    `--disable-extensions-except=${extensionPath}`,
    `--load-extension=${extensionPath}`,
  ];

  if (options.headless != false) browserArgs.push(`--headless=new`);

  const workerIndex = process.env.TEST_WORKER_INDEX || "0";
  const userDataDir = path.join(
    sessionPath,
    options.wallet,
    workerIndex,
    browserName
  );
  try {
    await rm(userDataDir, { recursive: true });
  } catch (e) {
    // ignore
  }
  const browserContext = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    args: browserArgs,
  });
  const wallet = await getWallet(MetaMaskWallet.id, browserContext);
  await wallet.setup({
    ...officialOptions,
  });
  return {
    wallet,
    browserContext,
  };
}

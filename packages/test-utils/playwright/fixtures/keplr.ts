// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test as base, chromium, type BrowserContext } from "@playwright/test";
import { Keplr } from "../utils/keplr/keplr-controller";
import { downloadRelease } from "../utils/keplr/download-release";
import { tmpdir } from "os";
import path from "path";

const makeKeplr = async (context: BrowserContext, extensionId: string) => {
  const keplr = new Keplr(context, extensionId);

  await keplr.setup();
  return keplr;
};
const workerIndex = process.env.TEST_WORKER_INDEX || "0";

const sessionPath = path.resolve(
  tmpdir(),
  "keplr",
  "session",
  workerIndex
);

const loadContext = async () => {
  const pathToExtension = await downloadRelease("v0.12.35");

  const context = await chromium.launchPersistentContext(sessionPath, {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });

  return context;
};

const test = base.extend<{
  context: BrowserContext;
  keplr: Keplr;
}>({
  context: async ({}, use) => {
    const context = await loadContext();

    await use(context);
    await context.close();
  },

  keplr: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent("serviceworker");

    const extensionId = background.url().split("/")[2];
    if (!extensionId) throw new Error("Extension id not found");
    const keplr = await makeKeplr(context, extensionId);
    await use(keplr);
  },
});
const fixture = {
  test,
  ...test,
};

export default fixture;

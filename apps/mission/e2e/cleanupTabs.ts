// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { pageListener } from "@evmosapps/test-utils";
import { E } from "helpers/src/error-handling";
import { BrowserContext } from "playwright";

export const cleanupTabs = async (context: BrowserContext) => {
  const pages = context.pages();
  for (const page of pages) {
    if (page.url().startsWith("chrome-extension://")) {
      await page.close();
    }
  }
};
const getMMPopup = async (context: BrowserContext) => {
  const pages = context.pages();
  return (
    pages.find((page) => page.url().startsWith("chrome-extension://")) ||
    (await context.waitForEvent("page"))
  );
};
export const connectSwitchAndSignPubkey = async (
  context: BrowserContext,
  trigger: () => Promise<void>
) => {
  const approveAllPopup = pageListener(context);

  await trigger();
  await approveAllPopup.load;
  let popupPage = approveAllPopup.page;

  await popupPage.getByRole("button", { name: /Next/i }).click();
  await popupPage.getByRole("button", { name: /Connect/i }).click();

  while (true) {
    const [err] = await E.try(() =>
      popupPage.getByRole("button", { name: /Sign/i }).click()
    );
    if (err?.message.includes("Page closed")) {
      popupPage = await getMMPopup(context);
      continue;
    }
    break;
  }
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Page } from "@playwright/test";

export const acceptTOS = async (page: Page) => {
  const { origins } = await page.context().storageState();
  const tosStorageKey = origins
    .find(({ origin }) => page.url().startsWith(origin))
    ?.localStorage.find(({ name }) => name === "evmos-TOS-v2");

  if (tosStorageKey) {
    return;
  }

  await page.waitForURL(/.+\?action=tos/g);
  await page.getByTestId("accept-tos-checkbox").check();
  await page.getByTestId("consent-checkbox").check();
  await page.getByTestId("accept-tos-button").click();
};

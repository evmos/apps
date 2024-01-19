// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { waitLocator } from "../wait-locator";
import { Keplr } from "../keplr/keplr-controller";
import { Page } from "@playwright/test";

export const connectToKeplr = async (page: Page, keplr: Keplr) => {
  const keplrButton = page.getByTestId(/wallet-profile-button-keplr/);
  if (
    await keplrButton.isVisible({
      timeout: 1000,
    })
  ) {
    return;
  }
  await waitLocator(page.getByTestId("open-connect-modal")).click();

  await waitLocator(page.getByTestId("connect-with-keplr")).click();

  await keplr.approve();

  await page.getByTestId(/wallet-profile-button/).waitFor();
};

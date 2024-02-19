// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, mmFixture, pageListener } from "@evmosapps/test-utils";
import { cleanupTabs } from "./cleanupTabs";
const { test, beforeEach, describe, expect } = mmFixture;

describe("Dapp store", () => {
  beforeEach(async ({ page, context }) => {
    await cleanupTabs(context);
    await page.goto("http://localhost:3000");

    await acceptTOS(page);
  });
  test("should display transak wallet widget", async ({ page, context }) => {
    await page.getByRole("button", { name: /Connect/i }).click();
    await page.getByRole("button", { name: /MetaMask/i }).click();

    const approveAllPopup = pageListener(context);

    await approveAllPopup.load;
    const popupPage = approveAllPopup.page;

    await popupPage.getByRole("button", { name: /Next/i }).click();
    await popupPage.getByRole("button", { name: /Connect/i }).click();
    await popupPage.getByRole("button", { name: /Sign/i }).click();

    await page
      .getByRole("link", {
        name: /Transak Wallet Transak Wallet/i,
      })
      .click();
    await expect(page).toHaveURL(
      "http://localhost:3000/dapps/on-ramps/transak",
    );

    const transakWidget = page.getByTestId("transak-widget");
    await transakWidget.waitFor();

    expect(await transakWidget.count()).toBe(1);

    await expect(page.getByText(/Connection required/i)).not.toBeVisible();
  });
});

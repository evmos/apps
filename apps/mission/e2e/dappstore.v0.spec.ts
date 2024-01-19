// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { mmFixture, pageListener } from "@evmosapps/test-utils";
const { test, beforeEach, describe, expect } = mmFixture;

describe("Dapp store", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page
      .locator("div")
      .filter({ hasText: /^I acknowledge to the Terms of Service\.$/ })
      .getByRole("checkbox")
      .check();

    await page.getByLabel(/I want to share usage data./i).check();

    await page.getByRole("button", { name: /accept and proceed/i }).click();
  });
  test("should display cypher wallet widget", async ({ page, context }) => {
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
        name: /Cypher Wallet Cypher Wallet/i,
      })
      .click();
    await expect(page).toHaveURL(
      "http://localhost:3000/dapps/bridge-and-swap/cypher-wallet",
    );

    const cypherWidget = page.getByTestId("cypher-onboading-sdk");
    await cypherWidget.waitFor();

    expect(await cypherWidget.count()).toBe(1);

    await expect(page.getByText(/Connection required/i)).not.toBeVisible();
  });
});

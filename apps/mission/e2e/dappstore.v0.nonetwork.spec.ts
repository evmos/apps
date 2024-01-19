// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { noNetworkMMFixture } from "@evmosapps/test-utils";
import { ADD_DAPP_FORM_URL, DOCS_EVMOS_REVENUE } from "constants-helper";

const { test, beforeEach, describe, expect } = noNetworkMMFixture;

describe("Dapp store ", () => {
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
  test("should be able to navigate without problems", async ({ page }) => {
    const addPagePromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: /Add your dApp/i }).click();
    const addAppPAge = await addPagePromise;
    await expect(addAppPAge).toHaveURL(ADD_DAPP_FORM_URL);
    await expect(
      addAppPAge.getByRole("heading", { name: "Add your dApp", exact: true })
    ).toBeVisible();
    await addAppPAge.close();

    const earnRevenuePagePromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: /Earn Revenue on Evmos/i }).click();
    const earnRevenuePage = await earnRevenuePagePromise;
    await expect(earnRevenuePage).toHaveURL(DOCS_EVMOS_REVENUE);
    await earnRevenuePage.close();

    await expect(
      page.getByRole("heading", { name: /Instant dApps/i })
    ).toBeVisible();

    await page.getByRole("link", { name: /See More/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps/instant-dapps");

    expect(await page.getByTestId("badge-external-link").count()).toBe(0);

    await page.getByRole("link", { name: /dApp Store/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page.getByRole("link", { name: "All", exact: true }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page.getByLabel("home").click();
    await expect(page).toHaveURL("http://localhost:3000");

    await page.getByRole("link", { name: /See all/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page.getByLabel("home").click();
    await expect(page).toHaveURL("http://localhost:3000");

    await page
      .getByRole("link", {
        name: /c14/i,
      })
      .click();
    await expect(
      page.getByRole("heading", { name: /How to use c14 Instant dApp/i })
    ).toBeVisible();

    const c14Widget = page.getByTestId("c14-widget");
    await c14Widget.waitFor();

    expect(await c14Widget.count()).toBe(1);

    await page.getByRole("link", { name: "c14", exact: true }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps/on-ramps/c14");
    await page
      .getByRole("link", { name: /Transak Transak Instant dApp/i })
      .click();
    await expect(page).toHaveURL(
      "http://localhost:3000/dapps/on-ramps/transak"
    );
    await expect(
      page.getByRole("heading", { name: /How to use Transak Instant dApp/i })
    ).toBeVisible();

    const transakWidget = page.getByTestId("transak-widget");
    await transakWidget.waitFor();
    expect(await transakWidget.count()).toBe(1);
    await page.getByRole("link", { name: /On-Ramps/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps/on-ramps");

    await page.getByRole("link", { name: /dApp Store/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page
      .getByRole("link", {
        name: /Cypher Wallet Cypher Wallet/i,
      })
      .click();
    await expect(page).toHaveURL(
      "http://localhost:3000/dapps/bridge-and-swap/cypher-wallet"
    );

    await expect(page.getByText(/Connection required/i)).toBeVisible();
  });
});

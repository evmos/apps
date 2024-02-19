// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, noNetworkMMFixture } from "@evmosapps/test-utils";
import { ADD_DAPP_FORM_URL, DOCS_EVMOS_URL } from "constants-helper";
import { cleanupTabs } from "./cleanupTabs";

const { test, beforeEach, describe, expect } = noNetworkMMFixture;

describe("Dapp store ", () => {
  beforeEach(async ({ page, context }) => {
    await cleanupTabs(context);
    await page.goto("http://localhost:3000");

    await acceptTOS(page);
  });
  test("should be able to navigate without problems", async ({ page }) => {
    const addPagePromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: /Add your dApp/i }).click();
    const addAppPAge = await addPagePromise;
    await expect(addAppPAge).toHaveURL(ADD_DAPP_FORM_URL);
    await expect(
      addAppPAge.getByRole("heading", { name: "Add your dApp", exact: true }),
    ).toBeVisible();
    await addAppPAge.close();

    const buildWithUsPagePromise = page.waitForEvent("popup");
    await page
      .getByRole("link", { name: "Build with Us", exact: true })
      .click();

    const buildWithUsPage = await buildWithUsPagePromise;
    await expect(buildWithUsPage).toHaveURL(DOCS_EVMOS_URL);
    await buildWithUsPage.close();

    await expect(
      page.getByRole("heading", { name: /Instant dApps/i }),
    ).toBeVisible();

    await page.getByRole("link", { name: /See More/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps/instant-dapps");

    expect(await page.getByTestId("badge-external-link").count()).toBe(0);

    await page.getByRole("link", { name: "dApp Store", exact: true }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page.getByRole("link", { name: "All", exact: true }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page.getByLabel("home").click();
    await expect(page).toHaveURL("http://localhost:3000");
    await page
      .getByRole("link", { name: "See all dApps", exact: true })
      .click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
    await page.getByLabel("home").click();
    await expect(page).toHaveURL("http://localhost:3000");

    await page
      .getByRole("link", {
        name: /squid/i,
      })
      .click();
    await expect(
      page.getByRole("heading", { name: /How to use Squid Instant dApp/i }),
    ).toBeVisible();

    await expect(page.getByText(/Connection required/i)).toBeVisible();

    await page.getByRole("link", { name: "Squid", exact: true }).click();
    await expect(page).toHaveURL(
      "http://localhost:3000/dapps/bridge-and-swap/squid",
    );
    await page
      .getByRole("link", { name: /Layerswap Layerswap Instant dApp/i })
      .click();
    await expect(page).toHaveURL(
      "http://localhost:3000/dapps/bridge-and-swap/layerswap",
    );
    await expect(
      page.getByRole("heading", { name: /How to use Layerswap Instant dApp/i }),
    ).toBeVisible();
    await expect(page.getByText(/Connection required/i)).toBeVisible();

    await page.getByRole("link", { name: /bridge & swap/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps/bridge-and-swap");

    await page.getByRole("link", { name: /dApp Store/i }).click();
    await expect(page).toHaveURL("http://localhost:3000/dapps");
  });
});

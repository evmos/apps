// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, mmFixture, pageListener } from "@evmosapps/test-utils";

import { cleanupTabs } from "../cleanupTabs";

const { expect, beforeEach, describe, test } = mmFixture;

describe("Mission Page - Copilot", () => {
  beforeEach(async ({ page, context }) => {
    await cleanupTabs(context);
    await page.goto("http://localhost:3000");

    await acceptTOS(page);
  });
  test("should let the user connect with MetaMask", async ({
    page,
    context,
  }) => {
    await expect(
      page.getByRole("heading", { name: /Get started/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /with Evmos in 5 minutes/i }),
    ).toBeVisible();

    // as we are not connected it should display let's go and all they balances with -
    await expect(page.getByText(/Let's go/i)).toBeVisible();

    // total balance
    await expect(
      page.getByRole("heading", { name: /\- Evmos/i, exact: true }),
    ).toBeVisible();

    // await page.route(BALANCE_ENDPOINT, async (route) => {
    //   const json = responseEmptyBalance;
    //   await route.fulfill({ json });
    // });

    // connect with metamask

    await page.getByRole("button", { name: /Connect/i }).click();
    await page.getByRole("button", { name: /MetaMask/i }).click();

    const approveAllPopup = pageListener(context);

    await approveAllPopup.load;
    const popupPage = approveAllPopup.page;

    await popupPage.getByRole("button", { name: /Next/i }).click();
    await popupPage.getByRole("button", { name: /Connect/i }).click();
    await popupPage.getByRole("button", { name: /Sign/i }).click();

    // total balance in dollars
    // await expect(page.locator("p").filter({ hasText: "$0.00" })).toBeVisible();
    // await expect(page.getByRole("heading", { name: "Evmos" })).toBeVisible();

    // update values

    // await page.route(BALANCE_ENDPOINT, async (route) => {
    //   const json = responseBalance;
    //   await route.fulfill({ json });
    // });
    // await expect(page.getByRole("heading", { name: "0.01Evmos" })).toBeVisible({
    //   timeout: 15000,
    // });

    // // total balance in dollars
    // await expect(page.locator("p").filter({ hasText: "$0" })).toBeVisible();

    await page
      .getByRole("button", {
        name: "Top Up Account",
        exact: true,
      })
      .click();

    await expect(
      page.getByRole("heading", { name: "Evmos Copilot" }),
    ).toBeVisible();
    await page.getByTestId("close-modal-icon").click();
    await page.getByRole("button", { name: "Exit" }).click();
  });
});

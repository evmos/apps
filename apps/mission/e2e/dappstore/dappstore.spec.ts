// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, mmFixture } from "@evmosapps/test-utils";
import {
  STAKING_INFO_ENDPOINT,
  responseEmptyInfoStaking,
  ERC20_MODULE_BALANCE_ENDPOINT,
  responseZeroBalance,
  GET_ACCOUNT_ENDPOINT,
  responseEmptyAccount,
  BALANCE_ENDPOINT,
  responseEmptyBalance,
  responseInfoStaking,
  responseERC20ModuleBalance,
  responseAccount,
  responseBalance,
} from "../constants";

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
    wallet,
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

    // mocks: case where the user doesn't have any balance

    await page.route(STAKING_INFO_ENDPOINT, async (route) => {
      const json = responseEmptyInfoStaking;
      await route.fulfill({ json });
    });

    await page.route(ERC20_MODULE_BALANCE_ENDPOINT, async (route) => {
      const json = responseZeroBalance;
      await route.fulfill({ json });
    });

    await page.route(GET_ACCOUNT_ENDPOINT, async (route) => {
      const json = responseEmptyAccount;
      await route.fulfill({ json });
    });

    await page.route(BALANCE_ENDPOINT, async (route) => {
      const json = responseEmptyBalance;
      await route.fulfill({ json });
    });

    // connect with metamask
    await page.getByRole("button", { name: /Connect/i }).click();
    await page.getByRole("button", { name: /MetaMask/i }).click();
    await wallet.approve();
    // await page.pause();
    // await expect(
    //   page.getByRole("heading", { name: " Evmos", exact: true }),
    // ).toBeVisible();

    // // total balance in dollars
    // await expect(page.locator("p").filter({ hasText: "$0.00" })).toBeVisible();

    // await expect(
    //   page.getByRole("button", { name: "Top Up Account", exact: true }),
    // ).toBeVisible();

    // update values

    // await page.route(`${STAKING_INFO_ENDPOINT}`, async (route) => {
    //   const json = responseInfoStaking;
    //   await route.fulfill({ json });
    // });

    // await page.route(ERC20_MODULE_BALANCE_ENDPOINT, async (route) => {
    //   const json = responseERC20ModuleBalance;
    //   await route.fulfill({ json });
    // });

    // await page.route(GET_ACCOUNT_ENDPOINT, async (route) => {
    //   const json = responseAccount;
    //   await route.fulfill({ json });
    // });

    // await page.route(BALANCE_ENDPOINT, async (route) => {
    //   const json = responseBalance;
    //   await route.fulfill({ json });
    // });
    // await page.pause();
    // await expect(page.getByRole("heading", { name: "0.01Evmos" })).toBeVisible({
    //   timeout: 15000,
    // });

    // // total balance in dollars
    // await expect(page.locator("p").filter({ hasText: "$0" })).toBeVisible();

    // await expect(page.getByRole("link", { name: /use a dApp/i })).toBeVisible();
    // await page.pause();
    await page
      .getByRole("button", {
        name: "Top Up Account",
        exact: true,
      })
      .click();

    await expect(
      page.getByRole("heading", { name: "Evmos Copilot" }),
    ).toBeVisible();
    await page.pause();
    await page.getByTestId("close-modal-icon").click();
    await page.pause();
    await page.getByRole("button", { name: "Exit" }).click();
  });
});

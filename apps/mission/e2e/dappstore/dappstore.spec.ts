// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, mmFixture, pageListener } from "@evmosapps/test-utils";
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

import { cleanupTabs, connectSwitchAndSignPubkey } from "../cleanupTabs";

const { expect, beforeEach, describe, test } = mmFixture;
beforeEach(async ({ page, context }) => {
  await cleanupTabs(context);
  await page.goto("/");

  await acceptTOS(page);
});

describe("Mission Page - Copilot", () => {
  test("should let the user connect with MetaMask", async ({
    page,
    wallet,
  }) => {
    await expect(
      page.getByText(/Onboard to Evmos in 5 minutes/i)
    ).toBeVisible();

    // as we are not connected it should display let's go and all they balances with -
    await expect(page.getByText(/Let's go/i)).toBeVisible();

    // total balance
    await expect(
      page.getByRole("heading", { name: /\- Evmos/i, exact: true })
    ).toHaveCount(4);

    // staking - available balance
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Available Balance- EVMOS\$-$/ })
        .locator("h5")
    ).toBeVisible();

    // staking - staked balance
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Staked Balance- EVMOS\$-$/ })
        .locator("h5")
    ).toBeVisible();

    // staking - claimable rewards
    await expect(
      page.locator("div").filter({ hasText: /^Claimable Rewards- EVMOS\$-$/ })
    ).toBeVisible();
    await page
      .getByRole("button", {
        name: /Claim Rewards/i,
      })
      .isDisabled();

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

    await expect(page.getByRole("heading", { name: "0Evmos" })).toBeVisible();

    // total balance in dollars
    await expect(page.locator("p").filter({ hasText: "$0" })).toBeVisible();

    const availableBalance = page.getByTestId("card-available-balance");
    await availableBalance.waitFor();
    expect(await availableBalance.textContent()).toMatch(/\$0/g);

    // staking - staked balance
    const stakedBalance = page.getByTestId("card-staked-balance");
    await stakedBalance.waitFor();
    expect(await stakedBalance.textContent()).toMatch(/0 EVMOS/g);

    // staking - claimable rewards
    const claimableRewards = page.getByTestId("card-claimable-rewards");
    await claimableRewards.waitFor();
    expect(await claimableRewards.textContent()).toMatch(/0 EVMOS/g);

    await page
      .getByRole("button", {
        name: /Claim Rewards/i,
      })
      .isDisabled();

    await expect(
      page.getByRole("button", { name: "Top Up Account", exact: true })
    ).toBeVisible();

    // update values

    await page.route(`${STAKING_INFO_ENDPOINT}`, async (route) => {
      const json = responseInfoStaking;
      await route.fulfill({ json });
    });

    await page.route(ERC20_MODULE_BALANCE_ENDPOINT, async (route) => {
      const json = responseERC20ModuleBalance;
      await route.fulfill({ json });
    });

    await page.route(GET_ACCOUNT_ENDPOINT, async (route) => {
      const json = responseAccount;
      await route.fulfill({ json });
    });

    await page.route(BALANCE_ENDPOINT, async (route) => {
      const json = responseBalance;
      await route.fulfill({ json });
    });

    await expect(page.getByRole("heading", { name: "0.01Evmos" })).toBeVisible({
      timeout: 15000,
    });

    // total balance in dollars
    await expect(page.locator("p").filter({ hasText: "$0" })).toBeVisible();

    // staking - available balance
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Available Balance0 EVMOS\$0$/ })
        .locator("h5")
    ).toBeVisible();

    // staking - staked balance
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Staked Balance0\.00 EVMOS\$0\.00$/ })
        .locator("h5")
    ).toBeVisible();

    // staking - claimable rewards
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^Claimable Rewards0\.01 EVMOS\$0\.00$/ })
        .locator("h5")
    ).toBeVisible();

    await page
      .getByRole("button", {
        name: /Claim Rewards/i,
      })
      .isEnabled();

    await expect(
      page.getByRole("link", { name: "Stake", exact: true })
    ).toBeVisible();

    await expect(page.getByRole("link", { name: /use a dApp/i })).toBeVisible();

    await page
      .getByRole("link", {
        name: "Top Up Account",
        exact: true,
      })
      .click();

    await expect(
      page.getByRole("heading", { name: "Evmos Copilot" })
    ).toBeVisible();

    await page.getByRole("link", { name: "Close" }).click();
    await page.getByRole("link", { name: "Exit" }).click();
  });

  test("should redirect to portfolio page after clicking on see portfolio", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /See portfolio/i }).click();
    await page.waitForTimeout(1000);
    await page.goto("http://localhost:3004/portfolio");
  });

  test("should redirect to governance page after clicking on participate in governance", async ({
    page,
  }) => {
    await page
      .getByRole("link", { name: /participate in governance/i })
      .click();
    await page.waitForTimeout(1000);
    await page.goto("http://localhost:3004/governance");
  });

  test("should redirect to staking page after clicking on Stake & manage delegations", async ({
    page,
  }) => {
    await page
      .getByRole("link", { name: /Stake & manage delegations/i })
      .click();
    await page.waitForTimeout(1000);
    await page.goto("http://localhost:3004/staking");
  });

  test("should connect with MetaMask, trigger the Claim rewards hook and reject it", async ({
    page,
  }) => {
    await page.route(STAKING_INFO_ENDPOINT, async (route) => {
      const json = responseInfoStaking;
      await route.fulfill({ json });
    });

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: /Connect/i }).click();
    await connectSwitchAndSignPubkey(page.context(), () =>
      page.getByRole("button", { name: /MetaMask/i }).click()
    );

    const claimPopup = pageListener(page.context());
    await page
      .getByRole("button", {
        name: /Claim Rewards/i,
      })
      .click();
    await claimPopup.load;

    await claimPopup.page.getByRole("button", { name: /Reject/i }).click();
  });
});

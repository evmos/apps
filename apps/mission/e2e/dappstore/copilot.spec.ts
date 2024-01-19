// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, mmFixture } from "@evmosapps/test-utils";
import { BALANCE_ENDPOINT } from "../constants";
import { cleanupTabs, connectSwitchAndSignPubkey } from "../cleanupTabs";

const { test, beforeEach, describe, expect } = mmFixture;

describe("Mission Page - Copilot", () => {
  beforeEach(async ({ page, context }) => {
    await cleanupTabs(context);
    await page.goto("/");
    await acceptTOS(page);
  });

  test("should let the user connect with MetaMask, set the accounts, top up the account and redirect to the ecosystem page. Network is already set up", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Connect/i }).click();
    await page
      .getByRole("button", {
        name: /Evmos Copilot Recommended for first time users/i,
      })
      .click();

    await connectSwitchAndSignPubkey(page.context(), () =>
      page.getByRole("button", { name: /Connect with MetaMask/i }).click()
    );

    await page.getByRole("button", { name: /Top up your account/i }).click();
    await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
      const json = {
        balances: [
          {
            denom: "aevmos",
            amount: "0",
          },
        ],
        pagination: {
          next_key: null,
          total: "1",
        },
      };
      await route.fulfill({ json });
    });

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: "Debit/Credit card" }).click();
    await expect(
      page.getByRole("button", { name: /Next steps/i })
    ).toBeHidden();

    const c14Widget = page.getByTestId("c14-widget");
    await c14Widget.waitFor();

    expect(await c14Widget.count()).toBe(1);

    await page.getByTestId("card-provider-dropdown").click();
    await page.getByRole("button", { name: /Transak/i }).click();

    const transakWidget = page.getByTestId("transak-widget");
    await transakWidget.waitFor();

    expect(await transakWidget.count()).toBe(1);

    await page.getByRole("button", { name: "Cryptocurrencies" }).click();

    const squidDWidget = page.getByTestId("squid-widget");
    await squidDWidget.waitFor();

    expect(await squidDWidget.count()).toBe(1);

    await page.getByTestId("card-provider-dropdown").click();
    await page.getByRole("button", { name: /LayerSwap/i }).click();

    const lawerSwapWidget = page.getByTestId("layerswap-widget");
    await lawerSwapWidget.waitFor();

    expect(await lawerSwapWidget.count()).toBe(1);

    await page.getByTestId("card-provider-dropdown").click();
    await page.getByRole("button", { name: /Cypher Wallet/i }).click();

    const cypherDWidget = page.getByTestId("cypher-onboading-sdk");
    await cypherDWidget.waitFor();

    expect(await cypherDWidget.count()).toBe(1);

    await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
      const json = {
        balances: [
          {
            denom: "aevmos",
            amount: "100",
          },
        ],
        pagination: {
          next_key: null,
          total: "1",
        },
      };
      await route.fulfill({ json });
    });

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: /Next steps/i }).click();
    await page.getByRole("link", { name: "Interact with a dApp" }).click();
  });
});

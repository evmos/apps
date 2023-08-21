import { test, expect } from "@playwright/test";
import {
  web3Test,
  web3TestWithoutNetwork,
} from "playwright-config-custom/helpers";

const BALANCE_ENDPOINT =
  "*/**/BalanceByDenom/EVMOS/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/aevmos";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await page
    .locator("div")
    .filter({ hasText: /^I acknowledge to the Terms of Service\.$/ })
    .getByRole("checkbox")
    .check();
  await page
    .locator("div")
    .filter({
      hasText: /^I want to share usage data\. More information\.$/,
    })
    .getByRole("checkbox")
    .check();
  await page.getByRole("button", { name: "Accept", exact: true }).click();
  await page.getByRole("button", { name: /accept and proceed/i }).click();
});

test.describe("Mission Page - Copilot", () => {
  test("install Metamask", async ({ page }) => {
    await page.getByRole("button", { name: /Connect/i }).click();
    await page
      .getByRole("button", {
        name: /Evmos Copilot Recommended for first time users New/i,
      })
      .click();

    await page
      .getByRole("button", {
        name: /Install MetaMask/i,
      })
      .click();

    await expect(page.getByText(/Waiting for Metamask Setup/i)).toBeVisible();
  });

  web3TestWithoutNetwork(
    "should let the user connect with MetaMask, set the network, the accounts, top up the account and redirect to the ecosystem page",
    async ({ page, wallet }) => {
      await page.getByRole("button", { name: /Connect/i }).click();
      await page
        .getByRole("button", {
          name: /Evmos Copilot Recommended for first time users New/i,
        })
        .click();

      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();

      await expect(page.getByText(/Approve on MetaMask/i)).toBeVisible();

      const switchNetworkPopup = await page.context().waitForEvent("page");
      await switchNetworkPopup.getByRole("button", { name: /Cancel/i }).click();

      await expect(
        page.getByText(/Approval Rejected, please try again/i)
      ).toBeVisible();

      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();
      const switchNetworkPopupRetry = await page.context().waitForEvent("page");
      await switchNetworkPopupRetry
        .getByRole("button", { name: /Approve/i })
        .click();

      await switchNetworkPopupRetry
        .getByRole("button", { name: /Cancel/i })
        .click();

      await expect(
        page.getByText(
          /You need to switch the network to Evmos, please try again/i
        )
      ).toBeVisible();

      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();

      const switchNetworkPopupRetryAfterApprove = await page
        .context()
        .waitForEvent("page");

      await switchNetworkPopupRetryAfterApprove
        .getByRole("button", { name: /Switch Network/i })
        .click();

      await expect(page.getByText(/Press Next and Connect/i)).toBeVisible();

      const getAccountsPopup = await page.context().waitForEvent("page");
      await getAccountsPopup.getByRole("button", { name: /Cancel/i }).click();

      await expect(
        page.getByText(/Get accounts rejected, please try again/i)
      ).toBeVisible();

      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();

      await wallet.approve();

      await page.getByRole("button", { name: /Top up your account/i }).click();
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "0",
          },
        };
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: "Debit/Credit card" }).click();
      await expect(
        page.getByRole("button", { name: /Next steps/i })
      ).toBeHidden();

      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "100",
          },
        };
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: /Next steps/i }).click();

      await page
        .getByRole("button", { name: /Interact with a dApp Recommended/i })
        .click();
    }
  );

  web3Test(
    "should let the user connect with MetaMask, set the accounts, top up the account and redirect to the ecosystem page. Network is already set up",
    async ({ page, wallet }) => {
      await page.getByRole("button", { name: /Connect/i }).click();
      await page
        .getByRole("button", {
          name: /Evmos Copilot Recommended for first time users New/i,
        })
        .click();

      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();

      await expect(page.getByText(/Press Next and Connect/i)).toBeVisible();

      await wallet.approve();

      await page.getByRole("button", { name: /Top up your account/i }).click();
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "0",
          },
        };
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: "Debit/Credit card" }).click();
      await expect(
        page.getByRole("button", { name: /Next steps/i })
      ).toBeHidden();

      let c14Widget = page.getByTestId("c14-widget");
      await c14Widget.waitFor();

      expect(await c14Widget.count()).toBe(1);

      await page.getByTestId("card-provider-dropdown").click();
      await page.getByRole("button", { name: /Transak/i }).click();

      let transakWidget = page.getByTestId("transak-widget");
      await transakWidget.waitFor();

      expect(await transakWidget.count()).toBe(1);

      await page.getByRole("button", { name: "Cryptocurrencies" }).click();

      let cypherDWidget = page.getByTestId("cypher-onboading-sdk");
      await cypherDWidget.waitFor();

      expect(await cypherDWidget.count()).toBe(1);

      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = {
          balance: {
            denom: "aevmos",
            amount: "100",
          },
        };
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: /Next steps/i }).click();

      await page
        .getByRole("button", { name: "Interact with a dApp Recommended" })
        .click();
    }
  );
});

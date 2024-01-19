// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  acceptTOS,
  noNetworkMMFixture,
  waitLocator,
} from "@evmosapps/test-utils";
import { BALANCE_ENDPOINT } from "../constants";
import { pageListener } from "@evmosapps/test-utils";
import { cleanupTabs } from "../cleanupTabs";

const { test, beforeEach, describe, expect, step } = noNetworkMMFixture;

describe("Mission Page - Copilot", () => {
  beforeEach(async ({ page, context }) => {
    await page.goto("/");
    await acceptTOS(page);
    await cleanupTabs(context);
  });

  test("should let the user connect with MetaMask, set the network, the accounts, top up the account and redirect to the ecosystem page", async ({
    page,
    context,
  }) => {
    await step("Connect", async () => {
      await page.getByRole("button", { name: /Connect/i }).click();

      await page
        .getByRole("button", {
          name: /Evmos Copilot Recommended for first time users /i,
        })
        .click();
      const switchNetworkPopup = pageListener(context);
      await page
        .getByRole("button", {
          name: /Connect with MetaMask/i,
        })
        .click();

      await page.getByText(/Approve on MetaMask/i).waitFor();
      await switchNetworkPopup.load;

      await switchNetworkPopup.page
        .getByRole("button", { name: /Cancel/i })
        .click();

      await page.getByText(/Approval Rejected, please try again/i).waitFor();

      let switchNetworkPopupRetry = pageListener(context);
      await page
        .getByRole("button", {
          name: /Try again/i,
        })
        .click();
      await switchNetworkPopupRetry.load;

      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Next/i })
        .click();

      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Connect/i })
        .click();

      await switchNetworkPopupRetry.page
        .getByRole("heading", {
          name: "Allow this site to add a network?",
        })
        .waitFor();
      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Approve/i })
        .click();

      await switchNetworkPopupRetry.page
        .getByRole("heading", {
          name: "Allow this site to switch the network?",
        })
        .waitFor();

      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Cancel/i })
        .click();

      await page.getByText(/Approval Rejected, please try again/i).waitFor();

      switchNetworkPopupRetry = pageListener(context);

      await page.getByRole("button", { name: /Try again/i }).click();

      await switchNetworkPopupRetry.load;

      await switchNetworkPopupRetry.page
        .getByRole("button", { name: /Switch Network/i })
        .click();

      const signPubkeyPopup = pageListener(context);

      await signPubkeyPopup.load;

      await signPubkeyPopup.page.getByRole("button", { name: /Sign/i }).click();
    });

    await step("Top up account", async () => {
      await waitLocator(
        page.getByRole("button", { name: /Top up your account/i }),
      ).click();
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
        page.getByRole("button", { name: /Next steps/i }),
      ).toBeHidden();

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
    });

    await page.waitForTimeout(3000);

    await page.getByRole("button", { name: /Next steps/i }).click();
    await page.getByRole("link", { name: "Interact with a dApp" }).click();
  });
});

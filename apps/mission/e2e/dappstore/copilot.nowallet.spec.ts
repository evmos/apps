// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS } from "@evmosapps/test-utils";
import { test } from "@playwright/test";
const { describe, beforeEach, expect } = test;
describe("Mission Page - Copilot", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
    await acceptTOS(page);
  });
  test("install Metamask", async ({ page }) => {
    await page.getByRole("button", { name: /Connect/i }).click();
    await page
      .getByRole("button", {
        name: /Evmos Copilot Recommended for first time users /i,
      })
      .click();

    await page
      .getByRole("button", {
        name: /Install MetaMask/i,
      })
      .click();

    await expect(page.getByText(/Waiting for Metamask Setup/i)).toBeVisible();
  });
});

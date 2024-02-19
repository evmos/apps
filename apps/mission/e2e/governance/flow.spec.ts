// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { acceptTOS, mmFixture } from "@evmosapps/test-utils";

const { test, describe, expect, beforeEach } = mmFixture;
beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/governance");
  await acceptTOS(page);
});

describe("Governance page", () => {
  test("should redirect on the right proposal when clicking", async ({
    page,
  }) => {
    const thirdProposal = page.getByTestId("proposal").nth(3);

    await thirdProposal.waitFor();
    const proposalTitleLink = await thirdProposal
      .getByTestId("proposal-card-title")
      .allInnerTexts();

    await thirdProposal.click();

    const proposalTitleElement = page.getByTestId("proposal-title");
    await proposalTitleElement.waitFor();
    const proposalTitle = await proposalTitleElement.allInnerTexts();

    expect(proposalTitleLink).toEqual(proposalTitle);
  });
  test("should let the user connect with MetaMask", async ({
    page,
    wallet,
  }) => {
    await page.getByRole("button", { name: /Connect/i }).click();
    await page.getByRole("button", { name: /MetaMask/i }).click();
    await wallet.approve();
    await expect(page.getByText(/Connected with Metamask/i)).toBeVisible();
  });
});

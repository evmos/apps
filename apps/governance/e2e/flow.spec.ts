import { test, expect } from "@playwright/test";
import { web3Test } from "playwright-config-custom/helpers";

test.beforeEach(async ({ page }) => {
  await page.goto("/governance");

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

test.describe("Governance page", () => {
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
  web3Test(
    "should let the user connect with MetaMask",
    async ({ page, wallet }) => {
      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();
      await expect(page.getByText(/Connected with Metamask/i)).toBeVisible();
    }
  );
});

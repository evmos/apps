import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3001/governance");

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
    const thirdProposal = await page.getByTestId("proposal").nth(3);
    const proposalTitleLink = await thirdProposal
      .getByTestId("proposal-title")
      .allInnerTexts();

    await thirdProposal.click();
    const proposalTitle = await page
      .getByTestId("proposal-title")
      .allInnerTexts();

    expect(proposalTitleLink).toEqual(proposalTitle);
  });
});

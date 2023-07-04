import { BrowserContext, test, expect, type Page } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";

// Todo: share this as utils
export const web3Test = test.extend<{
  context: BrowserContext;
  wallet: Dappwright;
}>({
  context: async ({}, use) => {
    const [wallet, _, context] = await dappwright.bootstrap("", {
      wallet: "metamask",
      version: MetaMaskWallet.recommendedVersion,
      seed: "test test test test test test test test test test test junk",
      headless: false,
    });

    // This needs to be refactored using the default constants
    await wallet.addNetwork({
      networkName: "Evmos",
      rpc: "https://evmos-evm.publicnode.com",
      chainId: 9001,
      symbol: "EVMOS",
    });

    await use(context);
  },

  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet("metamask", context);

    await use(metamask);
  },
});

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
    await page.waitForSelector("[data-testid='proposal']");
    const thirdProposal = await page.getByTestId("proposal").nth(3);
    const proposalTitleLink = await thirdProposal
      .getByTestId("proposal-title")
      .allInnerTexts();

    await thirdProposal.click();
    await page.waitForSelector("h1");
    const proposalTitle = await page
      .getByTestId("proposal-title")
      .allInnerTexts();

    expect(proposalTitleLink).toEqual(proposalTitle);
  });

  web3Test(
    "should let the user connect with MetaMask",
    async ({ page, wallet }) => {
      await page.getByText("GovernanceConnect wallet").click();
      await page.getByRole("button", { name: "Connect wallet" }).click();
      await page.getByRole("button", { name: "MetaMask" }).click();
      await wallet.approve();
      await expect(page.getByText(/Connected with Metamask/i)).toBeVisible();
    }
  );
});

import { test, expect } from "@playwright/test";
import { web3Test } from "playwright-config-custom/helpers";

const BALANCE_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/BalanceByDenom/EVMOS/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/aevmos";

const STAKING_INFO_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/stakingInfo/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g";
// eslint-disable-next-line no-secrets/no-secrets
const ERC20_MODULE_BALANCE_ENDPOINT = `*/**/ERC20ModuleBalance/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`;

const GET_ACCOUNT_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/cosmos/auth/v1beta1/accounts/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g";

const responseZeroBalance = {
  balance: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: "0",
      cosmosBalance: "0",
      tokenName: "EVMOS",
      tokenIdentifier: "EVMOS",
      description: "EVMOS",
      coingeckoPrice: "0.084586",
      chainId: "evmos_9001-2",
      chainIdentifier: "Evmos",
      handledByExternalUI: null,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      pngSrc:
        "https://raw.githubusercontent.com/cosmos/chain-registry/master/evmos/images/evmos.png",
      prefix: "evmos",
    },
  ],
};

const responseEmptyAccount = {
  account: {
    "@type": "/ethermint.types.v1.EthAccount",
    base_account: {
      // eslint-disable-next-line no-secrets/no-secrets
      address: "evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g",
      pub_key: {
        "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
        // eslint-disable-next-line no-secrets/no-secrets
        key: "A4MYU1tUEF1Keq5gwI/EX5aHGBtP38YlvRp1P6c5f+11",
      },
      account_number: "1938048",
      sequence: "0",
    },
    code_hash:
      "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  },
};

const responseEmptyInfoStaking = {
  delegations: [],
  undelegations: [],
  rewards: { rewards: [], total: [] },
};

const responseEmptyBalance = {
  balance: {
    denom: "aevmos",
    amount: "0",
  },
};

const responseBalance = {
  balance: {
    denom: "aevmos",
    amount: "13234",
  },
};

const responseBalanceUpdated = {
  balance: {
    denom: "aevmos",
    amount: "132340",
  },
};

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

test.describe("dAppStore Page - Copilot", () => {
  web3Test(
    "should connect with MetaMask, top up the account from onboarding section and then from the top up button in account balance section",
    async ({ page, wallet }) => {
      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = responseEmptyBalance;
        await route.fulfill({ json });
      });

      await page.route(`${STAKING_INFO_ENDPOINT}`, async (route) => {
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

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();

      await page
        .getByRole("button", { name: "Top up account", exact: true })
        .click();
      await page.getByRole("button", { name: "Debit/Credit Card" }).click();

      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = responseBalance;
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await expect(
        page.getByRole("heading", { name: /Congratulations/i })
      ).toBeVisible();
      await expect(
        page.getByText(/You're now ready to use your Evmos!/i)
      ).toBeVisible();

      await page.getByRole("button", { name: /Next steps/i }).click();

      await page.getByRole("button", { name: "Close" }).click();
      await page.getByRole("button", { name: "Exit" }).click();

      await page
        .getByRole("button", {
          name: "Top Up Account",
          exact: true,
        })
        .click();
      await page.getByRole("button", { name: "Debit/Credit Card" }).click();

      await page.route(`${BALANCE_ENDPOINT}`, async (route) => {
        const json = responseBalanceUpdated;
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await expect(
        page.getByRole("heading", { name: /Congratulations/i })
      ).toBeVisible();
      await expect(
        page.getByText(/You're now ready to use your Evmos!/i)
      ).toBeVisible();

      await page
        .getByRole("button", { name: /Continue to the dashboard/i })
        .click();
    }
  );
});

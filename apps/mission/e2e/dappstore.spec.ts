import { test, expect } from "@playwright/test";
import { web3Test } from "playwright-config-custom/helpers";

const STAKING_INFO_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/stakingInfo/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g";
// eslint-disable-next-line no-secrets/no-secrets
const ERC20_MODULE_BALANCE_ENDPOINT = `*/**/ERC20ModuleBalance/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266`;

const GET_ACCOUNT_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/cosmos/auth/v1beta1/accounts/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g";

const BALANCE_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/BalanceByDenom/EVMOS/evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g/aevmos";

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

const responseERC20ModuleBalance = {
  balance: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: "0",
      cosmosBalance: "13234",
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

const responseEmptyInfoStaking = {
  delegations: [],
  undelegations: [],
  rewards: { rewards: [], total: [] },
};

const responseInfoStaking = {
  delegations: [
    {
      delegation: {
        // eslint-disable-next-line no-secrets/no-secrets
        delegator_address: "evmos17w0adeg64ky0daxwd2ugyuneellmjgnxpu2u3g",
        validator_address:
          // eslint-disable-next-line no-secrets/no-secrets
          "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
        shares: "3000000000000000.000000000000000000",
        rank: 0,
        validator: {
          operator_address:
            // eslint-disable-next-line no-secrets/no-secrets
            "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
          consensus_pubkey: {
            type_url: "",
            value: "",
          },
          jailed: false,
          status: "BOND_STATUS_BONDED",
          tokens: "8688840738941560826344849",
          delegator_shares: "8688840738941560826344849.000000000000000000",
          description: {
            moniker: "OrbitalApes.com",
            identity: "0FC43339DE6CE5EE",
            website: "https://www.orbitalapes.com",
            security_contact: "",
            details: "Evmos Validator by Orbital Apes NFT",
          },
          unbonding_height: "0",
          unbonding_time: "1970-01-01T00:00:00Z",
          commission: {
            commission_rates: {
              rate: "0.050000000000000000",
              max_rate: "0.100000000000000000",
              max_change_rate: "0.010000000000000000",
            },
            update_time: "2022-04-28T21:50:32.806138839Z",
          },
          min_self_delegation: "1000000",
          rank: 5,
        },
      },
      balance: {
        denom: "aevmos",
        amount: "3000000000000000",
      },
    },
  ],
  undelegations: [],
  rewards: {
    rewards: [
      {
        validator_address:
          // eslint-disable-next-line no-secrets/no-secrets
          "evmosvaloper1mx9nqk5agvlsvt2yc8259nwztmxq7zjqep5khu",
        reward: [
          {
            denom: "aevmos",
            amount: "5833095455186144.841000000000000000",
          },
        ],
      },
    ],
    total: [
      {
        denom: "aevmos",
        amount: "5833095455186144.841000000000000000",
      },
    ],
  },
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

const responseAccount = {
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
      sequence: "23",
    },
    code_hash:
      "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
  },
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
  web3Test(
    "should let the user connect with MetaMask",
    async ({ page, wallet }) => {
      await expect(
        page.getByText(/Onboard to Evmos in 5 minutes/i)
      ).toBeVisible();

      // as we are not connected it should display let's go and all they balances with -
      await expect(page.getByText(/Let's go/i)).toBeVisible();

      // total balance
      await expect(
        page.getByRole("heading", { name: "- Evmos", exact: true })
      ).toBeVisible();
      await expect(page.locator("p").filter({ hasText: "$-" })).toBeVisible();

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
        page
          .locator("div")
          .filter({ hasText: /^Claimeable Rewards- EVMOS\$-$/ })
      ).toBeVisible();
      await page
        .getByRole("button", {
          name: /Claim Rewards/i,
        })
        .isDisabled();

      // mocks: case where the user doesn't have any balance

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

      await page.route(BALANCE_ENDPOINT, async (route) => {
        const json = responseEmptyBalance;
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      // connect with metamask
      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();

      await expect(page.getByRole("heading", { name: "0Evmos" })).toBeVisible();

      // total balance in dollars
      await expect(
        page.locator("p").filter({ hasText: "$0.00" })
      ).toBeVisible();

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
          .filter({ hasText: /^Staked Balance0 EVMOS\$0$/ })
          .locator("h5")
      ).toBeVisible();

      // staking - claimable rewards
      await expect(
        page
          .locator("div")
          .filter({ hasText: /^Claimeable Rewards0 EVMOS\$0$/ })
          .locator("h5")
      ).toBeVisible();
      await page
        .getByRole("button", {
          name: /Claim Rewards/i,
        })
        .isDisabled();

      await expect(
        page.getByRole("button", { name: "Top up account", exact: true })
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

      await page.waitForTimeout(3000);

      await expect(
        page.getByRole("heading", { name: "0.01Evmos" })
      ).toBeVisible();

      // total balance in dollars
      await expect(
        page.locator("p").filter({ hasText: "$0.00" })
      ).toBeVisible();

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
          .filter({ hasText: /^Claimeable Rewards0\.01 EVMOS\$0\.00$/ })
          .locator("h5")
      ).toBeVisible();
      await page
        .getByRole("button", {
          name: /Claim Rewards/i,
        })
        .isEnabled();

      await expect(
        page.getByRole("button", { name: "Stake", exact: true })
      ).toBeVisible();

      await expect(
        page.getByRole("button", { name: /use a dApp/i })
      ).toBeVisible();

      await page
        .getByRole("button", {
          name: "Top Up Account",
          exact: true,
        })
        .click();

      await expect(
        page.getByRole("heading", { name: "Evmos Copilot" })
      ).toBeVisible();

      await page.getByRole("button", { name: "Close" }).click();
      await page.getByRole("button", { name: "Exit" }).click();
    }
  );

  test("should redirect to assets page after clicking on see portfolio", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /See portfolio/i }).click();
    await page.waitForTimeout(1000);
    await page.goto("http://localhost:3004/assets");
  });

  test("should redirect to governance page after clicking on participate in governance", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: /participate in governance/i })
      .click();
    await page.waitForTimeout(1000);
    await page.goto("http://localhost:3004/governance");
  });

  test("should redirect to staking page after clicking on Stake & manage delegation", async ({
    page,
  }) => {
    await page
      .getByRole("button", { name: /Stake & manage delegation/i })
      .click();
    await page.waitForTimeout(1000);
    await page.goto("http://localhost:3004/staking");
  });

  web3Test(
    "should connect with MetaMask, trigger the Claim rewards hook and reject it",
    async ({ page, wallet }) => {
      await page.route(`${STAKING_INFO_ENDPOINT}`, async (route) => {
        const json = responseInfoStaking;
        await route.fulfill({ json });
      });

      await page.waitForTimeout(3000);

      await page.getByRole("button", { name: /Connect/i }).click();
      await page.getByRole("button", { name: /MetaMask/i }).click();
      await wallet.approve();

      await page
        .getByRole("button", {
          name: /Claim Rewards/i,
        })
        .click();

      const switchNetworkPopup = await page.context().waitForEvent("page");
      await switchNetworkPopup.getByRole("button", { name: /Reject/i }).click();
    }
  );
});

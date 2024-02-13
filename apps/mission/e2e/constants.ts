// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/* eslint-disable no-secrets/no-secrets */
export const BALANCE_ENDPOINT = "*/**/cosmos/bank/v1beta1/balances/*";
export const STAKING_INFO_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/stakingInfo/*";
// eslint-disable-next-line no-secrets/no-secrets
export const ERC20_MODULE_BALANCE_ENDPOINT = `*/**/ERC20ModuleBalance/*/*`;
export const GET_ACCOUNT_ENDPOINT =
  // eslint-disable-next-line no-secrets/no-secrets
  "*/**/cosmos/auth/v1beta1/accounts/*";

export const responseZeroBalance = {
  balance: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: "0",
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
export const responseERC20ModuleBalance = {
  balance: [
    {
      name: "EVMOS",
      symbol: "EVMOS",
      decimals: 18,
      erc20Balance: "0",
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
export const responseEmptyInfoStaking = {
  delegations: [],
  undelegations: [],
  rewards: { rewards: [], total: [] },
};
export const responseInfoStaking = {
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
export const responseEmptyAccount = {
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
export const responseAccount = {
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
export const responseEmptyBalance = {
  balance: {
    denom: "aevmos",
    amount: "0",
  },
};
export const responseBalance = {
  balance: {
    denom: "aevmos",
    amount: "13234",
  },
};

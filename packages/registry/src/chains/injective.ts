// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "inj",
  "name": "Injective",
  "cosmosId": "injective-1",
  "identifier": "injective",
  "gasPriceStep": {
    "low": "100000000000",
    "average": "200000000000",
    "high": "30000000000000"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-83",
      "counterpartyChannelId": "channel-10"
    }
  },
  "feeToken": "inj",
  "cosmosRest": [
    "https://rest.cosmos.directory/injective",
    "https://lcd.injective.network",
    "https://injective-api.polkachu.com",
    "https://injective-api.lavenderfive.com:443"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/injective",
    "https://tm.injective.network"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://tm.injective.network"
  ],
  "tokens": [
    {
      "name": "Injective",
      "ref": "inj:INJ",
      "description": "The INJ token is the native governance token for the Injective chain.",
      "symbol": "INJ",
      "denom": "INJ",
      "sourcePrefix": "inj",
      "sourceDenom": "inj",
      "minCoinDenom": "inj",
      "category": "cosmos",
      "tokenRepresentation": "INJ",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0x3515F25AB7637adcF1b69F4D384ed5936B83431F",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": "injective-protocol"
    }
  ],
  "explorerUrl": "https://www.mintscan.io/injective/txs",
  "env": "mainnet"
} as const;
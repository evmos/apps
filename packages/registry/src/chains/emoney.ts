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
  "prefix": "emoney",
  "name": "EMoney",
  "cosmosId": "emoney-3",
  "identifier": "emoney",
  "gasPriceStep": {
    "low": "0.005",
    "average": "0.025",
    "high": "0.04"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-28",
      "counterpartyChannelId": "channel-24"
    }
  },
  "feeToken": "eeur",
  "cosmosRest": [
    "https://rest.cosmos.directory/emoney",
    "https://lcd-emoney.keplr.app",
    "https://emoney.validator.network/api",
    "https://api-emoney-ia.cosmosia.notional.ventures",
    "https://api.emoney.freak12techno.io",
    "https://e-money-api.ibs.team",
    "https://api.emoney.bh.rocks"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/emoney",
    "https://rpc-emoney.keplr.app"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://rpc-emoney.keplr.app"
  ],
  "tokens": [
    {
      "name": "e-Money EUR",
      "ref": "emoney:EEUR",
      "description": "e-Money EUR stablecoin",
      "symbol": "EEUR",
      "denom": "EEUR",
      "sourcePrefix": "emoney",
      "sourceDenom": "eeur",
      "minCoinDenom": "eeur",
      "category": "stablecoin",
      "tokenRepresentation": "EEUR",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0x5db67696C3c088DfBf588d3dd849f44266ff0ffa",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": "e-money-eur"
    }
  ],
  "explorerUrl": "https://www.mintscan.io/emoney/txs",
  "env": "mainnet"
} as const;
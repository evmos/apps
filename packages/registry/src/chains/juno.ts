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
  "prefix": "juno",
  "name": "Juno",
  "cosmosId": "juno-1",
  "identifier": "juno",
  "gasPriceStep": {
    "low": "0.03",
    "average": "0.04",
    "high": "0.05"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-70",
      "counterpartyChannelId": "channel-5"
    }
  },
  "feeToken": "ujuno",
  "cosmosRest": [
    "https://rest.cosmos.directory/juno",
    "https://lcd-juno.itastakers.com",
    "https://rest-juno.ecostake.com",
    "https://juno-api.lavenderfive.com:443",
    "https://api.juno.pupmos.network",
    "https://api-juno-ia.cosmosia.notional.ventures",
    "https://juno-api.polkachu.com"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/juno",
    "https://rpc-juno.whispernode.com"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://rpc-juno.whispernode.com"
  ],
  "tokens": [
    {
      "name": "Juno",
      "ref": "JUNO",
      "description": "The native token of Juno Network",
      "symbol": "JUNO",
      "denom": "JUNO",
      "sourcePrefix": "juno",
      "sourceDenom": "ujuno",
      "minCoinDenom": "ujuno",
      "category": "cosmos",
      "tokenRepresentation": "JUNO",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0x3452e23F9c4cC62c70B7ADAd699B264AF3549C19",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": "juno-network"
    }
  ],
  "explorerUrl": "https://www.mintscan.io/juno/txs",
  "env": "mainnet"
} as const;
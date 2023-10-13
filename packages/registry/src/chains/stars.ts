/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "stars",
  "name": "Stargaze",
  "cosmosId": "stargaze-1",
  "identifier": "stargaze",
  "gasPriceStep": {
    "low": "0.005",
    "average": "0.025",
    "high": "0.04"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-46",
      "counterpartyChannelId": "channel-13"
    }
  },
  "feeToken": "ustars",
  "cosmosRest": [
    "https://rest.cosmos.directory/stargaze",
    "https://rest.stargaze-apis.com",
    "https://api-stargaze.ezstaking.dev",
    "https://api-stargaze-ia.cosmosia.notional.ventures",
    "https://stargaze-api.ibs.team",
    "https://api-stargaze.d-stake.xyz",
    "https://api.stargaze.silentvalidator.com"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/stargaze",
    "https://rpc.stargaze-apis.com/",
    "https://rpc-stargaze.pupmos.network",
    "https://rpc-stargaze.ezstaking.dev"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://rpc.stargaze-apis.com/",
    "https://rpc-stargaze.pupmos.network",
    "https://rpc-stargaze.ezstaking.dev"
  ],
  "evmRPC": [
    "https://rpc.stargaze-apis.com/",
    "https://rpc-stargaze.pupmos.network",
    "https://rpc-stargaze.ezstaking.dev"
  ],
  "tokens": [
    {
      "name": "Stargaze",
      "ref": "stars:STARS",
      "description": "The native token of Stargaze",
      "symbol": "STARS",
      "denom": "STARS",
      "sourcePrefix": "stars",
      "sourceDenom": "ustars",
      "minCoinDenom": "ustars",
      "category": "cosmos",
      "tokenRepresentation": "STARS",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0x5aD523d94Efb56C400941eb6F34393b84c75ba39",
      "handledByExternalUI": null,
      "listed": true
    }
  ],
  "explorerUrl": "https://www.mintscan.io/stargaze/txs"
} as const;
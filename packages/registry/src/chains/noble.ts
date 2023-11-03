/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "noble",
  "name": "noble",
  "cosmosId": "noble-1",
  "identifier": "noble",
  "gasPriceStep": {
    "low": "0.01",
    "average": "0.025",
    "high": "0.03"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-7",
      "counterpartyChannelId": "channel-64"
    }
  },
  "feeToken": "uusdc",
  "cosmosRest": [
    "https://rest.cosmos.directory/noble",
    "https://noble-api.polkachu.com",
    "https://api.mainnet.noble.strange.love",
    "https://api.mainnet.noble.strange.love"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/noble",
    "https://noble-rpc.polkachu.com:443"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://noble-rpc.polkachu.com:443"
  ],
  "tokens": [
    {
      "name": "USD Coin",
      "ref": "noble:USDC",
      "description": "USD Coin",
      "symbol": "USDC",
      "denom": "USDC",
      "sourcePrefix": "noble",
      "sourceDenom": "uusdc",
      "minCoinDenom": "uusdc",
      "category": "cosmos",
      "tokenRepresentation": "USDC",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0xf1faE9eC886C5F6E4ea13dA2456087Bd72F02cD1",
      "handledByExternalUI": null,
      "listed": true
    }
  ],
  "explorerUrl": "https://www.mintscan.io/noble/txs",
  "env": "mainnet"
} as const;
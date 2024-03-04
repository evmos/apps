/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "quick",
  "name": "Quicksilver",
  "cosmosId": "quicksilver-2",
  "identifier": "quicksilver",
  "gasPriceStep": {
    "low": "0.01",
    "average": "0.025",
    "high": "0.03"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-7",
      "counterpartyChannelId": "channel-37"
    }
  },
  "feeToken": "uqck",
  "cosmosRest": [
    "https://rest.cosmos.directory/quicksilver",
    "https://quicksilver-api.polkachu.com",
    "https://quicksilver-api.lavenderfive.com",
    "https://axelar-lcd.quickapi.com:443"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/quicksilver",
    "https://quicksilver-rpc.polkachu.com:443"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://quicksilver-rpc.polkachu.com:443"
  ],
  "tokens": [
    {
      "name": "Quicksilver Liquid Staked OSMO",
      "ref": "quick:qOSMO",
      "description": "Quicksilver Liquid Staked OSMO",
      "symbol": "qOSMO",
      "denom": "qOSMO",
      "sourcePrefix": "quick",
      "sourceDenom": "uqosmo",
      "minCoinDenom": "uqosmo",
      "category": "cosmos",
      "tokenRepresentation": "qOSMO",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0x616E00909730f7dE9Afd97Dc71981f6d28e2B0ca",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": ""
    },
    {
      "name": "Quicksilver Liquid Staked ATOM",
      "ref": "quick:qATOM",
      "description": "Quicksilver Liquid Staked ATOM",
      "symbol": "qATOM",
      "denom": "qATOM",
      "sourcePrefix": "quick",
      "sourceDenom": "uqatom",
      "minCoinDenom": "uqatom",
      "category": "cosmos",
      "tokenRepresentation": "qATOM",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0x4ad26064831ECE180B179a4C02Dc97940AA77B17",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": ""
    },
    {
      "name": "Quicksilver",
      "ref": "quick:QCK",
      "description": "QCK - native token of Quicksilver",
      "symbol": "QCK",
      "denom": "QCK",
      "sourcePrefix": "quick",
      "sourceDenom": "uqck",
      "minCoinDenom": "uqck",
      "category": "cosmos",
      "tokenRepresentation": "QCK",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0xf55454383cEEFB1B5e889E59542352B1b928707d",
      "handledByExternalUI": null,
      "listed": true,
      "coingeckoId": "quicksilver"
    }
  ],
  "explorerUrl": "https://www.mintscan.io/quicksilver/txs",
  "env": "mainnet"
} as const;
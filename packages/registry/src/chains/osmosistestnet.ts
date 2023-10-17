/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "osmo",
  "name": "Osmosis Testnet",
  "cosmosId": "osmo-test-5",
  "identifier": "osmosistestnet",
  "gasPriceStep": {
    "low": "0.005",
    "average": "0.025",
    "high": "0.04"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-1653",
      "counterpartyChannelId": "channel-207"
    }
  },
  "feeToken": "uosmo",
  "cosmosRest": [
    "https://g.w.lavanet.xyz:443/gateway/cos4/rest/ef1ad852a77275e1eeef6c7972370118",
    "https://lcd.osmotest5.osmosis.zone"
  ],
  "tendermintRest": [
    "https://g.w.lavanet.xyz:443/gateway/cos4/tendermint-rpc-http/ef1ad852a77275e1eeef6c7972370118"
  ],
  "evmRest": null,
  "cosmosGRPC": null,
  "tokens": [
    {
      "name": "Osmosis",
      "ref": "osmo:OSMO",
      "description": "The native token of Osmosis",
      "symbol": "OSMO",
      "denom": "OSMO",
      "sourcePrefix": "osmo",
      "sourceDenom": "uosmo",
      "minCoinDenom": "uosmo",
      "category": "cosmos",
      "tokenRepresentation": "OSMO",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0xFA3C22C069B9556A4B2f7EcE1Ee3B467909f4864",
      "handledByExternalUI": null,
      "listed": true
    }
  ],
  "explorerUrl": "https://testnet.mintscan.io/osmosis-testnet/txs",
  "env": "testnet"
} as const;
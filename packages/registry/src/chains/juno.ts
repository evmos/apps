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
    "https://g.w.lavanet.xyz:443/gateway/jun1/rest/ef1ad852a77275e1eeef6c7972370118",
    "https://rest.cosmos.directory/juno",
    "https://lcd-juno.itastakers.com",
    "https://rest-juno.ecostake.com",
    "https://juno-api.lavenderfive.com:443",
    "https://api.juno.pupmos.network",
    "https://api-juno-ia.cosmosia.notional.ventures",
    "https://juno-api.polkachu.com"
  ],
  "tendermintRest": [
    "https://g.w.lavanet.xyz:443/gateway/jun1/rpc-http/ef1ad852a77275e1eeef6c7972370118",
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
      "ref": "juno:JUNO",
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
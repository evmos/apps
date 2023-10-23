/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "evmos",
  "name": "Evmos Local",
  "cosmosId": "evmoslocal_9000-10",
  "identifier": "evmoslocal",
  "gasPriceStep": {
    "low": "10000000000",
    "average": "25000000000",
    "high": "40000000000"
  },
  "evmId": 9001,
  "channels": null,
  "feeToken": "aevmos",
  "cosmosRest": [
    "http://localhost:1317"
  ],
  "tendermintRest": [
    "http://localhost:26657"
  ],
  "evmRest": [
    "http://localhost:8545"
  ],
  "cosmosGRPC": [
    "http://localhost:26657"
  ],
  "tokens": [
    {
      "name": "EVMOS",
      "ref": "evmos:EVMOS",
      "description": "EVMOS",
      "symbol": "EVMOS",
      "denom": "EVMOS",
      "sourcePrefix": "evmos",
      "sourceDenom": "aevmos",
      "minCoinDenom": "aevmos",
      "category": "cosmos",
      "tokenRepresentation": "EVMOS",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      "handledByExternalUI": null,
      "listed": true
    },
    {
      "name": "Wizzard Token",
      "ref": "evmos:WIZZ",
      "description": "Wizzard Coin",
      "symbol": "WIZZ",
      "denom": "WIZZ",
      "sourcePrefix": "evmos",
      "sourceDenom": "erc20/0x04f9faC55b24c53F39b2aDCbef6318Ee2d9A6B84",
      "minCoinDenom": "wizz",
      "category": "cosmos",
      "tokenRepresentation": "WIZZ",
      "type": "IBC",
      "decimals": 18,
      "erc20Address": "0x04f9faC55b24c53F39b2aDCbef6318Ee2d9A6B84",
      "handledByExternalUI": null,
      "listed": true
    }
  ],
  "explorerUrl": "",
  "env": "localtestnet"
} as const;
/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 * 
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  "prefix": "wormhole",
  "name": "Wormhole Gateway",
  "cosmosId": "wormchain",
  "identifier": "wormhole",
  "gasPriceStep": {
    "low": "0",
    "average": "0",
    "high": "0"
  },
  "evmId": null,
  "channels": {
    "evmos": {
      "channelId": "channel-94",
      "counterpartyChannelId": "channel-5"
    }
  },
  "feeToken": "uworm",
  "cosmosRest": [
    "https://rest.cosmos.directory/wormhole",
    "https://wormchain-lcd.quickapi.com"
  ],
  "tendermintRest": [
    "https://rpc.cosmos.directory/wormhole",
    "https://wormchain-rpc.quickapi.com:443"
  ],
  "evmRest": null,
  "cosmosGRPC": [
    "https://wormchain-rpc.quickapi.com:443"
  ],
  "tokens": [
    {
      "name": "Wormhole ETH",
      "ref": "wormhole:WETH",
      "description": "Wrapped Ether (Wormhole)",
      "symbol": "WETH",
      "denom": "WETH",
      "sourcePrefix": "wormhole",
      "sourceDenom": "weth",
      "minCoinDenom": "nweth",
      "category": "ethereum",
      "tokenRepresentation": "WETH",
      "type": "IBC",
      "decimals": 8,
      "erc20Address": "0x4D036A97e9ad9e805f0E7B163Ea681B3dE83B7BF",
      "handledByExternalUI": [
        {
          "url": "https://portalbridge.com/cosmos/",
          "handlingAction": "Deposit and Withdraw"
        }
      ],
      "listed": true
    },
    {
      "name": "Wormhole Bitcoin",
      "ref": "wormhole:WBTC",
      "description": "Wormhole Bitcoin",
      "symbol": "WBTC",
      "denom": "WBTC",
      "sourcePrefix": "wormhole",
      "sourceDenom": "wbtc",
      "minCoinDenom": "nwbtc",
      "category": "ethereum",
      "tokenRepresentation": "WBTC",
      "type": "IBC",
      "decimals": 8,
      "erc20Address": "0xC732284e5deDb565ba403216d718a485038E55A6",
      "handledByExternalUI": [
        {
          "url": "https://portalbridge.com/cosmos/",
          "handlingAction": "Deposit and Withdraw"
        }
      ],
      "listed": true
    },
    {
      "name": "Wormhole USDT on Ethereum",
      "ref": "wormhole:USDT",
      "description": "Wormhole USDT on Ethereum",
      "symbol": "USDT",
      "denom": "USDT",
      "sourcePrefix": "wormhole",
      "sourceDenom": "usdt",
      "minCoinDenom": "uusdt",
      "category": "ethereum",
      "tokenRepresentation": "USDT",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0xa9582420B222C85Ee5b6e766415EEa5673283A03",
      "handledByExternalUI": [
        {
          "url": "https://portalbridge.com/cosmos/",
          "handlingAction": "Deposit and Withdraw"
        }
      ],
      "listed": true
    },
    {
      "name": "Wormhole USDC on Ethereum",
      "ref": "wormhole:wormUSDC",
      "description": "Wormhole USDC on Ethereum",
      "symbol": "wormUSDC",
      "denom": "wormUSDC",
      "sourcePrefix": "wormhole",
      "sourceDenom": "usdc",
      "minCoinDenom": "uusdc",
      "category": "ethereum",
      "tokenRepresentation": "USDC",
      "type": "IBC",
      "decimals": 6,
      "erc20Address": "0xC4CcDf91b810a61cCB48b35ccCc066C63bf94B4F",
      "handledByExternalUI": [
        {
          "url": "https://portalbridge.com/cosmos/",
          "handlingAction": "Deposit and Withdraw"
        }
      ],
      "listed": true
    },
    {
      "name": "Wormhole SOL token from Solana",
      "ref": "wormhole:SOL",
      "description": "Wormhole SOL token from Solana",
      "symbol": "SOL",
      "denom": "SOL",
      "sourcePrefix": "wormhole",
      "sourceDenom": "sol",
      "minCoinDenom": "nsol",
      "category": "solana",
      "tokenRepresentation": "SOL",
      "type": "IBC",
      "decimals": 8,
      "erc20Address": "0xF7510813E6C3CBe137f60F7F236eC5b19BBf2362",
      "handledByExternalUI": [
        {
          "url": "https://portalbridge.com/cosmos/",
          "handlingAction": "Deposit and Withdraw"
        }
      ],
      "listed": true
    },
    {
      "category": "cosmos",
      "decimals": 6,
      "denom": "WORM",
      "erc20Address": null,
      "handledByExternalUI": null,
      "description": "",
      "listed": false,
      "minCoinDenom": "uworm",
      "name": "WORM",
      "ref": "wormhole:WORM",
      "sourceDenom": "uworm",
      "sourcePrefix": "wormhole",
      "symbol": "WORM",
      "tokenRepresentation": null,
      "type": "IBC"
    }
  ],
  "explorerUrl": "https://bigdipper.live/wormhole/transactions",
  "env": "mainnet"
} as const;
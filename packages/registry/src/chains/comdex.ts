/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 *
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  prefix: "comdex",
  name: "Comdex",
  cosmosId: "comdex-1",
  identifier: "comdex",
  gasPriceStep: {
    low: "0.005",
    average: "0.025",
    high: "0.04",
  },
  evmId: null,
  channels: {
    evmos: {
      channelId: "channel-35",
      counterpartyChannelId: "channel-26",
    },
  },
  feeToken: "ucmdx",
  cosmosRest: [
    "https://rest.cosmos.directory/comdex",
    "https://rest.comdex.one",
    "https://comdex-api.polkachu.com",
    "https://api-comdex-ia.cosmosia.notional.ventures",
    "https://comdex.mainnet.lcd.autostake.net",
    "https://comdex-api.lavenderfive.com",
    "https://api.comdex.chaintools.tech",
    "https://api-comdex.zenchainlabs.io",
  ],
  tendermintRest: [
    "https://rpc.cosmos.directory/comdex",
    "https://rpc.comdex.one",
  ],
  evmRest: null,
  cosmosGRPC: ["https://rpc.comdex.one"],
  evmRPC: ["https://rpc.comdex.one"],
  tokens: [
    {
      name: "CMST Stablecoin of Harbor protocol",
      ref: "comdex:CMST",
      description:
        "An over-collateralized soft-pegged token to the USD on the Comdex chain",
      symbol: "CMST",
      denom: "CMST",
      sourcePrefix: "comdex",
      sourceDenom: "ucmst",
      minCoinDenom: "ucmst",
      category: "stablecoin",
      type: "IBC",
      decimals: 6,
      erc20Address: "0x9d6F2a9fDB32708e1AC07788cc29D6125ac73027",
      handledByExternalUI: null,
    },
    {
      name: "Comdex",
      ref: "comdex:CMDX",
      description: "The native token of Comdex",
      symbol: "CMDX",
      denom: "CMDX",
      sourcePrefix: "comdex",
      sourceDenom: "ucmdx",
      minCoinDenom: "ucmdx",
      category: "cosmos",
      type: "IBC",
      decimals: 6,
      erc20Address: "0xF0965c8f0755CF080a61C91EDd6707F0532c8fE7",
      handledByExternalUI: null,
    },
  ],
  explorerUrl: "https://www.mintscan.io/comdex/txs",
} as const;
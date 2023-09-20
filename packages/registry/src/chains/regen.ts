/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 *
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  prefix: "regen",
  name: "Regen Network",
  cosmosId: "regen-1",
  identifier: "regen",
  gasPriceStep: {
    low: "0.005",
    average: "0.025",
    high: "0.04",
  },
  evmId: null,
  channels: {
    evmos: {
      channelId: "channel-44",
      counterpartyChannelId: "channel-20",
    },
  },
  feeToken: "uregen",
  cosmosRest: [
    "https://rest.cosmos.directory/regen",
    "https://rest-regen.ecostake.com",
    "http://public-rpc.regen.vitwit.com:1317",
    "https://regen.stakesystems.io",
    "https://api-regen-ia.cosmosia.notional.ventures",
  ],
  tendermintRest: [
    "https://rpc.cosmos.directory/regen",
    "https://rpc-regen.ecostake.com",
  ],
  evmRest: null,
  cosmosGRPC: ["https://rpc-regen.ecostake.com"],
  evmRPC: ["https://rpc-regen.ecostake.com"],
  tokens: [
    {
      name: "Regen Network",
      ref: "regen:REGEN",
      description: "REGEN coin is the token for the Regen Network Platform",
      symbol: "REGEN",
      denom: "REGEN",
      sourcePrefix: "regen",
      sourceDenom: "uregen",
      minCoinDenom: "uregen",
      category: "cosmos",
      type: "IBC",
      decimals: 6,
      erc20Address: "0x0CE35b0D42608Ca54Eb7bcc8044f7087C18E7717",
      handledByExternalUI: null,
    },
  ],
  explorerUrl: "https://www.mintscan.io/regen/txs",
} as const;

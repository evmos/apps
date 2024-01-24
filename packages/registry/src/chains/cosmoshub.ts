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
  prefix: "cosmos",
  name: "Cosmos Hub",
  cosmosId: "cosmoshub-4",
  identifier: "cosmoshub",
  gasPriceStep: {
    low: "0.005",
    average: "0.025",
    high: "0.04",
  },
  evmId: null,
  channels: {
    evmos: {
      channelId: "channel-292",
      counterpartyChannelId: "channel-3",
    },
  },
  feeToken: "uatom",
  cosmosRest: [
    "https://g.w.lavanet.xyz:443/gateway/cos5/rest/ef1ad852a77275e1eeef6c7972370118",
    "https://rest.cosmos.directory/cosmoshub",
    "https://cosmos-lcd.quickapi.com:443",
    "https://lcd-cosmoshub.whispernode.com",
    "https://lcd-cosmoshub.blockapsis.com",
    "https://rest-cosmoshub.ecostake.com",
    "https://api.cosmoshub.pupmos.network",
    "https://lcd.cosmos.ezstaking.io",
    "https://api-cosmoshub-ia.notional.ventures/",
  ],
  tendermintRest: [
    "https://g.w.lavanet.xyz:443/gateway/cos5/rpc-http/ef1ad852a77275e1eeef6c7972370118",
    "https://rpc.cosmos.directory/cosmoshub",
    "https://cosmoshub-rpc.stakely.io/",
  ],
  evmRest: null,
  cosmosGRPC: ["https://cosmoshub-rpc.stakely.io/"],
  tokens: [
    {
      name: "Cosmos Hub",
      ref: "cosmos:ATOM",
      description: "The native token of Cosmos Hub",
      symbol: "ATOM",
      denom: "ATOM",
      sourcePrefix: "cosmos",
      sourceDenom: "uatom",
      minCoinDenom: "uatom",
      category: "cosmos",
      tokenRepresentation: "ATOM",
      type: "IBC",
      decimals: 6,
      erc20Address: "0xC5e00D3b04563950941f7137B5AfA3a534F0D6d6",
      handledByExternalUI: null,
      listed: true,
      coingeckoId: "cosmos",
    },
  ],
  explorerUrl: "https://www.mintscan.io/cosmos/txs",
  env: "mainnet",
} as const;

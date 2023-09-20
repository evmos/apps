/* eslint-disable */
/**
 * DO NOT MANUALLY EDIT THIS FILE!
 * This file is generated by calling the `pnpm run build:registry` command.
 *
 * You can find the source code for this script on /scripts/typegen.ts
 */

export default {
  prefix: "evmos",
  name: "Evmos",
  cosmosId: "evmos_9001-2",
  identifier: "evmos",
  gasPriceStep: {
    low: "10000000000",
    average: "25000000000",
    high: "40000000000",
  },
  evmId: 9001,
  channels: null,
  feeToken: "aevmos",
  cosmosRest: [
    "https://rest.cosmos.directory/evmos",
    "https://rest.bd.evmos.org:1317",
    "https://api-evmos-ia.cosmosia.notional.ventures",
    "https://api.evmos.interbloc.org",
    "https://lcd.evmos.bh.rocks",
    "https://lcd.evmos.disperze.network",
    "https://evmos-rest.publicnode.com",
  ],
  tendermintRest: [
    "https://rpc.cosmos.directory/evmos",
    "https://grpc.bd.evmos.org:9090",
  ],
  evmRest: [
    "https://jsonrpc-rpcaas-evmos-mainnet.ubiquity.blockdaemon.tech",
    "https://eth.bd.evmos.org:8545",
    "https://jsonrpc-evmos-ia.cosmosia.notional.ventures",
    "https://evmos-json-rpc.stakely.io",
    "https://jsonrpc.evmos.nodestake.top",
    "https://json-rpc.evmos.bh.rocks",
  ],
  cosmosGRPC: ["https://grpc.bd.evmos.org:9090"],
  evmRPC: ["https://grpc.bd.evmos.org:9090"],
  tokens: [
    {
      name: "NEOKingdom DAO",
      ref: "evmos:NEOK",
      description: "NEOKingdom DAO",
      symbol: "NEOK",
      denom: "NEOK",
      sourcePrefix: "evmos",
      sourceDenom: "erc20/0x655ecB57432CC1370f65e5dc2309588b71b473A9",
      minCoinDenom: "neok",
      category: "cosmos",
      type: "IBC",
      decimals: 18,
      erc20Address: "0x655ecB57432CC1370f65e5dc2309588b71b473A9",
      handledByExternalUI: null,
    },
    {
      name: "EVMOS",
      ref: "evmos:EVMOS",
      description: "EVMOS",
      symbol: "EVMOS",
      denom: "EVMOS",
      sourcePrefix: "evmos",
      sourceDenom: "aevmos",
      minCoinDenom: "aevmos",
      category: "cosmos",
      type: "IBC",
      decimals: 18,
      erc20Address: "0xD4949664cD82660AaE99bEdc034a0deA8A0bd517",
      handledByExternalUI: null,
    },
  ],
  explorerUrl: "https://www.mintscan.io/evmos/txs",
} as const;

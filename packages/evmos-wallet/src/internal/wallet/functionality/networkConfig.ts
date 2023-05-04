// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const EVMOS_RPC_URL =
  process.env.EVMOS_RPC_URL ?? "https://eth.bd.evmos.org:8545/";
export const EVMOS_GRPC_URL =
  process.env.EVMOS_GRPC_URL ?? "https://rest.bd.evmos.org:1317/";
export const EVMOS_CHAIN_NAME = process.env.EVMOS_CHAIN_NAME ?? "Evmos";
export const EVMOS_SYMBOL = process.env.EVMOS_SYMBOL ?? "EVMOS";
export const EVMOS_DECIMALS = parseInt(process.env.EVMOS_DECIMALS ?? "18");
export const EVMOS_COSMOS_EXPLORER =
  process.env.EVMOS_COSMOS_EXPLORER ?? "https://escan.live/";
export const EVMOS_ETH_CHAIN_ID = process.env.EVMOS_ETH_CHAIN_ID ?? "0x2329";
export const EVMOS_CHAIN = {
  chainId: parseInt(process.env.CHAIN_ID ?? "9001"),
  cosmosChainId: process.env.COSMOS_CHAIN_ID ?? "evmos_9001-2",
};

export const EVMOS_NETWORK_FOR_BACKEND =
  process.env.EVMOS_NETWORK_FOR_BACKEND ?? "EVMOS";
export const EVMOS_BACKEND =
  process.env.EVMOS_BACKEND ?? "https://goapi.evmos.org";

export const OSMOSIS_CHAIN_ID = process.env.OSMOSIS_CHAIN_ID ?? "osmosis-1";
export const EVMOS_MINIMAL_COIN_DENOM =
  process.env.EVMOS_MINIMAL_COIN_DENOM ?? "aevmos";

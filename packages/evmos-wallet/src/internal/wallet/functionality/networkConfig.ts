// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const EVMOS_RPC_URL =
  process.env.NEXT_PUBLIC_EVMOS_RPC_URL ?? "https://eth.bd.evmos.org:8545/";
export const EVMOS_GRPC_URL =
  process.env.NEXT_PUBLIC_EVMOS_GRPC_URL ?? "https://rest.bd.evmos.org:1317/";
export const EVMOS_CHAIN_NAME =
  process.env.NEXT_PUBLIC_EVMOS_CHAIN_NAME ?? "Evmos";
export const EVMOS_SYMBOL = process.env.NEXT_PUBLIC_EVMOS_SYMBOL ?? "EVMOS";
export const EVMOS_DECIMALS = parseInt(
  process.env.NEXT_PUBLIC_EVMOS_DECIMALS ?? "18",
);
export const EVMOS_COSMOS_EXPLORER =
  process.env.NEXT_PUBLIC_EVMOS_COSMOS_EXPLORER ?? "https://escan.live/";
export const EVMOS_ETH_CHAIN_ID =
  process.env.NEXT_PUBLIC_EVMOS_ETH_CHAIN_ID ?? "0x2329";
export const EVMOS_CHAIN = {
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? "9001"),
  cosmosChainId: process.env.NEXT_PUBLIC_COSMOS_CHAIN_ID ?? "evmos_9001-2",
};

export const EVMOS_NETWORK_FOR_BACKEND =
  process.env.NEXT_PUBLIC_EVMOS_NETWORK_FOR_BACKEND ?? "EVMOS";
export const EVMOS_BACKEND =
  process.env.NEXT_PUBLIC_EVMOS_BACKEND ?? "https://goapi-staging.evmos.org";

export const OSMOSIS_CHAIN_ID =
  process.env.NEXT_PUBLIC_OSMOSIS_CHAIN_ID ?? "osmosis-1";
export const EVMOS_MINIMAL_COIN_DENOM =
  process.env.NEXT_PUBLIC_EVMOS_MINIMAL_COIN_DENOM ?? "aevmos";

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ??
  "ae920fe62c5a565cfaaa6edacbbb6fa7";
export const REGISTRY_NETWORK_BLOCK_LIST = (
  process.env.NEXT_PUBLIC_REGISTRY_NETWORK_BLOCK_LIST ??
  "regen,kujira,emoney,quick"
)
  .split(",")
  .map((s) => s.trim());

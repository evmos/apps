// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const EVMOS_RPC_URL =
  process.env.NEXT_PUBLIC_EVMOS_RPC_URL || "https://evmos.lava.build/";
export const EVMOS_GRPC_URL =
  process.env.NEXT_PUBLIC_EVMOS_GRPC_URL || "https://rest.evmos.lava.build/";
export const EVMOS_CHAIN_NAME =
  process.env.NEXT_PUBLIC_EVMOS_CHAIN_NAME ?? "Evmos";
export const EVMOS_SYMBOL = process.env.NEXT_PUBLIC_EVMOS_SYMBOL ?? "EVMOS";
export const EVMOS_DECIMALS = parseInt(
  process.env.NEXT_PUBLIC_EVMOS_DECIMALS ?? "18"
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
  process.env.NEXT_PUBLIC_REGISTRY_NETWORK_BLOCK_LIST ?? "regen,emoney,quick"
)
  .split(",")
  .map((s) => s.trim());

export const ECOSYSTEM_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_ECOSYSTEM_PAGE_NOTION_ID ||
  "a188bd13dd114a88a7763fd2a8cc601e";
export const CATEGORIES_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_CATEGORIES_PAGE_NOTION_ID ||
  "00c57b8ac577430a9a6b855192da6493";
export const COOKIE_POLICY_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_COOKIE_POLICY_PAGE_NOTION_ID ||
  "2ce3b13eb23b40eea39361fea06e24ac";
export const TERMS_OF_SERVICE_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_TERMS_OF_SERVICE_PAGE_NOTION_ID ||
  "9635f392f0344729aa4197008c68e603";
export const PRIVACY_POLICY_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_PRIVACY_POLICY_PAGE_NOTION_ID ||
  "5d9bf99b588c4c748bda46419f0e2248";

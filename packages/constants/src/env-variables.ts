// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const EVMOS_GRPC_URL =
  process.env.NEXT_PUBLIC_EVMOS_GRPC_URL || "https://rest.evmos.lava.build/";

export const EVMOS_SYMBOL = process.env.NEXT_PUBLIC_EVMOS_SYMBOL ?? "EVMOS";

export const EVMOS_DECIMALS = parseInt(
  process.env.NEXT_PUBLIC_EVMOS_DECIMALS ?? "18",
);

export const EVMOS_NETWORK_FOR_BACKEND =
  process.env.NEXT_PUBLIC_EVMOS_NETWORK_FOR_BACKEND ?? "EVMOS";

export const EVMOS_BACKEND =
  process.env.NEXT_PUBLIC_EVMOS_BACKEND ?? "https://goapi.evmos.org";

export const EVMOS_MINIMAL_COIN_DENOM =
  process.env.NEXT_PUBLIC_EVMOS_MINIMAL_COIN_DENOM ?? "aevmos";

export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ??
  "ae920fe62c5a565cfaaa6edacbbb6fa7";

export const REGISTRY_NETWORK_BLOCK_LIST = (
  process.env.NEXT_PUBLIC_REGISTRY_NETWORK_BLOCK_LIST ??
  "regen,emoney,quick,wormhole"
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

export const EVMOS_UTILS_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_EVMOS_UTILS_PAGE_NOTION_ID ||
  "40c02e22-6107-44cd-9dd9-785c30a60277";

export const EVMOS_BLOCKED_PROPOSALS_LIST_NOTION_ID =
  process.env.NEXT_PUBLIC_EVMOS_BLOCKED_PROPOSALS_LIST_PAGE_NOTION_ID ||
  "d7f4d813a2c844d8b10bcf638570a3cd";

export const EVMOS_HIGHLIGHT_CARDS_DB_NOTION_ID =
  process.env.NEXT_PUBLIC_EVMOS_HIGHLIGHT_CARDS_DB_NOTION_ID ||
  "b5a701c8f48941359529c539c6de8a45";

export const EVMOS_LANDING_PAGE_NOTION_ID =
  process.env.NEXT_PUBLIC_EVMOS_LANDING_PAGE_NOTION_ID ||
  "96437b2af5ec48bc9772a8304c918466";

export const CHAIN_REGISTRY_REF = process.env.CHAIN_REGISTRY_REF || "main";

export const CLAIM_REWARDS_THRESHOLD = BigInt(
  process.env.NEXT_PUBLIC_CLAIM_REWARDS_THRESHOLD || "5000000000000000",
);

export const ENABLE_TESTNET = process.env.NEXT_PUBLIC_ENABLE_TESTNET === "true";

import { STRIDE_URL, FORGE_URL } from "constants-helper";
export const pages = [
  {
    name: "dapp Store",
    href: "/",
  },
  {
    name: "All",
    href: "/",
    current: "page",
  },
];

export const categories = [
  {
    name: "Instant dApps",
  },
  {
    name: "DeFi",
  },
  {
    name: "Staking",
  },
  {
    name: "Wallets",
  },
  {
    name: "Bridge & Swap",
  },
  {
    name: "Bridges",
  },
  {
    name: "On-ramp",
  },
  {
    name: "Block explorers",
  },
  {
    name: "NFTs",
  },
  {
    name: "Services",
  },
  {
    name: "Indexers",
  },
  {
    name: "Governance & DAOs",
  },
  {
    name: "Dashboards",
  },
  {
    name: "Launchpads",
  },
  {
    name: "Analytics",
  },
  {
    name: "Oracles",
  },
  {
    name: "Centralized Exchanges",
  },
];

export type EcosystemProps = {
  image: string;
  name: string;
  type: string;
  description: string;
  href: string;
};

export const dApps = [
  {
    image: "/ecosystem/forge.png",
    name: "Forge",
    type: "Instant dApp",
    description:
      "Swap, earn, and build on the premier Evmos community owned DEX.",
    href: FORGE_URL,
    category: "Instant dApps",
  },
  {
    image: "/ecosystem/stride.png",
    name: "Stride",
    type: "Instant dApp",
    description: "Liquid staking for Cosmos blockchains.",
    href: STRIDE_URL,
    category: "Instant dApps",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Squid",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
    category: "Instant dApps",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Wormhole",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
    category: "Instant dApps",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Layerswap",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
    category: "Instant dApps",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Cypher Wallet",
    type: "Instant dApp",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
    category: "Instant dApps",
  },
  {
    image: "/ecosystem/galaxy.png",
    name: "Evmos Staking",
    type: "Redirect",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/",
    category: "Staking",
  },
];
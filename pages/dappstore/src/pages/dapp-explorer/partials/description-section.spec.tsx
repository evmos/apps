// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { DescriptiondApp } from "./description-section";
import { DApp } from "../../../lib/fetch-explorer-data";

const future = new Date("2099-12-12T11:47:00.000Z").toISOString();
const baseDummyImage = {
  type: "file" as const,
  blurDataURL:
    // eslint-disable-next-line no-secrets/no-secrets
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAADCAYAAACasY9UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAYElEQVR4nI2OsQ5AMAAF/f8/2Y1iMFhEGgNCldIq7UkkFgyGWy4vlxdhPU+COXDKIEXL2k/geG1uorcM+HXHmx0rF3Qz4mZ7Rdl+BA7t0J0ijROqrGBuJHVeMoiW8PHgBI/Kut5al1DBAAAAAElFTkSuQmCC",
  src: "/prefetched-images/stride-cover-d9c0931f.png",
  _originalSrc:
    // eslint-disable-next-line no-secrets/no-secrets
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAADCAYAAACasY9UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAYElEQVR4nI2OsQ5AMAAF/f8/2Y1iMFhEGgNCldIq7UkkFgyGWy4vlxdhPU+COXDKIEXL2k/geG1uorcM+HXHmx0rF3Qz4mZ7Rdl+BA7t0J0ijROqrGBuJHVeMoiW8PHgBI/Kut5al1DBAAAAAElFTkSuQmCC",
  expiryTime: future,
};

const richText = (text: string): DApp["description"] => {
  return {
    plainText: text,
    richText: [
      {
        type: "text",
        annotations: {} as never,
        plain_text: text,
        href: null,
        text: {
          content: text,
          link: null,
        },
      },
    ],
  };
};
const DAPP: DApp = {
  name: "Stride ",
  slug: "stride",
  categoryName: "Staking",
  categorySlug: "staking",
  categories: [{ name: "Staking", slug: "staking" }],
  notionId: "82355f2b-9050-45b0-9f43-c39dd2eb8e1f",
  localized: {},
  instantDapp: true,
  description: richText(
    "Stride is a Cosmos Zone that provides liquidity for staked tokens, including EVMOS.\n" +
      "\n" +
      "Stake with Stride and watch your rewards grow while exploring and participating in various yielding strategies.\n" +
      "Connect your wallet to the  stride app  and stake your EVMOS tokens in exchange for stEVMOS, which you can deploy around the ecosystem and redeem with Stride at any time to receive your original tokens. ",
  ),
  oneLiner: richText("Earn staking rewards while keeping your tokens liquid"),

  howTo: richText(
    "Stake with Stride and watch your rewards grow while exploring and participating in various yielding strategies.\n" +
      "Connect your wallet to the  stride app  and stake your EVMOS tokens in exchange for stEVMOS, which you can deploy around the ecosystem and redeem with Stride at any time to receive your original tokens. ",
  ),
  subItem: [],
  listed: true,
  x: { url: "https://twitter.com/stride_zone", label: "stride_zone" },
  dapp: { url: "https://app.stride.zone/", label: "app.stride.zone" },

  github: null,
  discord: { url: "http://stride.zone/discord", label: "stride.zone" },
  telegram: { url: null, label: null },
  updatedAt: "2023-12-12T11:47:00.000Z",
  createdAt: "2023-10-31T14:00:00.000Z",
  language: null,
  cover: baseDummyImage,
  thumbnail: baseDummyImage,
  icon: baseDummyImage,
};

const RELATED_APPS: DApp[] = [
  {
    name: "Disperze",
    slug: "disperze",
    categoryName: "Staking",
    categorySlug: "staking",
    categories: [],
    notionId: "4339c2b6-3229-4ae0-b2fb-c38df30f08b7",
    localized: {},
    instantDapp: false,
    description: richText(
      "Disperze offers restaking with Keplr Wallet, MetaMask, and Ledger. The dashboard lets you track the current community pools, amount staked, total balance, rewards, assets, etc (see image below).",
    ),
    oneLiner: richText("Proof-of Stake-validator for Evmos"),
    howTo: richText(""),
    subItem: [],
    listed: true,
    x: { url: null, label: null },
    dapp: {
      url: "https://evmos.disperze.network/",
      label: "evmos.disperze.network",
    },
    github: null,
    discord: { url: null, label: null },
    telegram: { url: null, label: null },
    updatedAt: "2023-11-24T15:23:00.000Z",
    createdAt: "2023-11-01T10:29:00.000Z",
    language: null,
    cover: null,
    thumbnail: baseDummyImage,
    icon: null,
  },
  {
    name: "Evmos Staking",
    slug: "evmos-staking",
    categoryName: "Staking",
    categorySlug: "staking",
    categories: [],
    notionId: "64517aa9-1545-4afc-a4ea-d84e0cca4da7",
    localized: {},
    instantDapp: false,
    description: richText(
      "With EVMOS staking, users lock EVMOS to fund a validator, which helps secure the chain by proposing new blocks and attesting other validators' blocks, earning a yield in the process. Manage your delegations on the staking platform.",
    ),
    oneLiner: richText(
      "Earn rewards for participating in Evmos’ network's security",
    ),
    howTo: richText(""),
    subItem: [],
    listed: true,
    x: { url: "https://twitter.com/EvmosOrg", label: "EvmosOrg" },
    dapp: { url: "https://app.evmos.org/staking", label: "app.evmos.org" },

    github: "https://github.com/evmos/",
    discord: { url: "https://discord.com/invite/evmos", label: "evmos" },
    telegram: { url: null, label: null },
    updatedAt: "2023-12-01T11:53:00.000Z",
    createdAt: "2023-11-01T10:26:00.000Z",
    language: null,
    cover: null,
    thumbnail: baseDummyImage,
    icon: null,
  },
  {
    name: "StayKing",
    slug: "stayking",
    categoryName: "Staking",
    categorySlug: "staking",
    categories: [],
    notionId: "5d69a5df-23e4-4e30-a942-9d4909489716",
    localized: {},
    instantDapp: false,
    description: richText(
      "StayKing is a DeFI protocol that features leveraged staking and lending, working to generate relatively stable and low-risk profits for lenders.",
    ),
    oneLiner: richText("Stake, lend, earn!"),
    howTo: richText(""),
    subItem: [],
    listed: true,
    x: { url: "https://twitter.com/staykingg", label: "staykingg" },
    dapp: {
      url: "https://app.stayking.zone/leverage",
      label: "app.stayking.zone",
    },

    github: null,
    discord: { url: null, label: null },
    telegram: { url: null, label: null },
    updatedAt: "2023-11-24T15:24:00.000Z",
    createdAt: "2023-10-31T14:59:00.000Z",
    language: null,
    cover: null,
    thumbnail: baseDummyImage,
    icon: null,
  },
];
describe.skip("Testing Description section", () => {
  test("should call mixpanel event for social buttons", async () => {
    render(
      await DescriptiondApp({
        dapp: DAPP,
        relatedApps: RELATED_APPS,
        totalApps: 3,
      }),
    );
    const button = await screen.findByRole("button", { name: "See More" });
    expect(button).toBeDefined();
  });
});

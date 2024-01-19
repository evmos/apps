// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { test, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { DescriptiondApp } from "./description-section";

// const TOKEN = "testToken";

const DAPP = {
  name: "Stride ",
  slug: "stride",
  categoryName: "Staking",
  categorySlug: "staking",
  categories: [{ name: "Staking", slug: "staking" }],
  notionId: "82355f2b-9050-45b0-9f43-c39dd2eb8e1f",
  localized: {},
  instantDapp: true,
  description:
    "Stride is a Cosmos Zone that provides liquidity for staked tokens, including EVMOS.\n" +
    "\n" +
    "Stake with Stride and watch your rewards grow while exploring and participating in various yielding strategies.\n" +
    "Connect your wallet to the  stride app  and stake your EVMOS tokens in exchange for stEVMOS, which you can deploy around the ecosystem and redeem with Stride at any time to receive your original tokens. ",
  oneLiner: "Earn staking rewards while keeping your tokens liquid",
  howTo:
    "Stake with Stride and watch your rewards grow while exploring and participating in various yielding strategies.\n" +
    "Connect your wallet to the  stride app  and stake your EVMOS tokens in exchange for stEVMOS, which you can deploy around the ecosystem and redeem with Stride at any time to receive your original tokens. ",
  subItem: [],
  listed: true,
  x: { url: "https://twitter.com/stride_zone", label: "stride_zone" },
  dapp: { url: "https://app.stride.zone/", label: "app.stride.zone" },
  project: null,
  github: null,
  discord: { url: "http://stride.zone/discord", label: "stride.zone" },
  telegram: { url: null, label: null },
  updatedAt: "2023-12-12T11:47:00.000Z",
  createdAt: "2023-10-31T14:00:00.000Z",
  language: null,
  cover: {
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAADCAYAAACasY9UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAYElEQVR4nI2OsQ5AMAAF/f8/2Y1iMFhEGgNCldIq7UkkFgyGWy4vlxdhPU+COXDKIEXL2k/geG1uorcM+HXHmx0rF3Qz4mZ7Rdl+BA7t0J0ijROqrGBuJHVeMoiW8PHgBI/Kut5al1DBAAAAAElFTkSuQmCC",
    src: "/prefetched-images/stride-cover-d9c0931f.png",
  },
  thumbnail: {
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAACXBIWXMAABYlAAAWJQFJUiTwAAABv0lEQVR4nF2Sy2pUQRCGz86diOAiC92IzyH4EqJbX8CtoIIkIOQFXJilELJQEF0FdKOBgAslQmYSM84wZ8792ufW5zb9SfeAGBuqq6Grvvq7qi06RS8kXd7QRIImKWmzGpmUrJuBoez4cXhk7umBdn3JLL2t5WgCqiBHphVKjtRBzih7woXD4esD6rgwAKUTu/8AtMpAhkIagHAiYi+kmAV0juDk6zeimWMAY9Wzbvq/EOuSpE6BHOn7gfjVEe7VF/hbL5k+e0sepTShQDgxmR1Cr4xS61+AakYYofcKVje3ye7vIx5/xLuxTTxdkTkR/tkS4Sab5wwKS1M2yQOqHWFQSCfHvrVD8egd4uEB9tYOYhEyVC11JExlbcKNsRhgqDqEl+Bf2OR2xKgUzt4XZtefc3HtKae7H9CrS2vTTN3IUQ6sTudYhZ/SxAUyq0idEBFk1KGgFCXOZI53viT2IyNbj9Q/X1L6mZlYX7dYv79PKIMMDdLenS5wJ3MqL9tITgqTHM5W9IU0Zx0TXNh0QmLpjxPNXc6OT3hw5y73rtxm78kuhZuQryLavCZeeHx6856fn48Jftmky8BMQxf9AyelS9exBwMiAAAAAElFTkSuQmCC",
    src: "/prefetched-images/stride-thumbnail-41d45f39.png",
  },
  icon: {
    blurDataURL:
      // eslint-disable-next-line no-secrets/no-secrets
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABiElEQVR4nKWTO0sDQRSF7yaLja3WVta2wcpeC3+BjYV2amLiblYRQRADFiKIoo2KhYUgoqBo4YNUdkEiqBCV3TFvE/J+HpmJYhJMjGRgGBjmfjPnnDvEyIl2JrV00KS1BzDIAUbqPwDmWTD5a5qcCPaugHXOg0ktAAxJhU5T0M2TeKMxREf2UfAGoHdYoZMVTNIaACS+qmCdc4iNHyGxdIW44wzZy2eUPjJILN8gMrQLg2ZqIPTzbA0G2ZBcdaMUTSN7/oic+wVFXxTlVB55j18ADbLXmErVTutkQ/rAg4I3iPeuBbzSKOLKKYp6HIbsqBQ3lqDBIAX+7kVkL55QzuQRsqwjPnGCIouByUpFotTMREkDM3ETp5E5vEfu1id08xGybFTirOsJqpbAn5javkM5mUM5kUPCdS2KMscPAhIZ3BEyRcy/p6Ag1LeGyPAewv2bYLIqXDdkFeGBLQR6XE1SoO+us4u8uQwB5Yclp7hZFP/ZiVyjmXtR1/98ry6B1j9T27+xCeAT7dKJ1t9yWHEAAAAASUVORK5CYII=",
    src: "/prefetched-images/stride-icon-68a73297.png",
  },
};

const RELATED_APPS = [
  {
    name: "Disperze",
    slug: "disperze",
    categoryName: "Staking",
    categorySlug: "staking",
    categories: [],
    notionId: "4339c2b6-3229-4ae0-b2fb-c38df30f08b7",
    localized: {},
    instantDapp: false,
    description:
      "Disperze offers restaking with Keplr Wallet, MetaMask, and Ledger. The dashboard lets you track the current community pools, amount staked, total balance, rewards, assets, etc (see image below).",
    oneLiner: "Proof-of Stake-validator for Evmos",
    howTo: "",
    subItem: [],
    listed: true,
    x: { url: null, label: null },
    dapp: {
      url: "https://evmos.disperze.network/",
      label: "evmos.disperze.network",
    },
    project: null,
    github: null,
    discord: { url: null, label: null },
    telegram: { url: null, label: null },
    updatedAt: "2023-11-24T15:23:00.000Z",
    createdAt: "2023-11-01T10:29:00.000Z",
    language: null,
    cover: null,
    thumbnail: {
      blurDataURL:
        // eslint-disable-next-line no-secrets/no-secrets
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAACXBIWXMAABYlAAAWJQFJUiTwAAACJklEQVR4nB3PS0tUcRiA8fd/7mfONBdnnHEcpxQzYdIcdbwQJ5VEDS9oCokSaHZBXJq0k4kiXERmRW2iKCSQoIUgJURpYtoiiEiQglq06ls8oR/ggd8jobKblPevUjK0RuLSNyL+G9JXv5Ka/Ue0d4NY4BrRwBilZ+4SKZ7BSdzADE1gaj6Glkfi2cfE2ldJtjwjM/WZaNsaZfN/KRp+RXBqH2/yN9G6h8RqnuA2rGAeW0APjaMrH13qEa/qEZH0InH3OtHYAvEre4SGNtDC96nue0Dd8h+sZIEjJRN4rYsosxe79QWhuW2CsVkkWHGbcOoW3sVN3NPbRFPTiDbKeOEee/sV7Oxk6BkaR0kXbmoUpedQWjVuxRxWzTpiN68QrF0m0PcazxvDiRcozU6z/raY3d0EW5tFbGyfJNH2HNGbUVKJkhMoowHd6UCs+pe4lXewvQEsoxM7fpmMP8/m+xjff6R4t57iw8ckRa1LaJVLmOE+lBxH5CgiGcQY+YJxdAZl5jDDg+h6DpF2hifP8fNXiq1PCbq6s0ikH7N6GjN6Hic+gu7kEUkjxsBTbC2PkioMrxvdPYthNKESkwTKR/DsUnTrFHrQR5waRMrQ7UasxBBGqBMxpQVRTSjJoZk+gdAFLGnEKhnGyM5jSB5llGMHOg7/RR3wM4cLhtOCOFoPlvLRpAmRWrxMAcP2MaUW22zD9Qax7XYstxPdOGAfxGlEpRFJ8h+E5QUX6foyGAAAAABJRU5ErkJggg==",
      src: "/prefetched-images/disperze-thumbnail-9f047454.png",
    },
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
    description:
      "With EVMOS staking, users lock EVMOS to fund a validator, which helps secure the chain by proposing new blocks and attesting other validators' blocks, earning a yield in the process. Manage your delegations on the staking platform.",
    oneLiner: "Earn rewards for participating in Evmos’ network's security",
    howTo: "",
    subItem: [],
    listed: true,
    x: { url: "https://twitter.com/EvmosOrg", label: "EvmosOrg" },
    dapp: { url: "https://app.evmos.org/staking", label: "app.evmos.org" },
    project: "https://evmos.org/",
    github: "https://github.com/evmos/",
    discord: { url: "https://discord.com/invite/evmos", label: "evmos" },
    telegram: { url: null, label: null },
    updatedAt: "2023-12-01T11:53:00.000Z",
    createdAt: "2023-11-01T10:26:00.000Z",
    language: null,
    cover: null,
    thumbnail: {
      blurDataURL:
        // eslint-disable-next-line no-secrets/no-secrets
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAACXBIWXMAABYlAAAWJQFJUiTwAAACJElEQVR4nCWRW0sTAACFzxipQ9NNN5s0S0NUFDEhmZoPamipaIlpZmpe09LMSyYoRSJKBEqiRlQY5GsPEV0ESSqCwHqwJ6NelGWzjEaGXUj6Yu4HHM73nSPPwnP4swHuD2w+meDHWC2rF7Jxte7jU3saS40JzB8yMZspxhPExSjREyk6HaItQmgr7HHzd+Y6GzfO8HWgmJX2dFxnnbjbUpjP8+OBU0yniNtJ4mqs6HKI5ghRYRX653HD2xnWxxvZmOrm51QXrrY0PlZHMZcTwJ29YjJBDMeIkTjRu0vUh4samygP8xK8f8Xvuz14Rmv4dqWc5fNZfD6XSn+cAbPJn2A/I6V2I9fixeU9oiVCnAwXZWHiiEVoc/Ym62N1rE82864unvl8E3P5ZuLsFlpON5Cbm4UzKZY+r3ekgapwUWUTR8NEYYjQr+levgyW4plo4UVeEE+z/XmUE0RxdhpDg/0kJycSErCNSpuotvm8ve1FZnEwWMgzUsXqQAlrw2XMZBp5lhvIywP+dMQYCA00YQ40sX+7qLf7nEtDRbFZ5IeIIi+BqyOT7xPNLHVm8ibfxGKFg3up4mG6gb5ocdwqmiIMVFp92MUWUWgWJRbR6r1xudWJZ7SWxRNRvM41cD/DuHXVrSQxFCOa7KJhhzhm9Y3mbS4IEdVW0e0QWrtUwEq7k4XDFh5niMlEw9ba/dGid7c4ZfdRlIT6RvO6e5/o3ClqrOI/G4g/aevx1iEAAAAASUVORK5CYII=",
      src: "/prefetched-images/evmos-staking-thumbnail-0f1a33d2.png",
    },
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
    description:
      "StayKing is a DeFI protocol that features leveraged staking and lending, working to generate relatively stable and low-risk profits for lenders.",
    oneLiner: "Stake, lend, earn!",
    howTo: "",
    subItem: [],
    listed: true,
    x: { url: "https://twitter.com/staykingg", label: "staykingg" },
    dapp: {
      url: "https://app.stayking.zone/leverage",
      label: "app.stayking.zone",
    },
    project: null,
    github: null,
    discord: { url: null, label: null },
    telegram: { url: null, label: null },
    updatedAt: "2023-11-24T15:24:00.000Z",
    createdAt: "2023-10-31T14:59:00.000Z",
    language: null,
    cover: null,
    thumbnail: {
      blurDataURL:
        // eslint-disable-next-line no-secrets/no-secrets
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAKCAYAAAC9vt6cAAAACXBIWXMAABYlAAAWJQFJUiTwAAACBElEQVR4nE3S3UtTARjH8UPZ3Ktn7zvzuJ1t5+x9c3Oz6WbWbKPZsoVBIFgJgRQUWRRddBG90kXvoCAYBIWRsEIIioKgi0BC6CIIgi6CLurP+MbcLP+D5/N8f0JNEpmUbUz7HcwGXZwLe7gc83IjKXM/42Mxr/C0EKRZVHkzGuFjOcZ6JcG3Woqf9X6EsstMXRI50mdjRnFwSnVxIeLhSqKXW2mZh1kfjwcDLA8FWR3ReLc7wqexGF+qCb6PpxBKDjNVdw+NXitTPjsnAk7OaG7ORzzcTLWveJT182RnkJVhldcjYT7sibK2N87XfUmEvM3EqNNCzdOmHFMczAScLA0G+NPI8vtghmZJY2FA4VkhRLOo8XYLRUiJBgp2E2MuCwe8IodlK6c1Ny9LKhejEq9KGj/2p5nP+VnKKzwfCrFa0njfoQhhs56MaGSD4ulhwmvluOJgvZrgxbDKUcXB50qcexkf8wNbKLvaFEExdhO3GNikjEsida/I9aTMr4kMa5U4dzM+riZlHmRbVQL/qrQogqTfQcjUTbpDKXcoDdnKlN/OSdXNXLhd5Xa6b+Ohrf8stygjGoJd14Vs0BGx6Mla/1MObalyVnNzKSpxLSlzp9/HQk5pU4oqgnH7Npy6LhSjjphFT85mZNRppubpYVK2Mu23MxtyMhd2bwxsM+1irj2wv+4kFT+5K/jEAAAAAElFTkSuQmCC",
      src: "/prefetched-images/stayking-thumbnail-7e9ee090.png",
    },
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

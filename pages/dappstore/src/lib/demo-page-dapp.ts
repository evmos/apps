// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DApp } from "./fetch-explorer-data";

const blankImg =
  // eslint-disable-next-line no-secrets/no-secrets
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNU+w8AAVEBJyqFqRcAAAAASUVORK5CYII=";
const description = `
    Hello, Developer!
    Thank you for your interest on developing Instant DApps widgets.

    You can live preview your widget here.
    
    Widgets are loaded in an iframe, so you can test your widget in a realistic environment
    
    by providing the URL for your development server.

    You can also use our Instant DApps SDK to interact with the connected wallet.

    If you find any issues or have any questions, please feel free to reach out to us on our Discord channel.
    
  `;

const baseRichText = {
  type: "text" as const,
  annotations: {
    bold: false,
    italic: false,
    strikethrough: false,
    underline: false,
    code: false,
    color: "default" as const,
  },
  plain_text: "",
  href: null,
  text: {
    content: "",
    link: null,
  },
};
export const DEMO_PAGE_DAPP: DApp = {
  categories: [
    {
      name: "Demo Instant DApps",
      slug: "defi",
    },
  ],
  categoryName: "Demo Instant DApps",
  categorySlug: "defi",
  description: {
    plainText: description,
    richText: [
      {
        ...baseRichText,

        plain_text: description,
        text: {
          content: description,
          link: null,
        },
      },
    ],
  },
  icon: {
    blurDataURL: blankImg,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
    src: blankImg,
    type: "file",
    _originalSrc: blankImg,
  },
  cover: {
    blurDataURL: blankImg,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
    src: blankImg,
    type: "file",
    _originalSrc: blankImg,
  },
  name: "Demo Instant DApp",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  slug: "dappstore-demo",
  dapp: {
    url: null,
    label: "Demo Instant DApp",
  },
  discord: {
    url: null,
    label: "Demo Instant DApp",
  },
  github: null,
  howTo: {
    plainText: "",
    richText: [],
  },
  instantDapp: true,
  language: "en",
  listed: true,
  localized: {},
  notionId: "dappstore-demo",
  oneLiner: {
    plainText: "",
    richText: [],
  },

  subItem: [],
  telegram: {
    url: null,
    label: "Demo Instant DApp",
  },
  thumbnail: {
    blurDataURL: blankImg,
    expiryTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
    src: blankImg,
    type: "file",
    _originalSrc: blankImg,
  },
  x: {
    label: "Demo Instant DApp",
    url: null,
  },
};

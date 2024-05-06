// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Client } from "@notionhq/client";

export const notionWith = (init: RequestInit = {}) =>
  new Client({
    auth: process.env.NOTION_API_KEY,
    fetch: (input: RequestInfo | URL, fetchInit: RequestInit = {}) =>
      fetch(input, {
        ...fetchInit,
        ...init,
      }),
  });

export const notion = notionWith({
  next: {
    revalidate: 5 * 60,
  },
});



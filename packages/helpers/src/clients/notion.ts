// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "server-only";
import { Client } from "@notionhq/client";



export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  fetch: (input: RequestInfo | URL, init: RequestInit = {}) =>
    fetch(input, {
      ...init,
      next: { revalidate: 60 * 10, tags: ["notion-client"] },
    }),
});

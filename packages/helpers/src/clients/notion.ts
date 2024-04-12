// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "server-only";
import { Client } from "@notionhq/client";
import { CachedRequestInit, cachedFetch } from "../dev/cached-fetch";

export const notionWith = (init: CachedRequestInit = {}) =>
  new Client({
    auth: process.env.NOTION_API_KEY,
    fetch: (input: RequestInfo | URL, fetchInit: RequestInit = {}) =>
      cachedFetch(input, {
        ...fetchInit,
        ...init,
      }),
  });

export const notion = notionWith({
  revalidate: 60 * 20,
  tags: ["notion-client"],
});

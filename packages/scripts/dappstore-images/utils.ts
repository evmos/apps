// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ECOSYSTEM_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { ListBlobResultBlob } from "@vercel/blob";
import { notionWith } from "helpers/src/clients/notion";
import { devMemo } from "helpers/src/dev/dev-memo";
import { Log } from "helpers/src/logger";

export const trackedProperties = ["Thumbnail", "Cover", "Icon", "Gallery"];

const notion = notionWith({});
export const queryNotionDb = devMemo(async function queryDb(options: {
  id: string;
  startCursor?: string | null;
}) {
  return await notion.databases.query({
    database_id: options.id,
    start_cursor: options.startCursor ?? undefined,
  });
});
export const fetchDAppsDb = async function* fetchDAppsDb() {
  let nextCursor: string | null = null;
  while (true) {
    const query = await queryNotionDb({
      id: ECOSYSTEM_PAGE_NOTION_ID,
      startCursor: nextCursor,
    });

    for (const page of query.results) {
      yield page;
    }
    nextCursor = query.next_cursor;
    if (!nextCursor) {
      break;
    }
  }
};

export const isImageBlob: Parameters<
  Array<string | ListBlobResultBlob>["filter"]
>[0] = (blob) => {
  if (typeof blob === "string") {
    return !!blob.match(/\.(png|jpg|jpeg|gif|webp)$/);
  }
  return !!blob.pathname.match(/\.(png|jpg|jpeg|gif|webp)$/);
};

export const logger = Log("dappstore-images");

// Handle multiline logs on stdout
export const log = (message: string = "") => {
  message.split("\n").forEach((line) => {
    logger.info(line);
  });
};

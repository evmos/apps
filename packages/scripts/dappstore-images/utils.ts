// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  ECOSYSTEM_PAGE_NOTION_ID,
  EVMOS_HIGHLIGHT_CARDS_DB_NOTION_ID,
  EVMOS_LANDING_PAGE_NOTION_ID,
} from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { ListBlobResultBlob } from "@vercel/blob";
import { iterateDatabaseEntries } from "helpers/src/clients/notion-utils";
import { Log } from "helpers/src/logger";

export const trackedProperties = ["Thumbnail", "Cover", "Icon", "Gallery"];

export const watchedDbs = [
  ECOSYSTEM_PAGE_NOTION_ID,
  EVMOS_LANDING_PAGE_NOTION_ID,
  EVMOS_HIGHLIGHT_CARDS_DB_NOTION_ID,
];

export const iterateEntries = async function* () {
  for (const db of watchedDbs) {
    yield* iterateDatabaseEntries({ id: db });
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

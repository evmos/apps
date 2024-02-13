// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ECOSYSTEM_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log, dappSchema } from "helpers";
import { notion } from "helpers/src/clients/notion";
import { cache } from "react";
import { fetchNotionPaginated } from "./fetch-notion-paginated";

export const fetchNotionEcosystemDb = async () => {
  return fetchNotionPaginated((cursor) =>
    notion.databases.query({
      database_id: ECOSYSTEM_PAGE_NOTION_ID,
      start_cursor: cursor,
      page_size: 150,
    }),
  );
};

export const fetchDapps = cache(async () => {
  const dapps = await fetchNotionEcosystemDb();

  const parsedDapps = await Promise.all(
    dapps.map(async (value) => {
      const result = await dappSchema.safeParseAsync(value);

      if (!result.success) {
        Log("notion").error(result.error.issues);
      }
      return result;
    }),
  ).then((results) =>
    results.flatMap((result) => {
      if (!result.success || result.data.listed === false) {
        return [];
      }
      return [result.data];
    }),
  );

  const dappsMap = new Map<string, (typeof parsedDapps)[number]>();

  for (const parsed of parsedDapps) {
    parsed.localized = Object.fromEntries(
      parsed.subItem.map((notionId) => {
        const subItem = dappsMap.get(notionId);
        dappsMap.delete(notionId);
        if (!subItem || !subItem.language) {
          throw new Error("Sub-item not found");
        }
        return [
          subItem?.language,
          {
            name: subItem?.name,
            description: subItem?.description.plainText,
          },
        ];
      }),
    );
    dappsMap.set(parsed.notionId, parsed);
  }

  return Object.fromEntries(dappsMap.entries());
});

import { z } from "zod";
import { dappSchema } from "./schemas/entities/dappSchema";

import { ECOSYSTEM_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log } from "helpers";
import { notion } from "helpers/src/notion-client";

export const fetchDapps = async () => {
  const dapps = await notion.databases.query({
    database_id: ECOSYSTEM_PAGE_NOTION_ID,
  });
  const dappsMap = new Map<string, z.output<typeof dappSchema>>();

  const parsedDapps = await Promise.all(
    dapps.results.map((value) => dappSchema.safeParseAsync(value))
  );
  for (const result of parsedDapps) {
    if (!result.success) {
      Log("notion").error(result.error.issues);
      continue;
    }

    const parsed = result.data;
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
            description: subItem?.description,
          },
        ];
      })
    );
    dappsMap.set(parsed.notionId, parsed);
  }
  return dappsMap;
};

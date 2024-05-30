// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use server";
import { z } from "zod";

import { CATEGORIES_PAGE_NOTION_ID } from "@evmosapps/constants";
import { Log } from "helpers";
import { categorySchema } from "helpers/src/schemas/entities/categorySchema";
import { notion } from "helpers/src/clients/notion";
import { fetchNotionPaginated } from "./fetch-notion-paginated";

const fetchNotionCategories = () =>
  fetchNotionPaginated((nextCursor) =>
    notion.databases.query({
      database_id: CATEGORIES_PAGE_NOTION_ID,
      start_cursor: nextCursor,
    }),
  );

export const fetchCategories = async () => {
  const categories = await fetchNotionCategories();

  return categories.reduce<Map<string, z.output<typeof categorySchema>>>(
    (acc, category) => {
      const parsed = categorySchema.safeParse(category);

      if (!parsed.success) {
        Log("notion").error(parsed.error.issues);
        return acc;
      }

      parsed.data.localized = Object.fromEntries(
        parsed.data.subItem.map((notionId) => {
          const subItem = acc.get(notionId);
          acc.delete(notionId);
          if (!subItem || !subItem?.language) {
            throw new Error("Sub-item not found");
          }
          return [
            subItem.language,
            {
              name: subItem.name,
              description: subItem?.description,
            },
          ];
        }),
      );
      acc.set(parsed.data.notionId, parsed.data);

      return acc;
    },
    new Map(),
  );
};

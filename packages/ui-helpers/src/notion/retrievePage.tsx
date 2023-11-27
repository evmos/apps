import { notion } from "helpers/src/notion-client";
import { cache } from "react";

export const retrievePage = cache(
  async (pageId: string) =>
    await notion.pages.retrieve({
      page_id: pageId,
    })
);

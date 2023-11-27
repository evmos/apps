import { notion } from "helpers/src/notion-client";
import { cache } from "react";

export const retrieveBlockList = cache(
  async (blockId: string, cursor?: string) =>
    await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })
);

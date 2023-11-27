"use server";
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";
import { retrieveBlockList } from "./retrieveBlockList";
import { NotionBlocksRenderer } from "./NotionBlocksRenderer";

export const NotionBlocks = async ({ id }: { id: string }) => {
  const results: ListBlockChildrenResponse["results"] = [];
  let cursor: string | undefined = undefined;
  while (true) {
    const data = await retrieveBlockList(id, cursor);

    results.push(...data.results);
    cursor = data.next_cursor || undefined;

    if (!data.has_more) {
      break;
    }
  }

  return <NotionBlocksRenderer blocks={results} />;
};

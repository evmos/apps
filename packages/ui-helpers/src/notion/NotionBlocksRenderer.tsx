import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  ListBlockChildrenResponse,
  NumberedListItemBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import { NotionSingleBlock } from "./NotionSingleBlock";

type Group<T extends { type: string }> = Readonly<{
  groupType: T["type"];
  children: T[];
}>;
export const NotionBlocksRenderer = ({
  blocks,
}: {
  blocks: ListBlockChildrenResponse["results"];
}) => {
  const groupped = blocks.reduce<
    (
      | BlockObjectResponse
      | Group<
          | NumberedListItemBlockObjectResponse
          | BulletedListItemBlockObjectResponse
        >
    )[]
  >((acc, block) => {
    if (!("type" in block)) {
      return acc;
    }

    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      const prev = acc.at(-1);
      if (prev && "groupType" in prev && prev.groupType === block.type) {
        prev.children.push(block);
        return acc;
      }
      acc.push({
        groupType: block.type,
        children: [block],
      });
      return acc;
    }

    acc.push(block);

    return acc;
  }, []);

  return groupped.map((block) => {
    if ("groupType" in block) {
      return React.createElement(
        block.groupType === "bulleted_list_item" ? "ul" : "ol",
        {},
        block.children.map((block, i) => {
          return <NotionSingleBlock key={i} block={block} />;
        })
      );
    }

    return <NotionSingleBlock block={block} key={block.id} />;
  });
};

import { get } from "lodash-es";
import {
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import React from "react";
import Image from "next/image";
import { RichText } from "./RichText";
import { NotionBlocks } from "./NotionBlocks";

export const NotionSingleBlock = ({
  block,
}: {
  block: BlockObjectResponse;
}) => {
  if (!("type" in block)) {
    return null;
  }
  if (block.has_children) {
    return <NotionBlocks id={block.id} />;
  }
  const richText = get(
    block,
    `${block.type}.rich_text`,
    []
  ) as Array<RichTextItemResponse>;
  const tag = BlockTypeToTagMap[block.type as keyof typeof BlockTypeToTagMap];
  if (tag)
    return React.createElement(
      tag,
      {},
      richText.map((richText, i) => <RichText key={i} {...richText} />)
    );

  if (block.type === "image") {
    if (block.image.type === "file") {
      return (
        <div className="relative h-96">
          <Image
            className="my-0 object-cover"
            src={block.image.file.url}
            alt={block.image.caption
              .map(({ plain_text }) => plain_text)
              .join(" ")}
            fill={true}
          />
        </div>
      );
    }
  }

  return null;
};
const BlockTypeToTagMap = {
  paragraph: "p",
  heading_1: "h1",
  heading_2: "h2",
  heading_3: "h3",
  bulleted_list_item: "li",
  numbered_list_item: "li",
} as const;

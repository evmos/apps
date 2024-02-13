// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { z } from "zod";

const notionRichText = z.custom<RichTextItemResponse>((data) => {
  return typeof data === "object" && data !== null && "plain_text" in data;
});
export const richTextSchema = z
  .object({
    rich_text: z.array(notionRichText),
  })
  .transform(({ rich_text }) => {
    return {
      plainText: rich_text.map((text) => text.plain_text).join(" "),
      richText: rich_text,
    };
  });

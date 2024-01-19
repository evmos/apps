// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "helpers";

export const RichText = ({ annotations, plain_text }: RichTextItemResponse) => {
  return (
    <span
      className={cn({
        "font-bold": annotations.bold,
        italic: annotations.italic,
        underline: annotations.underline,
        "line-through": annotations.strikethrough,
        "font-mono": annotations.code,
      })}
    >
      {plain_text}
    </span>
  );
};

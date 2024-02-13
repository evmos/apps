// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "helpers";
import React, { Fragment } from "react";

export const RichText = ({
  annotations,
  plain_text,
  href,
}: RichTextItemResponse) => {
  return React.createElement(
    href ? "a" : "span",
    {
      className: cn({
        "font-bold": annotations.bold,
        italic: annotations.italic,
        underline: annotations.underline || href,
        "line-through": annotations.strikethrough,
        "font-mono": annotations.code,
        "hover:text-white": href,
      }),
      ...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {}),
    },
    plain_text.split("\n").map((text, index) => (
      <Fragment key={index}>
        {index > 0 && React.createElement("br")}
        {text}
      </Fragment>
    )),
  );
};

export const RichTextBlock = ({
  richText,
}: {
  richText: RichTextItemResponse[];
}) => {
  return (
    <p>
      {richText.map((text, index) => (
        <RichText key={index} {...text} />
      ))}
    </p>
  );
};

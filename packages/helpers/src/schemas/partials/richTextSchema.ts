// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const richTextSchema = z
  .object({
    rich_text: z.array(
      z.object({
        plain_text: z.string(),
      }),
    ),
  })
  .transform((data) => {
    return data.rich_text.map((text) => text.plain_text).join(" ");
  });

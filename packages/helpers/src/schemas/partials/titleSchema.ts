// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const titleSchema = z
  .object({
    title: z.array(
      z.object({
        plain_text: z.string(),
      })
    ),
  })
  .transform((data) => {
    return data.title.map((text) => text.plain_text).join(" ");
  });

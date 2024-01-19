// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

import { checkboxSchema } from "../partials/checkboxSchema";
import { richTextSchema } from "../partials/richTextSchema";
import { titleSchema } from "../partials/titleSchema";

export const evmosStatusSchema = z.object({
  results: z.array(
    z.object({
      properties: z.object({
        Checkbox: checkboxSchema,
        Name: titleSchema,
        Description: richTextSchema,
      }),
    })
  ),
});

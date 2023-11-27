import { z } from "zod";

import { relationSchema } from "../partials/relationSchema";
import { richTextSchema } from "../partials/richTextSchema";
import { titleSchema } from "../partials/titleSchema";
import { createNotionPropertiesSchema } from "../utils/createNotionPropertiesSchema";
import { selectSchema } from "../partials/selectSchema";

const categoryPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    projects: relationSchema,
    name: titleSchema,
    description: richTextSchema,
    subItem: relationSchema,
    language: selectSchema,
  })
);

export const categorySchema = z
  .object({
    id: z.string(),
    created_time: z.string(),
    last_edited_time: z.string(),
    properties: categoryPropertiesSchema,
  })
  .transform(({ id, properties }) => ({
    notionId: id,

    localized: {} as Record<
      string,
      {
        name: string;
        description: string;
      }
    >,
    ...properties,
  }));

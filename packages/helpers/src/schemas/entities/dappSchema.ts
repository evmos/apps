// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { richTextSchema } from "../partials/richTextSchema";
import { relationSchema } from "../partials/relationSchema";
import { titleSchema } from "../partials/titleSchema";
import { checkboxSchema } from "../partials/checkboxSchema";
import { urlSchema } from "../partials/urlSchema";
import { filesSchema } from "../partials/fileSchema";
import { createNotionPropertiesSchema } from "../utils/createNotionPropertiesSchema";
import { createdAtSchema } from "../partials/createdAtSchema";
import { updatedAtSchema } from "../partials/updatedAtSchema";
import { selectSchema } from "../partials/selectSchema";
import { parseUrl } from "helpers/src/parse/urls";
import { createSlug } from "../utils/createSlug";
import { resolveSelfHostedImage } from "../../clients/notion-utils";

const dappPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    icon: filesSchema,
    cover: filesSchema,
    thumbnail: filesSchema,
    instantDapp: checkboxSchema,
    name: titleSchema,
    description: richTextSchema,
    oneLiner: richTextSchema,
    howTo: richTextSchema,
    subItem: relationSchema,
    listed: checkboxSchema,
    x: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    dapp: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    github: urlSchema,
    discord: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    telegram: urlSchema.transform((url) => ({
      url,
      label: url && parseUrl(url),
    })),
    updatedAt: updatedAtSchema,
    createdAt: createdAtSchema,
    language: selectSchema,
    categories: relationSchema,
  }),
);
export const dappSchema = z
  .object({
    id: z.string(),
    properties: dappPropertiesSchema,
  })
  .transform(async ({ id, properties, ...rest }) => {
    const slug = createSlug(properties.name);
    const { icon, thumbnail, cover, ...otherProps } = properties;
    try {
      return {
        notionId: id,
        slug,
        localized: {} as Record<
          string,
          {
            name: string;
            description: string;
          }
        >,
        icon: icon ? await resolveSelfHostedImage(icon.src) : null,
        thumbnail: thumbnail
          ? await resolveSelfHostedImage(thumbnail.src)
          : null,
        cover: cover ? await resolveSelfHostedImage(cover.src) : null,

        ...otherProps,
        ...rest,
      };
    } catch (error) {
      throw Error(
        `Error resolving images for dapp ${slug}:\n ${(error as Error).message}`,
      );
    }
  });

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
import { generateBlurImage } from "./generateBlurImage";

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
      icon: icon
        ? {
            ...icon,
            src: `/api/dappimg/${slug}/icon`,

            _originalSrc: icon.src,
            blurDataURL: await generateBlurImage(icon.src),
          }
        : null,
      thumbnail: thumbnail
        ? {
            ...thumbnail,
            src: `/api/dappimg/${slug}/thumbnail`,
            _originalSrc: thumbnail.src,
            blurDataURL: await generateBlurImage(thumbnail.src),
          }
        : null,
      cover: cover
        ? {
            ...cover,
            src: `/api/dappimg/${slug}/cover`,
            _originalSrc: cover.src,
            blurDataURL: await generateBlurImage(cover.src),
          }
        : null,

      ...otherProps,
      ...rest,
    };
  });

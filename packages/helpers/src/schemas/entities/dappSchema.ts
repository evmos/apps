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
import { ImageStore } from "../../image-store";
import { raise } from "../../error-handling";
import { devMemo } from "../../dev/dev-memo";

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

const fetchSelfHostedUrl = devMemo(async function (url: string) {
  const { blurDataURL, source } = (await ImageStore.fetchManifest(url)) ??
    raise(
      `No manifest found for ${url}:\n\nMaybe this image is missing? Try running \`pnpm dappstore-images sync\``
    );

  return {
    blurDataURL: blurDataURL,
    src: source.url,
  };
}, { tags: ["fetchSelfHostedUrl"], revalidate: 60 * 5 });
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
      icon: icon ? await fetchSelfHostedUrl(icon.src) : null,
      thumbnail: thumbnail ? await fetchSelfHostedUrl(thumbnail.src) : null,
      cover: cover ? await fetchSelfHostedUrl(cover.src) : null,

      ...otherProps,
      ...rest,
    };
  });

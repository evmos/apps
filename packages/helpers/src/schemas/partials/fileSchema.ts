// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { externalSchema } from "./externalSchema";

const fileSchema = z
  .object({
    type: z.literal("file"),
    file: z.object({
      url: z.string(),
      expiry_time: z.string(),
    }),
  })
  .transform(({ type, file }) => ({
    type,
    url: file.url ?? null,
    expiryTime: file.expiry_time,
  }));

export const singleFileSchema = z
  .object({
    type: z.literal("files"),
    files: z.array(z.union([fileSchema, externalSchema])),
  })
  .transform(({ files: [file] }) =>
    file
      ? {
          type: file.type,
          src: file.url,
          expiryTime: "expiryTime" in file ? file.expiryTime : null,
        }
      : null,
  );

export const filesSchema = z
  .object({
    type: z.literal("files"),
    files: z.array(z.union([fileSchema, externalSchema])),
  })
  .transform(({ files }) =>
    files.map((file) => {
      return {
        type: file.type,
        src: file.url,
        expiryTime: "expiryTime" in file ? file.expiryTime : null,
      };
    }),
  );

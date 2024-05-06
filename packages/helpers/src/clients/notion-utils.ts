// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QueryDatabaseParameters, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { get } from "lodash-es";
import { raise } from "../error-handling";
import { notionWith } from "./notion.ts";
import { arrayFromAsync } from "../array-from-async";
import { ImageStore } from "../image-store.ts";

export type DatabaseEntryList = QueryDatabaseResponse["results"];
export type DatabaseEntry = QueryDatabaseResponse["results"][number];
export type DatabaseEntryProperty = Extract<
  DatabaseEntry,
  {
    object: "page";
    properties: {};
  }
>["properties"][string];

type QueryDatabaseOptions = {
  id: string;
  init?: RequestInit;
} & Omit<QueryDatabaseParameters, 'database_id' | 'start_cursor'>;

export async function* iterateDatabaseEntries({
  id,
  init,
  ...rest
}: QueryDatabaseOptions) {
  let next_cursor = undefined;
  do {
    const query = await notionWith(init).databases.query({
      database_id: id,
      start_cursor: next_cursor,
      ...rest,
    });
    for (const entry of query.results) {
      yield entry;
    }
    next_cursor = query.next_cursor;
  } while (next_cursor);
}


export async function fetchDatabaseEntries(options:QueryDatabaseOptions) {
  return arrayFromAsync(iterateDatabaseEntries(options));
}

export function* iterateDatabaseEntryProperties(entry: DatabaseEntry) {
  if (entry.object !== "page" || !("properties" in entry)) {
    return;
  }
  for (const key in entry.properties) {
    yield [key, entry.properties[key]] as const;
  }
}


export const iteratePropertiesOfType = function* <
  T extends DatabaseEntryProperty["type"],
>(entry: DatabaseEntry, type: T) {
  for (const [key, prop] of iterateDatabaseEntryProperties(entry)) {
    if (prop?.type === type) {
      yield [key, prop as Extract<DatabaseEntryProperty, { type: T }>] as const;
    }
  }
};

export const tryReadPropertyAs = <T extends DatabaseEntryProperty["type"]>(
  entry: DatabaseEntry,
  key: string,
  expectedType: T,
) => {
  const prop =
    (get(entry, ["properties", key]) as DatabaseEntryProperty) ??
    raise(`No property ${key}`);

  if (prop.type !== expectedType) {
    raise(
      `Expected property ${key} to be of type ${expectedType}, found ${prop.type}`,
    );
  }

  return prop as Extract<DatabaseEntryProperty, { type: T }>;
};

export const resolveSelfHostedImage = async function(url: string) {
  const { blurDataURL, source } =
    (await ImageStore.fetchManifest(url)) ??
    raise(
      `No manifest found for ${url}:\n\nMaybe this image is missing? Try running \`pnpm dappstore-images sync\``,
    );

  return {
    blurDataURL: blurDataURL,
    src: source.url,
  };
};
export const tryResolveImageProp = async function(
  entry: DatabaseEntry,
  key: string,
) {
  const { files } = tryReadPropertyAs(entry, key, "files");
  const filesList = Array.isArray(files) ? files : [files];
  return Promise.all(
    filesList.flatMap((entry) => {
      const url = get(entry, "file.url") || get(entry, "external.url");
      if (!url) return [];
      return [resolveSelfHostedImage(url)];
    }),
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { memoize } from "lodash-es";
import { del, list, ListBlobResultBlob, put } from "@vercel/blob";
import { bufferToBase64 } from "helpers/src/buffer-to-base64";
import { arrayFromAsync } from "helpers/src/array-from-async";
import { raise } from "helpers/src/error-handling";
import path from "path";
import { createSlug } from "helpers/src/schemas/utils/createSlug";
import { hashString } from "./hash/hash-string";

const normalizePathname = (pathname: string) =>
  pathname
    .split("/")
    .filter(Boolean)
    .map((part) => part.split(".").map(createSlug).join("."))
    .join("/");

export class ImageStore {
  static async upload(buffer: ArrayBuffer, pathname: string) {
    const sharp = await import("sharp").then((v) => v.default);

    const blurDataURL = await sharp(buffer)
      .resize({
        height: 8,
      })
      .png()
      .toBuffer()
      .then(bufferToBase64);

    const blob = await put(pathname, buffer, {
      access: "public",
      addRandomSuffix: false,
    });

    const manifestPath = ImageStore.resolveManifestPathname(pathname);

    const manifest = {
      blurDataURL,
      createdAt: new Date().toISOString(),
      source: {
        url: blob.url,
        path: blob.pathname,
      },
    };
    await put(manifestPath, JSON.stringify(manifest), {
      access: "public",
      addRandomSuffix: false,
    });

    return manifest;
  }

  static async uploadFromUrl(url: string) {
    const image = await fetch(url);
    const sourceBuffer = await image.arrayBuffer();
    const destPath = ImageStore.resolvePathname(url);

    return this.upload(sourceBuffer, destPath);
  }

  static getBlobs = async function*() {
    let hasMore = true;
    let cursor: undefined | string;

    while (hasMore) {
      const listResult = await list({
        cursor,
      });

      for (const blob of listResult.blobs) {
        yield blob;
      }

      hasMore = listResult.hasMore;
      cursor = listResult.cursor;
    }
  };

  static resolveImageDir = (url: string) => {
    if (url.match(/^\/?dappstore\/img-/))
      return normalizePathname(path.dirname(url));
    const urlObj = new URL(url);
    return normalizePathname(
      `dappstore/img-${hashString([urlObj.pathname].join(":"))}`,
    );
  };
  static resolveImageName = (url: string) => {
    if (url.startsWith("http")) url = new URL(url).pathname;
    return `src${path.extname(url)}`;
  };
  static getBlobsByPathname = memoize(async () => {
    const blobs = await arrayFromAsync(ImageStore.getBlobs());
    return blobs.reduce<Map<string, ListBlobResultBlob>>((acc, blob) => {
      acc.set(normalizePathname(blob.pathname), blob);
      return acc;
    }, new Map());
  });

  static resolvePathname = (url: string) => {
    return `${ImageStore.resolveImageDir(url)}/${ImageStore.resolveImageName(
      url,
    )}`;
  };

  static resolveManifestPathname = (url: string) => {
    return `${ImageStore.resolveImageDir(url)}/manifest.json`;
  };

  static async resolveUrl(pathname: string) {
    return (await ImageStore.getBlobsByPathname()).get(
      ImageStore.resolvePathname(pathname),
    )?.url;
  }

  static async resolveManifestUrl(pathname: string) {
    const blobsByPathname = await ImageStore.getBlobsByPathname();
    const manifestPathname = ImageStore.resolveManifestPathname(pathname);

    const url = blobsByPathname.get(manifestPathname)?.url;

    return url;
  }

  static fetchManifest = async (pathname: string) => {
    const manifestUrl = await ImageStore.resolveManifestUrl(pathname);

    if (!manifestUrl) return null;
    return fetch(manifestUrl, {
      next: {
        revalidate: 60 * 5,
      },
    }).then(
      (res) =>
        res.json() as Promise<{
          blurDataURL: string;
          createdAt: string;
          source: {
            url: string;
            path: string;
          };
        }>,
    );
  };

  static async deleteByPathname(pathnames: string[]) {
    const deletionList = await Promise.all(
      pathnames.map(async (pathname) => {
        const [image, manifest] = await Promise.all([
          ImageStore.resolveUrl(pathname).then(
            (v) => v || raise(`Blob not found: ${pathname}`),
          ),
          ImageStore.resolveManifestUrl(pathname),
        ]);

        if (manifest) return [image, manifest];
        return [image];
      }),
    ).then((v) => v.flat());
    await del(deletionList);
  }
}

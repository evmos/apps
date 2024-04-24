// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { get } from "lodash-es";
import { program } from "@commander-js/extra-typings";
import { fetchDAppsDb, isImageBlob, log, trackedProperties } from "./utils";
import { ImageStore } from "helpers/src/image-store";
import { arrayFromAsync } from "helpers/src/array-from-async";

program.command("prune").action(async () => {
  log("Loading uploaded images info...");
  const blobs = await arrayFromAsync(ImageStore.getBlobs());

  const pagesIter = fetchDAppsDb();
  const imageBlobs = blobs.filter(isImageBlob);
  const unusedImages = new Set(imageBlobs.map((blob) => blob.pathname));

  for await (const page of pagesIter) {
    if (!("properties" in page)) {
      continue;
    }
    const properties = page.properties;
    for (const notionPropertyName of trackedProperties) {
      const images = get(properties, notionPropertyName);

      if (!images || !("files" in images)) {
        continue;
      }
      const files = images.files;

      if (!Array.isArray(files)) continue;

      for (const file of files) {
        const url = get(file, "file.url") || get(file, "external.url");
        if (!url) continue;
        const destinationPath = ImageStore.resolvePathname(url);

        unusedImages.delete(destinationPath);
      }
    }
  }

  if (unusedImages.size === 0) {
    log("No unused images left to prune");
    return;
  }
  log(`Pruning ${unusedImages.size} unused images...`);

  await ImageStore.deleteByPathname(Array.from(unusedImages));

  log("🗑️ All unused images are pruned");
});

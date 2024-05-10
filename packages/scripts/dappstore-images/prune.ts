// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { get } from "lodash-es";
import { program } from "@commander-js/extra-typings";
import { isImageBlob, iterateEntries, log } from "./utils";
import { ImageStore } from "helpers/src/image-store";
import { arrayFromAsync } from "helpers/src/array-from-async";
import { iteratePropertiesOfType } from "helpers/src/clients/notion-utils";

program.command("prune").action(async () => {
  log("Loading uploaded images info...");
  const blobs = await arrayFromAsync(ImageStore.getBlobs());

  const imageBlobs = blobs.filter(isImageBlob);
  const unusedImages = new Set(imageBlobs.map((blob) => blob.pathname));

  for await (const entry of iterateEntries()) {
    for (const [, { files }] of iteratePropertiesOfType(entry, "files")) {
      const filesList = Array.isArray(files) ? files : [files];
      for (const file of filesList) {
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

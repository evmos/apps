// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { get } from "lodash-es";
import { frame, clearPrevline } from "../utils/terminal";
import { program } from "@commander-js/extra-typings";
import { fetchDAppsDb, isImageBlob, log, trackedProperties } from "./utils";
import { ImageStore } from "helpers/src/image-store";
import { arrayFromAsync } from "helpers/src/array-from-async";

program
  .command("sync")
  .description("Sync images from Notion to Vercel Blob Storage")
  .option("--all", "Upload all images, not just the unsynced ones")
  .action(async (options) => {
    const blobs = await arrayFromAsync(ImageStore.getBlobs());
    const imageBlobs = blobs.filter(isImageBlob);
    const unusedImagesPathnames = new Set(
      imageBlobs.map((blob) => blob.pathname),
    );
    const blobsByPathname = await ImageStore.getBlobsByPathname();

    log("Loading uploaded images info...");
    const pagesIter = fetchDAppsDb();
    const taskGroups: {
      tasks: [name: string, () => Promise<void>][];
      name: string;
    }[] = [];
    for await (const page of pagesIter) {
      if (!("properties" in page)) {
        continue;
      }
      const properties = page.properties;
      const name = get(
        properties,
        "Name.title[0].plain_text",
        page.id,
      ) as unknown;

      if (typeof name !== "string") {
        continue;
      }

      const tasks: [name: string, () => Promise<void>][] = [];

      for (const notionPropertyName of trackedProperties) {
        const images = get(properties, notionPropertyName);

        if (!images || !("files" in images)) {
          continue;
        }
        const files = images.files;

        if (!Array.isArray(files)) {
          continue;
        }

        for (const file of files) {
          const url = get(file, "file.url") || get(file, "external.url");
          if (!url) {
            continue;
          }
          const destinationPath = ImageStore.resolvePathname(url);

          unusedImagesPathnames.delete(destinationPath);

          if (blobsByPathname.has(destinationPath) && !options.all) continue;
          const taskFn = async () => {
            await ImageStore.uploadFromUrl(url);
          };
          const taskName = `Uploading ${notionPropertyName}`;

          tasks.push([taskName, taskFn]);
        }
      }
      if (tasks.length > 0) taskGroups.push({ tasks, name });
    }
    const taskCount = taskGroups.reduce(
      (acc, { tasks }) => acc + tasks.length,
      0,
    );

    if (taskCount > 0) {
      log(frame(`🏞️ Synchronizing ${taskCount} images...`));
    }

    const printLoading = (total: number, complete: number) => {
      const barLength = 40;
      const percent = complete / total;
      const filled = Math.round(percent * barLength);
      const bar = "░".repeat(filled);
      const empty = " ".repeat(barLength - filled);
      log(`[${bar}${empty}] ${complete}/${total}`);
    };
    let tasksExecuted = 0;
    printLoading(taskCount, tasksExecuted);
    const logWithBar = (message: string) => {
      clearPrevline();
      log(message);
      printLoading(taskCount, tasksExecuted);
    };
    for (const { name, tasks } of taskGroups) {
      logWithBar(`📁 ${name} [${tasks.length}]`);
      let taskIndex = 0;
      for (const [taskName, taskFn] of tasks) {
        const isLast = taskIndex === tasks.length - 1;
        const icon = isLast ? "└─" : "├─";
        logWithBar(`└─ ⏳ ${taskName}`);
        await taskFn();
        tasksExecuted++;
        clearPrevline();
        logWithBar(`${icon} ✅ ${taskName}`);
        taskIndex++;
      }
    }
    clearPrevline();

    log();
    log("🎉 All images are synced\n");
    const statistics = ["Statistics"];
    statistics.push(
      taskCount > 0
        ? ` - ✅ ${taskCount} images uploaded`
        : " - ✅ all images are up-to-date",
    );
    const existingImages = imageBlobs.length;
    statistics.push(` - 🏞️ ${existingImages} existing images`);

    const unusedImagesCount = unusedImagesPathnames.size;

    statistics.push(
      ` - 🗑️ ${unusedImagesCount > 0 ? unusedImagesCount : "no"} unused images`,
    );
    log(frame(statistics.join("\n")));
    if (unusedImagesCount > 0) {
      log();
      log("run `pnpm dappstore-images prune` to remove unused images");
    }
  });

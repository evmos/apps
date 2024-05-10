// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { get } from "lodash-es";
import { frame, clearPrevline } from "../utils/terminal";
import { program } from "@commander-js/extra-typings";
import { isImageBlob, iterateEntries, log } from "./utils";
import { ImageStore } from "helpers/src/image-store";
import { arrayFromAsync } from "helpers/src/array-from-async";
import {
  iteratePropertiesOfType,
  tryReadPropertyAs,
} from "helpers/src/clients/notion-utils";
import { E } from "helpers/src/error-handling";

const printLoading = (total: number, complete: number) => {
  const barLength = 40;
  const percent = complete / total;
  const filled = Math.round(percent * barLength);
  const bar = "░".repeat(filled);
  const empty = " ".repeat(barLength - filled);
  log(`[${bar}${empty}] ${complete}/${total}`);
};
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
    type Task = [name: string, () => Promise<void>];

    const taskGroups: {
      tasks: Task[];
      name: string;
    }[] = [];

    for await (const entry of iterateEntries()) {
      const [, name] = E.try(() =>
        tryReadPropertyAs(entry, "Name", "title")
          .title.map(({ plain_text }) => plain_text)
          .join(" "),
      );
      const tasks: Task[] = [];
      for (const [propertyName, { files }] of iteratePropertiesOfType(
        entry,
        "files",
      )) {
        const filesList = Array.isArray(files) ? files : [files];
        for (const file of filesList) {
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
          const taskName = `Uploading ${propertyName}`;

          tasks.push([taskName, taskFn]);
        }
      }
      if (tasks.length > 0) taskGroups.push({ tasks, name: name ?? entry.id });
    }
    const taskCount = taskGroups.reduce(
      (acc, { tasks }) => acc + tasks.length,
      0,
    );

    if (taskCount > 0) {
      log(frame(`🏞️ Synchronizing ${taskCount} images...`));
    }

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

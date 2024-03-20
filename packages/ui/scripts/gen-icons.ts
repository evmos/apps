// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fileURLToPath } from "url";
import { mkdir, readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import path from "path";
import camelCase from "lodash-es/camelCase";
import { groupBy, upperFirst } from "lodash-es";
import prettier from "prettier";

/**
 * This script generates React components from SVG files in the `static/icons` directory.
 */

// @ts-expect-error this package is not typed
const svgToJsx = await import("svg-to-jsx").then(
  (m: { default: (src: string) => Promise<string> }) => m.default,
);

const DIR = fileURLToPath(new URL("../", import.meta.url));
const ICONS_DIR = path.join(DIR, "src/icons");
const ICONS_IMAGES_DIR = path.join(DIR, "static/icons");

const LICENSE_HEADER = (
  await readFile(path.join(DIR, "../../license-header.txt"), "utf-8")
)
  .split("\n")
  .filter(Boolean)
  .map((line) => `// ${line}`)
  .join("\n");

const HEADER = `
${LICENSE_HEADER}

// ⚠️ DO NOT EDIT MANUALLY ⚠️
// this file is auto-generated by scripts/gen-icons.ts

`;

const ICON_PATHS = await glob("**/*.svg", {
  cwd: ICONS_IMAGES_DIR,
});

const all = Promise.all.bind(Promise);

const getIconDestPath = (srcPath: string) => {
  return srcPath.replace(/\.svg$/, ".tsx");
};

const getIconName = (iconPath: string) => {
  const fileName = path.basename(iconPath);
  return upperFirst(camelCase(fileName.replace(/\.svg$/, "")));
};

const genIconFileFromTemplate = ({
  iconName,
  content,
}: {
  iconName: string;
  content: string;
}) => `${HEADER}

import React, { forwardRef } from "react";

export const Icon${iconName} = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function Icon${iconName}(props){
  return (${content.replace(">", "ref={props.ref} {...props}>")});
});
`;

const writeTsFile = async (filePath: string, content: string) => {
  // eslint-disable-next-line no-console
  console.log(`Writing ${filePath}`);
  await mkdir(path.dirname(filePath), {
    recursive: true,
  });
  await writeFile(
    filePath,
    await prettier.format(HEADER + "\n" + content, {
      parser: "typescript",
    }),
  );
};

// Create icon files
const iconsDestPaths = await all(
  ICON_PATHS.map(async (srcPath) => {
    const iconPath = getIconDestPath(srcPath);
    const src = await readFile(path.join(ICONS_IMAGES_DIR, srcPath), "utf-8");
    const jsx = await svgToJsx(src);
    const content = genIconFileFromTemplate({
      iconName: getIconName(srcPath),
      content: jsx,
    });
    await writeTsFile(path.join(ICONS_DIR, iconPath), content);
    return iconPath;
  }),
);

// Create barrel files
const barrelFilePaths = groupBy(iconsDestPaths, (iconPath) => {
  return path.dirname(iconPath);
});

await all(
  Object.entries(barrelFilePaths).map(async ([dir, iconPaths]) => {
    await writeTsFile(
      path.join(ICONS_DIR, dir, "index.tsx"),
      iconPaths
        .map(
          (iconPath) =>
            `export * from './${path
              .basename(iconPath)
              .replace(/\.tsx$/, "")}'`,
        )
        .join("\n"),
    );
  }),
);

await writeTsFile(
  path.join(ICONS_DIR, "index.tsx"),
  Object.keys(barrelFilePaths)
    .map((dir) => `export * as ${camelCase(dir)} from './${dir}'`)
    .join("\n"),
);

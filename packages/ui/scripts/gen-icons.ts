// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fileURLToPath } from "url";
import { mkdir, readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import path from "path";
import camelCase from "lodash-es/camelCase";
import { get, set, upperFirst } from "lodash-es";
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
}) => `
import React, { forwardRef, ForwardedRef } from "react";

function _Icon${iconName}({ className, ...props}: React.SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>){
  return (${content.replace(
    ">",
    "ref={ref} className={['icon', className].join(' ')} {...props}>",
  )});
}

_Icon${iconName}.isIcon = true;

export const Icon${iconName} = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(_Icon${iconName});
`;

const writeTsFile = async (filePath: string, content: string) => {
  // eslint-disable-next-line no-console
  console.log(`Writing ${filePath}`);
  await mkdir(path.dirname(filePath), {
    recursive: true,
  });
  const out = await prettier.format(HEADER + "\n" + content, {
    parser: "typescript",
  });
  // console.log(filePath, out)
  // return
  await writeFile(filePath, out);
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
const iconTree: Record<string, unknown> = {};

iconsDestPaths.forEach((iconPath) => {
  const dir = path.dirname(iconPath).split("/");
  const fileName = path.basename(iconPath);
  const icons = get(iconTree, dir, []) as string[];
  icons.push(fileName);
  set(iconTree, dir, icons);
});

const barrels: { path: string[]; items: string[] }[] = [];
const flattenIconsTree = (path: string[] = [], branch: unknown) => {
  if (Array.isArray(branch)) {
    barrels.push({
      path,
      items: branch as string[],
    });
    return;
  }
  Object.entries(branch as Record<string, unknown>).forEach(([key, value]) => {
    flattenIconsTree([...path, key], value);
  });
  barrels.push({ path, items: Object.keys(branch as Record<string, unknown>) });
};

flattenIconsTree([], iconTree);

await all(
  barrels.map(async (barrel) => {
    await writeTsFile(
      path.join(ICONS_DIR, ...barrel.path, "index.tsx"),
      barrel.items
        .map((_path) => {
          if (_path.endsWith(".tsx")) return `export * from './${_path}'`;
          return `export * as ${_path} from './${_path}'`;
        })
        .join("\n"),
    );
  }),
);

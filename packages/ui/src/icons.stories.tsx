// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import * as icons from "./icons";

import React, { startTransition } from "react";
import { kebabCase } from "lodash-es";
import { Button } from "./button";
const copy = (text: string) => {
  void navigator.clipboard.writeText(text);
};

const flattened: {
  Icon: React.FC;
  path: string[];
}[] = [];

const flattenIconMap = (path: string[], iconMap = {}) => {
  for (const [name, value] of Object.entries(iconMap)) {
    if (name.startsWith("Icon")) {
      flattened.push({
        path: [...path, name],
        Icon: value as React.FC,
      });
      continue;
    }
    flattenIconMap([...path, name], value as {});
  }
};

flattenIconMap([], icons);

const Page = () => {
  const [filter, setFilter] = React.useState("");
  const [pages, setPages] = React.useState(1);
  const filtered = flattened.filter(({ path }) =>
    path.join("").toLowerCase().includes(filter),
  );
  return (
    <div className="p-8">
      <div>
        <input
          type="text"
          onChange={(e) => {
            startTransition(() => {
              setFilter(e.target.value);
              setPages(1);
            });
          }}
        />
      </div>
      <h2 className="heading">{filtered.length} Icons</h2>
      <div className="grid grid-cols-4 text-center gap-4">
        {filtered.slice(0, 200 * pages).map(({ Icon, path }) => {
          return (
            <div
              key={path.join("/")}
              className="flex flex-col gap-2 dark:bg-surface-dark bg-surface p-2 rounded items-center justify-center hover:cursor-pointer"
              onClick={() => {
                copy(
                  `import { ${path.at(-1)} } from "@evmosapps/ui/icons/${path
                    .map((p) => kebabCase(p.replace(/^Icon/, "")))
                    .join("/")}.tsx"`,
                );
              }}
            >
              <h3 className="heading text-xs">{`<${path.at(-1)} />`}</h3>
              <Icon />
              <pre
                className="text-xxxs overflow-ellipsis overflow-hidden w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  return copy(path.join("/"));
                }}
              >
                {path.join("/")}
              </pre>
            </div>
          );
        })}

        <Button
          onClick={() => {
            setPages((p) => p + 1);
          }}
        >
          Show More
        </Button>
      </div>
    </div>
  );
};

const meta = {
  title: "Icons",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {
  render: Page,
};

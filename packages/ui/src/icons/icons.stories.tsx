// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import * as icons from ".";
import React from "react";
const copy = (text: string) => {
  void navigator.clipboard.writeText(text);
};
const Page = () => {
  const [filter, setFilter] = React.useState("");
  return (
    <div className="p-8">
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {Object.entries(icons).map(([name, cat]) => (
        <div key={name} className="">
          <h2 className="heading text-lg py-4">{name}</h2>
          <div className="grid grid-cols-4 text-center gap-4">
            {Object.entries(cat)
              .filter(([iconName]) => {
                if (filter === "") return true;
                return iconName.toLowerCase().includes(filter.toLowerCase());
              })
              .map(([iconName, Icon]) => {
                const importLine = `import { ${iconName} } from "@evmosapps/ui/icons/${name}"`;
                const iconLine = `<${iconName} />`;

                return (
                  <div
                    key={iconName}
                    className="flex flex-col gap-2 dark:bg-surface-dark bg-surface p-2 rounded items-center justify-center hover:cursor-pointer"
                    onClick={() => copy(`${importLine}\n${iconLine}`)}
                  >
                    <h3 className="heading text-xs">{iconName}</h3>
                    <Icon />
                    <pre
                      className="text-xxxs overflow-ellipsis overflow-hidden w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        return copy(importLine);
                      }}
                    >
                      {importLine}
                    </pre>

                    <pre
                      className="text-xxxs overflow-ellipsis overflow-hidden w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        return copy(iconLine);
                      }}
                    >
                      {iconLine}
                    </pre>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
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

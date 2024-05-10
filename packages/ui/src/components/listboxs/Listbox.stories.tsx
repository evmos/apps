// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { useState } from "react";
import type { Meta } from "@storybook/react";

import { IconChevronDown } from "../../icons/line/arrows";
import { Listbox } from "./listbox";

const meta: Meta<typeof Listbox> = {
  title: "Listboxs",
  component: Listbox,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
} as Meta<typeof Listbox>;

export default meta;

const options = [
  {
    name: "Test 1",
    id: 1,
  },
  {
    name: "Test 2",
    id: 2,
  },
];
export const Default = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button className="cursor-pointer border min-w-32 text-subheading dark:text-subheading-dark font-normal text-base flex items-center justify-between border-surface-container-highest dark:border-surface-container-highest-dark rounded-lg px-4 py-2 gap-2">
          <span className="block truncate">{selected?.name}</span>

          <IconChevronDown
            className={`w-5 text-paragraph dark:text-paragraph-dark`}
          />
        </Listbox.Button>
        <Listbox.Options className="max-w-32">
          <Listbox.Option as="div">Test 1</Listbox.Option>
          <Listbox.Option as="div">Test 2</Listbox.Option>
        </Listbox.Options>
      </Listbox>
    </>
  );
};

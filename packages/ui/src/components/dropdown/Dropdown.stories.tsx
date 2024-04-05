// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Dropdown } from "./Dropdown";

const meta = {
  title: "Dropdowns",
  component: Dropdown,
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Trade",
  },
};

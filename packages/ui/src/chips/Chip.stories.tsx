// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";
import { IconCheckboxCircle } from "../icons/line";

const meta = {
  title: "Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: { onClick: { action: "clicked" } },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <IconCheckboxCircle className="w-5 h-5" />,
    children: "Label",
  },
};

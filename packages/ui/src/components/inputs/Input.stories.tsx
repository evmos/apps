// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";
import { Label } from "../labels/Label";

const meta = {
  title: "Inputs",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder",
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: "Placeholder",
  },
  render: (props) => {
    return (
      <div className="flex flex-col space-y-2">
        <Label>Label</Label>
        <Input {...props} />
      </div>
    );
  },
};

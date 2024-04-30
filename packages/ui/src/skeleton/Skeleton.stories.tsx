// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { Story } from "@storybook/blocks";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from ".";

const meta = {
  title: "Skeleton Loading",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Skeleton.Line>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SkeletonBlock: Story = {
  render: () => {
    return <Skeleton.Block className="w-64" lines={11} />;
  },
};

export const SkeletonLine: Story = {
  render: () => {
    return <Skeleton.Line className="w-64" />;
  },
};

export const Blob: Story = {
  render: () => {
    return <Skeleton.Blob className="w-36" />;
  },
};

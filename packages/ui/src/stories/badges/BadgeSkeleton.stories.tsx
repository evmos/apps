// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { BadgeSkeleton } from "./BadgeSkeleton";

const meta = {
  title: "Badges/Skeleton",
  component: BadgeSkeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof BadgeSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Page } from "./Palette";
import { useEffect } from "react";

const meta = {
  title: "Colors",
  // component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: (_, { globals }) => {
    return <Page darkMode={globals.darkMode} />;
  },

  parameters: {
    layout: "fullscreen",
  },
};

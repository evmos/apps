// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

const meta = {
  title: "Button",
  // component: Page,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Colors: Story = {
  render: () => {
    return (
      <Button outlined className="">
        Button
      </Button>
    );
  },

  parameters: {},
};

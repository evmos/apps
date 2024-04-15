// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Dialog";

const meta = {
  title: "Dialogs",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    setIsOpen: () => {},
  },
  render: ({ isOpen }) => {
    return (
      <Modal isOpen={isOpen} setIsOpen={() => {}}>
        <Modal.Body>test</Modal.Body>
      </Modal>
    );
  },
};

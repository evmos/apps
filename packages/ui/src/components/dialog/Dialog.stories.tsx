// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { useState, useRef, useCallback } from "react";
import type { Meta } from "@storybook/react";
import { Modal } from "./Dialog";
import { Button } from "../../button";

const meta: Meta<typeof Modal> = {
  title: "Dialogs",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
} as Meta<typeof Modal>;

export default meta;
export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onDialogClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        Show dialog
      </Button>
      {isOpen && (
        <Modal isOpen={isOpen} setIsOpen={onDialogClose}>
          <Modal.Body>Modal Test</Modal.Body>
        </Modal>
      )}
    </>
  );
};

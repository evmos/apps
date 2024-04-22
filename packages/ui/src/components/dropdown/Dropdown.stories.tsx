// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { useState, useRef } from "react";
import type { Meta } from "@storybook/react";

import { Dropdown } from "./Dropdown";
import { Button } from "../../button";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdowns",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    controls: { expanded: true },
  },
} as Meta<typeof Dropdown>;

export default meta;
export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdwonRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
        <Dropdown.Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
          <Button>Dropdown</Button>
        </Dropdown.Button>
        <Dropdown.Items ref={dropdwonRef}>
          <Dropdown.Title as="div" align="center">
            Title for dropdown
          </Dropdown.Title>
          <Dropdown.Container>
            <Dropdown.Item as="div">Test 1</Dropdown.Item>
            <Dropdown.Item as="div">Test 2</Dropdown.Item>
          </Dropdown.Container>
        </Dropdown.Items>
      </Dropdown>
    </>
  );
};

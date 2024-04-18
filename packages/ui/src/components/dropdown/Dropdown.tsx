// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Menu } from "@headlessui/react";
import { Button } from "../../button";

export const Dropdown = () => {
  return (
    <Menu>
      <Menu.Button>
        <Button as="div">Sign in</Button>
      </Menu.Button>

      <Menu.Items className="bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high w-[296px] rounded-2xl p-3 mt-5">
        <Menu.Item as="div">title</Menu.Item>
        <Menu.Item
          as="a"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          1
        </Menu.Item>
        <Menu.Item as="a" onClick={() => {}}>
          2
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

"use client";

import { Menu } from "@headlessui/react";

import { Dispatch, SetStateAction } from "react";

import { ProvidersIcons } from "stateful-components/src/providerIcons";
import { Connector, useAccount } from "wagmi";
import { ProfileButton } from "./Buttons";
import { SettingsTitle } from "./Titles";
import { SettingsOptions } from "./Options";

export const Settings = ({ connector }: { connector: Connector }) => {
  return (
    <div className="relative">
      <Menu>
        {({}) => (
          <>
            <ProfileButton />

            <Menu.Items
              static
              className="text-center justify-center items-center space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
              <SettingsTitle />

              <div>
                name
                <span>Edit</span>
              </div>

              <SettingsOptions />
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

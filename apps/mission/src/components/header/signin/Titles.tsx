// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Menu } from "@headlessui/react";

import { Connector } from "wagmi";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { Dispatch, SetStateAction } from "react";

import { getIcon } from "./helpers";
export const SignInTitle = () => {
  return (
    <Menu.Item as="div" className="text-center text-base font-medium leading-5">
      Sign in with wallet
    </Menu.Item>
  );
};

export const ProfileTitle = ({
  connector,
  setDropdownStatus,
}: {
  connector: Connector;
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const Icon = getIcon(connector.name);
  return (
    <Menu.Item
      as="button"
      className="text-center flex items-center justify-bewteen w-full px-3 "
      onClick={(e) => {
        e.preventDefault();
        setDropdownStatus("wallets");
      }}
    >
      <div className="flex items-center w-full gap-3 text-sm leading-5 font-medium">
        {Icon && <Icon className="w-5" />} Wallet
        <span className="text-paragraph dark:text-paragraph-dark font-normal">
          {connector?.name}
        </span>
      </div>
      <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
    </Menu.Item>
  );
};

export const SettingsTitle = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Menu.Item
      as="button"
      className="text-center flex px-3 text-base  items-center w-full gap-3  leading-5 font-medium"
      onClick={() => {
        setDropdownStatus("profile");
      }}
    >
      <IconArrowLeft className="w-5 text-paragraph dark:text-paragraph-dark" />
      Settings
    </Menu.Item>
  );
};

export const WalletsTitle = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Menu.Item
      as="button"
      className="text-center flex px-3 gap-3 text-base items-center w-full leading-5 font-medium"
      onClick={() => {
        setDropdownStatus("profile");
      }}
    >
      <IconArrowLeft className="w-5 text-paragraph dark:text-paragraph-dark" />
      Wallet
    </Menu.Item>
  );
};

import { Menu } from "@headlessui/react";
import { ProvidersIcons } from "stateful-components/src/providerIcons";
import { Connector } from "wagmi";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { Dispatch, SetStateAction } from "react";
export const SignInTitle = () => {
  return (
    <Menu.Item as="div" className="text-center">
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
  // TODO Mili: use the icon that is in supportWallets
  const Icon = ProvidersIcons[connector?.name];
  return (
    <Menu.Item
      as="button"
      className="text-center flex items-center justify-bewteen w-full px-3 "
      onClick={(e) => {
        e.preventDefault();
        setDropdownStatus("wallets");
      }}
    >
      <div className="flex items-center w-full gap-4 text-sm leading-5 font-medium">
        {Icon && <Icon width="1.4em" height="1.4em" />} Wallet
        <span className="text-paragraph dark:text-paragraph-dark font-normal">
          {connector?.name}
        </span>
      </div>
      {<IconChevronRight className="w-7" />}
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
      className="text-center flex px-3 gap-3"
      onClick={() => {
        setDropdownStatus("profile");
      }}
    >
      <IconArrowLeft />
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
      className="text-center flex px-3 gap-3"
      onClick={() => {
        setDropdownStatus("profile");
      }}
    >
      <IconArrowLeft />
      Wallets
    </Menu.Item>
  );
};

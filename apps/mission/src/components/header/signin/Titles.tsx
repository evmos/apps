// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Connector } from "wagmi";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { Dispatch, SetStateAction } from "react";

import { getIcon } from "./helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { Dropdown } from "../../../../../../packages/ui/src/components/dropdown/Dropdown";

export const SignInTitle = () => {
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Title as="div" align="center">
      {t("signIn.title")}
    </Dropdown.Title>
  );
};

export const ProfileTitle = ({
  connector,
  setDropdownStatus,
}: {
  connector: Connector;
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation("dappStore");
  const Icon = getIcon(connector.name);
  return (
    <Dropdown.Title
      as="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDropdownStatus("wallets");
      }}
    >
      <div className="flex items-center w-full gap-3 text-sm leading-5 font-medium">
        {Icon && <Icon className="w-5" />} {t("profile.title")}
        <span className="text-paragraph dark:text-paragraph-dark font-normal">
          {connector?.name}
        </span>
      </div>
      <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
    </Dropdown.Title>
  );
};

export const SettingsTitle = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Title
      as="button"
      onClick={() => {
        setDropdownStatus("profile");
      }}
    >
      <IconArrowLeft className="w-5 text-paragraph dark:text-paragraph-dark" />
      {t("signIn.settings.title")}
    </Dropdown.Title>
  );
};

export const WalletsTitle = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Title
      as="button"
      onClick={() => {
        setDropdownStatus("profile");
      }}
    >
      <IconArrowLeft className="w-5 text-paragraph dark:text-paragraph-dark" />
      {t("signIn.switchWallet.title")}
    </Dropdown.Title>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { Dispatch, SetStateAction } from "react";

import { getWalletByConnector } from "./helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";

export const SignInTitle = () => {
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Title as="div" align="center">
      {t("signIn.title")}
    </Dropdown.Title>
  );
};

export const ProfileTitle = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { connector } = useWallet();
  const { t } = useTranslation("dappStore");

  if (!connector) {
    return null;
  }
  const walletByConnector = getWalletByConnector(connector.name);
  const Icon = walletByConnector?.icon;
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
          {walletByConnector?.displayName}
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
      align="left"
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
      align="left"
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

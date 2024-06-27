// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useTranslation } from "@evmosapps/i18n/client";
import { IconWalletPlus } from "@evmosapps/ui/icons/line/finances/wallet-plus.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useOtherWalletsModal } from "./WalletsModal";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";

export const SignInTitle = () => {
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Title as="div" align="center">
      {t("signIn.title")}
    </Dropdown.Title>
  );
};

export const SignInOptions = () => {
  const otherWalletsModal = useOtherWalletsModal();
  const { setIsDropdownOpen } = useWallet();
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Container>
      <Dropdown.Item
        as="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          otherWalletsModal.setIsOpen(true, {}, true);
          setIsDropdownOpen(false);
        }}
      >
        {
          <IconWalletPlus className="w-7 text-paragraph dark:text-paragraph-dark" />
        }
        <div className="text-left flex justify-between w-full items-center">
          {t("signIn.supportedWallets.title")}
          <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
        </div>
      </Dropdown.Item>
    </Dropdown.Container>
  );
};


export const WalletsTitle = () => {
  const { t } = useTranslation("dappStore");
  const { setDropdownState } = useWallet();
  return (
    <Dropdown.Title
      align="left"
      as="button"
      onClick={() => {
        setDropdownState("profile");
      }}
    >
      <IconArrowLeft className="w-5 text-paragraph dark:text-paragraph-dark" />
      {t("signIn.switchWallet.title")}
    </Dropdown.Title>
  );
};

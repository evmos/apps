// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { Pulse } from "@evmosapps/ui/components/pulse/Pulse.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { IconWalletPlus } from "@evmosapps/ui/icons/line/finances/wallet-plus.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useOtherWalletsModal } from "./WalletsModal";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { CLICK_CONNECT_WALLET_BUTTON, sendEvent } from "tracker";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { useSignInModal } from "./Signin/Modal";
export const SignInButton = () => {
  const { isDropdownOpen } = useWallet();
  const { t } = useTranslation("dappStore");
  return (
    <Button
      as="div"
      className="relative"
      outlined={isDropdownOpen}
      onClick={() => {
        if (!isDropdownOpen) {
          sendEvent(CLICK_CONNECT_WALLET_BUTTON);
        }
      }}
    >
      {!isDropdownOpen && <Pulse />}
      {t("signIn.button")}
    </Button>
  );
};

export const SignInTitle = () => {
  const { t } = useTranslation("dappStore");
  const signInModal = useSignInModal();
  return (
    <Dropdown.Title as="div" align="center">
      {t("signIn.title")}
      <button
        className="rounded-full bg-primary-container-dark p-1 text-xs"
        onClick={() => {
          signInModal.setIsOpen(true, {}, true);
        }}
      >
        modal
      </button>
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

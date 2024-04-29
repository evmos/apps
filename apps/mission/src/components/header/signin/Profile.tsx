// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { getWalletByConnector } from "./helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { CopyButton } from "./CopyButton";
import { Suspense } from "react";
import { TotalEvmos, TotalUsd } from "./useEvmosBalance";
import { useAccount, useDisconnect } from "wagmi";
import { IconArrowSwap } from "@evmosapps/ui/icons/line/arrows/arrow-swap.tsx";
import { IconPlus } from "@evmosapps/ui/icons/line/basic/plus.tsx";
import { IconGear } from "@evmosapps/ui/icons/line/basic/gear.tsx";
import { IconLogOut2 } from "@evmosapps/ui/icons/line/arrows/log-out-2.tsx";
import Link from "next/link";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";

const ProfileTitle = () => {
  const { connector, setDropdownState } = useWallet();
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
        setDropdownState("wallets");
      }}
    >
      <div className="flex items-center w-full gap-3 text-sm leading-5 font-medium">
        {Icon && <Icon className="w-7 shrink-0" />} {t("profile.title")}
        <span className="text-paragraph dark:text-paragraph-dark font-normal">
          {walletByConnector?.displayName}
        </span>
      </div>
      <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
    </Dropdown.Title>
  );
};

const ProfileOptions = () => {
  const { address } = useAccount();
  const { setIsDropdownOpen } = useWallet();
  const { t } = useTranslation("dappStore");
  if (!address) return null;

  return (
    <Dropdown.Container className="space-y-6 pt-8 pb-10 pl-1 pr-2">
      <div className=" flex justify-center flex-col gap-3 items-center">
        <div className="cursor-default w-fit gap-3 hover:dark:bg-opacity-50 transition-all duration-200  flex items-center text-paragraph dark:text-paragraph-dark text-xs leading-4 font-medium bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-2xl px-3 py-2">
          <AddressDisplay address={address} />
          {address && <CopyButton text={address} />}
        </div>
      </div>
      <div>
        <h6 className="text-2xl font-medium text-heading dark:text-heading-dark leading-8">
          <Suspense
            fallback={
              <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
            }
          >
            {address && <TotalEvmos address={address} />}
          </Suspense>
          {!address && "-"} <span className="">EVMOS</span>
        </h6>
        <p className="font-medium text-paragraph dark:text-paragraph-dark leading-5 text-sm">
          {!address && "-"}
          <Suspense
            fallback={
              <span className="bg-white/5 w-16 h-[0.8lh] animate-pulse rounded-lg "></span>
            }
          >
            {address && <TotalUsd address={address} />} USD
          </Suspense>
        </p>
      </div>
      <div className="flex justify-center gap-4 text-paragraph dark:text-paragraph-dark text-xs">
        <div className="flex flex-col gap-2 items-center justify-center ">
          <Link href="/portfolio">
            <IconButton
              variant="low-emphasis"
              onClick={() => {
                setIsDropdownOpen(false);
              }}
            >
              <IconArrowSwap />
            </IconButton>
          </Link>
          <p>{t("profile.options.portfolio")}</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Link href="/dapps/on-ramps/transak">
            <IconButton
              variant="low-emphasis"
              onClick={() => {
                setIsDropdownOpen(false);
              }}
            >
              <IconPlus />
            </IconButton>
          </Link>
          <p>{t("profile.options.topUp")}</p>
        </div>
      </div>
    </Dropdown.Container>
  );
};

const ProfileSettings = () => {
  const { setIsDropdownOpen, setDropdownState } = useWallet();
  const { t } = useTranslation("dappStore");
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {},
    },
  });
  return (
    <Dropdown.Container>
      <Dropdown.Item
        as="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          setDropdownState("settings");
        }}
      >
        {<IconGear className="w-5 text-paragraph dark:text-paragraph-dark" />}
        <div className="text-left flex justify-between w-full items-center ">
          {t("profile.options.settings")}
          {
            <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
          }
        </div>
      </Dropdown.Item>

      <Dropdown.Item
        as="button"
        onClick={() => {
          disconnect();
          setIsDropdownOpen(false);
          // sendEvent(CLICK_DISCONNECT_WALLET_BUTTON);
        }}
      >
        {
          <IconLogOut2 className="w-5 text-paragraph dark:text-paragraph-dark" />
        }
        <div className="text-left flex justify-between w-full items-center ">
          {t("profile.options.signOut")}
        </div>
      </Dropdown.Item>
    </Dropdown.Container>
  );
};

export const Profile = () => {
  return (
    <>
      <ProfileTitle />
      <ProfileOptions />
      <ProfileSettings />
    </>
  );
};

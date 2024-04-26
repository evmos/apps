// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useOtherWalletsModal } from "./WalletsModal";
import { IconWalletPlus } from "@evmosapps/ui/icons/line/finances/wallet-plus.tsx";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { CopyButton } from "./CopyButton";
import { Dispatch, SetStateAction, Suspense } from "react";
import { TotalEvmos, TotalUsd } from "./useEvmosBalance";
import { useAccount, useDisconnect } from "wagmi";
import { IconArrowSwap } from "@evmosapps/ui/icons/line/arrows/arrow-swap.tsx";
import { IconPlus } from "@evmosapps/ui/icons/line/basic/plus.tsx";
import { IconGear } from "@evmosapps/ui/icons/line/basic/gear.tsx";
import { IconLogOut2 } from "@evmosapps/ui/icons/line/arrows/log-out-2.tsx";
import { IconDollarCircle } from "@evmosapps/ui/icons/line/finances/dollar-circle.tsx";
import { IconGlobe } from "@evmosapps/ui/icons/line/map/globe.tsx";
import { IconBell } from "@evmosapps/ui/icons/line/alerts/bell.tsx";
import { IconHashtag } from "@evmosapps/ui/icons/line/basic/hashtag.tsx";
import Link from "next/link";
import { Chip } from "@evmosapps/ui/chips/Chip.tsx";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { useTranslation } from "@evmosapps/i18n/client";

export const SignInOptions = () => {
  const otherWalletsModal = useOtherWalletsModal();
  const { setIsOpen } = useWallet();
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Container>
      <Dropdown.Item
        as="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          otherWalletsModal.setIsOpen(true, {}, true);
          setIsOpen(false);
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

export const ProfileSettings = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { setIsOpen } = useWallet();
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
          setDropdownStatus("settings");
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
          setIsOpen(false);
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

export const ProfileOptions = () => {
  const { address } = useAccount();
  const { setIsOpen } = useWallet();
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
                setIsOpen(false);
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
                setIsOpen(false);
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

const settingsOptions = [
  {
    icon: IconDollarCircle,
    title: "signIn.settings.options.currency",
    description: "USD",
    isComingSoon: false,
    isDisabled: true,
  },
  {
    icon: IconGlobe,
    title: "signIn.settings.options.language",
    description: "signIn.settings.options.english",
    isComingSoon: false,
    isDisabled: true,
  },
  {
    icon: IconBell,
    title: "signIn.settings.options.notifications",
    description: "",
    isComingSoon: true,
    isDisabled: true,
  },
  {
    icon: IconHashtag,
    title: "signIn.settings.options.addressFormat",
    description: "",
    isComingSoon: true,
    isDisabled: true,
  },
];

export const SettingsOptions = () => {
  const { t } = useTranslation("dappStore");
  return (
    <div>
      <div>
        <p className="text-left text-subheading dark:text-subheading-dark text-xs leading-4 font-medium mb-2">
          {t("signIn.settings.options.title")}
        </p>
      </div>
      <Dropdown.Container>
        {settingsOptions.map((option) => {
          return (
            <Dropdown.Item
              as="div"
              key={option.title}
              disabled={option.isDisabled}
            >
              {
                <option.icon className="w-4 text-paragraph dark:text-paragraph-dark" />
              }
              <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
                {t(option.title)}
                <span className="text-paragraph dark:text-paragraph-dark">
                  {t(option.description)}
                </span>
                {option.isComingSoon && (
                  <Chip variant="tertiary" disabled>
                    {t("signIn.settings.options.comingSoon")}
                  </Chip>
                )}
              </div>
            </Dropdown.Item>
          );
        })}
      </Dropdown.Container>
    </div>
  );
};

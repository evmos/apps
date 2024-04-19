// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Menu } from "@headlessui/react";
import { useOtherWalletsModal } from "./WalletsModal";
import { IconWalletPlus } from "@evmosapps/ui/icons/line/finances/wallet-plus.tsx";
import { IconButton } from "../../../../../../packages/ui/src/button/icon-button";
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
import { Chip } from "../../../../../../packages/ui/src/chips/Chip";

export const SignInOptions = ({ close }: { close?: () => void }) => {
  const otherWalletsModal = useOtherWalletsModal();
  return (
    <div
      className="rounded-xl bg-surface-container dark:bg-surface-container-dark 
    [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark  gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10  focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark "
    >
      <Menu.Item
        className="pt-3 pb-2 pl-2 pr-5 flex items-center justify-between w-full gap-4"
        as="button"
        onClick={(e) => {
          e.preventDefault();
          otherWalletsModal.setIsOpen(true, {}, true);
          close && close();
        }}
      >
        {
          <IconWalletPlus className="w-7 text-paragraph dark:text-paragraph-dark" />
        }
        <div className="text-left flex justify-between w-full items-center">
          Other wallets
          <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
        </div>
      </Menu.Item>
    </div>
  );
};

export const ProfileSettings = ({
  setDropdownStatus,
  setIsOpen,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        // setIsOpen(false);
      },
    },
  });
  return (
    <div>
      <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark">
        <Menu.Item
          className=" flex items-center justify-between w-full py-3 px-3
          [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 hover:rounded-lg focus-visible:rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark "
          as="button"
          onClick={(e) => {
            e.preventDefault();
            setDropdownStatus("settings");
            // otherWalletsModal.setIsOpen(true, {}, true);
            // close();
          }}
        >
          {<IconGear className="w-5 text-paragraph dark:text-paragraph-dark" />}
          <div className="text-left flex justify-between w-full items-center ">
            Settings
            {
              <IconChevronRight className="w-5 text-paragraph dark:text-paragraph-dark" />
            }
          </div>
        </Menu.Item>

        <Menu.Item
          className=" flex items-center justify-between w-full py-3 px-3
          [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark gap-4 hover:bg-primary/10 hover:dark:bg-primary-dark/10 rounded-lg focus:bg-on-surface/10 focus:dark:bg-on-surface-dark/10 focus:ring-1 focus:ring-tertiary-container focus:dark:ring-tertiary-container-dark"
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
            Sign out
          </div>
        </Menu.Item>
      </div>
    </div>
  );
};

export const ProfileOptions = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { address } = useAccount();
  if (!address) return null;

  return (
    <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark pt-8 pb-10 pl-1 pr-2 space-y-6">
      <Menu.Item
        as="div"
        className=" flex justify-center flex-col gap-3 items-center"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <div className="cursor-default w-fit gap-3 hover:dark:bg-opacity-50 transition-all duration-200  flex items-center text-paragraph dark:text-paragraph-dark text-xs leading-4 font-medium bg-surface-container-highest dark:bg-surface-container-highest-dark rounded-2xl px-3 py-2">
          <AddressDisplay address={address} />
          {address && <CopyButton text={address} />}
        </div>
      </Menu.Item>
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
          <p>Portfolio</p>
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
          <p>Topup</p>
        </div>
      </div>
    </div>
  );
};

export const SettingsOptions = () => {
  return (
    <div>
      <div>
        <p className="text-left text-subheading dark:text-subheading-dark text-xs leading-4 font-medium mb-2">
          Account
        </p>
      </div>
      <div>
        {/* TODO Mili: fix border bottom, is not appearing correctly */}
        <div
          className="
        rounded-xl bg-surface-container  dark:bg-surface-container-dark pt-1 pb-2 pl-1 pr-2 [&:not(:last-child)]:border-b border-b-surface-container-high dark:border-b-surface-container-high-dark"
        >
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4  "
            as="div"
          >
            {
              <IconDollarCircle className="w-4 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Currency
              <span className="text-paragraph dark:text-paragraph-dark">
                USD
              </span>
            </div>
          </Menu.Item>
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconGlobe className="w-4 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Language
              <span className="text-paragraph dark:text-paragraph-dark">
                English
              </span>
            </div>
          </Menu.Item>
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconBell className="w-4 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Notifications
              <Chip variant="tertiary" disabled>
                Coming soon
              </Chip>
            </div>
          </Menu.Item>
          <Menu.Item
            className="pt-3 pb-2 px-3 flex items-center w-full gap-4 "
            as="div"
          >
            {
              <IconHashtag className="w-4 text-paragraph dark:text-paragraph-dark" />
            }
            <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
              Address Format
              <Chip variant="tertiary" disabled>
                Coming soon
              </Chip>
              {/* <Button variant="tertiary">Coming soon</Button> */}
            </div>
          </Menu.Item>
        </div>
      </div>
    </div>
  );
};

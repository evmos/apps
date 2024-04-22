// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

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
import { Dropdown } from "../../../../../../packages/ui/src/components/dropdown/Dropdown";

export const SignInOptions = ({ close }: { close?: () => void }) => {
  const otherWalletsModal = useOtherWalletsModal();
  return (
    <Dropdown.Item
      as="button"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
    </Dropdown.Item>
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
          Settings
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
          Sign out
        </div>
      </Dropdown.Item>
    </Dropdown.Container>
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
    <Dropdown.Container className="space-y-6 pt-8 pb-10 pl-1 pr-2">
      <div
        className=" flex justify-center flex-col gap-3 items-center"
        onClick={(e) => {
          e.preventDefault();
          // TODO Mili: delete this setisopen
          setIsOpen(false);
        }}
      >
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
      {/* <div className="flex justify-center gap-4 text-paragraph dark:text-paragraph-dark text-xs">
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
      </div> */}
    </Dropdown.Container>
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
      <Dropdown.Container>
        {/* TODO Mili: fix border bottom, is not appearing correctly */}

        <Dropdown.Item disabled as="div">
          {
            <IconDollarCircle className="w-4 text-paragraph dark:text-paragraph-dark" />
          }
          <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
            Currency
            <span className="text-paragraph dark:text-paragraph-dark">USD</span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item as="div" disabled>
          {
            <IconGlobe className="w-4 text-paragraph dark:text-paragraph-dark" />
          }
          <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
            Language
            <span className="text-paragraph dark:text-paragraph-dark">
              English
            </span>
          </div>
        </Dropdown.Item>
        <Dropdown.Item as="div" disabled>
          {<IconBell className="w-4 text-paragraph dark:text-paragraph-dark" />}
          <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
            Notifications
            <Chip variant="tertiary" disabled>
              Coming soon
            </Chip>
          </div>
        </Dropdown.Item>
        <Dropdown.Item as="div" disabled>
          {
            <IconHashtag className="w-4 text-paragraph dark:text-paragraph-dark" />
          }
          <div className="text-left flex gap-3 w-full items-center text-sm text-heading dark:text-heading-dark leading-5 font-normal ">
            Address Format
            <Chip variant="tertiary" disabled>
              Coming soon
            </Chip>
          </div>
        </Dropdown.Item>
      </Dropdown.Container>
    </div>
  );
};

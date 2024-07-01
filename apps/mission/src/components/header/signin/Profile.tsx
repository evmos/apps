// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { getWalletByConnector } from "./helpers";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { CopyButton } from "@evmosapps/ui-helpers/src/CopyButton.tsx";
import { TotalEvmos, TotalUsd } from "./useEvmosBalance";
import { useDisconnect } from "wagmi";
import { IconArrowSwap } from "@evmosapps/ui/icons/line/arrows/arrow-swap.tsx";
import { IconPlus } from "@evmosapps/ui/icons/line/basic/plus.tsx";
import { IconGear } from "@evmosapps/ui/icons/line/basic/gear.tsx";
import { IconLogOut2 } from "@evmosapps/ui/icons/line/arrows/log-out-2.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";
import { IconChevronRight } from "@evmosapps/ui/icons/line/arrows/chevron-right.tsx";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import {
  CLICK_DISCONNECT_WALLET_BUTTON,
  sendEvent,
  CLICK_ON_PORTFOLIO,
  CLICK_ON_TOP_UP,
} from "tracker";
import { SuspenseBoundary } from "./SuspenseBoundary";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { signOut } from "next-auth/react";
import { useUserProfile } from "@evmosapps/user/auth/use-user-session.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const { data: user } = useUserProfile();
  const { setIsDropdownOpen } = useWallet();
  const { t } = useTranslation("dappStore");
  if (!user) return null;
  const address = user.defaultWalletAccount.address;

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
          {!address && "-"}
          <SuspenseBoundary
            errorFallback={null}
            fallback={
              <span className="animate-pulse w-24 h-7 inline-flex bg-white/20 rounded-full my-1" />
            }
          >
            {address && <TotalEvmos address={address} />} EVMOS
          </SuspenseBoundary>
        </h6>
        <p className="font-medium text-paragraph dark:text-paragraph-dark leading-5 text-sm">
          {!address && "-"}
          <SuspenseBoundary
            errorFallback={null}
            fallback={
              <span className="animate-pulse w-24 h-5 inline-flex bg-white/20 rounded-full" />
            }
          >
            {address && <TotalUsd address={address} />} USD
          </SuspenseBoundary>
        </p>
      </div>
      <div className="flex justify-center gap-4 text-paragraph dark:text-paragraph-dark text-xs">
        <div className="flex flex-col gap-2 items-center justify-center ">
          <IconButton
            as={Link}
            href="/portfolio"
            variant="low-emphasis"
            onClick={() => {
              setIsDropdownOpen(false);
              sendEvent(CLICK_ON_PORTFOLIO);
            }}
          >
            <IconArrowSwap />
          </IconButton>

          <p>{t("profile.options.portfolio")}</p>
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <IconButton
            as={Link}
            href="/dapps/on-ramps/transak"
            variant="low-emphasis"
            onClick={() => {
              setIsDropdownOpen(false);
              sendEvent(CLICK_ON_TOP_UP);
            }}
          >
            <IconPlus />
          </IconButton>

          <p>{t("profile.options.topUp")}</p>
        </div>
      </div>
    </Dropdown.Container>
  );
};

const ProfileSettings = () => {
  const { setIsDropdownOpen, setDropdownState } = useWallet();
  const { t } = useTranslation("dappStore");
  const queryClient = useQueryClient();
  const { disconnectAsync } = useDisconnect({});
  const { mutate: signOutMutate, isPending } = useMutation({
    mutationFn: async () => {
      sendEvent(CLICK_DISCONNECT_WALLET_BUTTON);
      await signOut({ redirect: false });
      await disconnectAsync();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user", "session"] });
      setIsDropdownOpen(false);
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
        disabled={isPending}
        onClick={() => {
          signOutMutate();
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

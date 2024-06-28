// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import Image from "next/image";
import { useEditModal } from "../edit/ModalEdit";
import { cn } from "helpers";
import { IconEdit2 } from "@evmosapps/ui/icons/line/editor/edit-2.tsx";
import { IconArrowLeft } from "@evmosapps/ui/icons/line/arrows/arrow-left.tsx";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { useWallet } from "@evmosapps/evmos-wallet";
import { IconDollarCircle } from "@evmosapps/ui/icons/line/finances/dollar-circle.tsx";
import { IconGlobe } from "@evmosapps/ui/icons/line/map/globe.tsx";
import { IconBell } from "@evmosapps/ui/icons/line/alerts/bell.tsx";
import { IconHashtag } from "@evmosapps/ui/icons/line/basic/hashtag.tsx";
import { Chip } from "@evmosapps/ui/chips/Chip.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useUserProfile } from "@evmosapps/user/auth/use-user-session.ts";
import { IconTrash2 } from "@evmosapps/ui/icons/line/basic/trash-2.tsx";
import { useDeleteProfileModal } from "./ModalDeleteProfile";

const SettingsOptions = () => {
  const { t } = useTranslation("dappStore");
  const deleteProfileModal = useDeleteProfileModal();
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
    {
      icon: IconTrash2,
      title: "signIn.settings.options.deleteProfile",
      description: "",
      isComingSoon: false,
      isDisabled: false,
      onClick: () => {
        deleteProfileModal.setIsOpen(true, {}, true);
      },
    },
  ];
  return (
    <div>
      <div>
        <p className="text-left text-subheading dark:text-subheading-dark text-xs leading-4 font-medium mb-2">
          {t("signIn.settings.options.title")}
        </p>
      </div>
      <Dropdown.Container>
        {settingsOptions?.map((option) => {
          return (
            <Dropdown.Item
              as="div"
              key={option.title}
              disabled={option.isDisabled}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                option.onClick && option.onClick();
              }}
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
                  <Chip variant="tertiary" className="-ml-3 pl-0" disabled>
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

const SettingsTitle = () => {
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
      {t("signIn.settings.title")}
    </Dropdown.Title>
  );
};

const SettingsAddress = () => {
  const { data: user } = useUserProfile();
  const editModal = useEditModal();
  const { setIsDropdownOpen } = useWallet();
  if (!user) return null;
  const image = user.profilePictureUrl;
  const address = user.defaultWalletAccount.address;
  return (
    <button
      onClick={() => {
        editModal.setIsOpen(true, {}, true);
        setIsDropdownOpen(false);
      }}
      className="flex justify-between w-full rounded-xl bg-surface-container dark:bg-surface-container-dark p-3 gap-4"
    >
      <div className="flex items-center space-x-3">
        {image && (
          <Image
            src={image}
            width={24}
            height={24}
            alt={user.displayName || address}
            className={cn("rounded-full")}
          />
        )}
        {!user.displayName ? (
          <AddressDisplay address={address} />
        ) : (
          <span className="text-sm leading-5 font-medium text-heading dark:text-heading-dark">
            {user.displayName}
          </span>
        )}
      </div>
      <IconEdit2 className="w-4 text-heading dark:text-heading-dark" />
    </button>
  );
};

export const Settings = () => {
  return (
    <>
      <SettingsTitle />
      <SettingsAddress />
      <SettingsOptions />
    </>
  );
};

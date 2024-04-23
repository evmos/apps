// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { SettingsTitle } from "./Titles";
import { SettingsOptions } from "./Options";
import { Dispatch, SetStateAction } from "react";

import Image, { StaticImageData } from "next/image";
import { profileImages, useEditModal } from "../edit/ModalEdit";
import { cn } from "helpers";
import { IconEdit2 } from "@evmosapps/ui/icons/line/editor/edit-2.tsx";

import { ProfileContext, useProfileContext } from "../edit/useEdit";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { useAccount } from "wagmi";
export const Settings = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { name: profileName, img } = useProfileContext() as ProfileContext;
  const image = profileImages[img] as StaticImageData;
  const editModal = useEditModal();
  const { address } = useAccount();

  return (
    <>
      <SettingsTitle setDropdownStatus={setDropdownStatus} />
      <button
        onClick={() => {
          editModal.setIsOpen(true, {}, true);
        }}
        className="flex justify-between w-full rounded-xl bg-surface-container  dark:bg-surface-container-dark  p-3 gap-4"
      >
        <div className="flex items-center space-x-3">
          <Image
            // TODO Mili: add blur ?
            src={image.src}
            width={24}
            height={24}
            alt={image.src}
            className={cn("rounded-full")}
          />

          {profileName === "" ? (
            <AddressDisplay address={address} />
          ) : (
            <span className="text-sm leading-5 font-medium text-heading dark:text-heading-dark">
              {profileName}
            </span>
          )}
        </div>
        <IconEdit2 className="w-4 text-heading dark:text-heading-dark" />
      </button>

      <SettingsOptions />
    </>
  );
};

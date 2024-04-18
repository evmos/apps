"use client";

import { SettingsTitle } from "./Titles";
import { SettingsOptions } from "./Options";
import { Dispatch, SetStateAction } from "react";

import Image, { StaticImageData } from "next/image";
import { profileImages, useEditModal } from "../edit/ModalEdit";
import { cn } from "helpers";
import { IconEdit2 } from "@evmosapps/ui/icons/line/editor/edit-2.tsx";

import { ProfileContext, useProfileContext } from "../edit/useEdit";
export const Settings = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { name: profileName, img } = useProfileContext() as ProfileContext;
  const image = profileImages[img] as StaticImageData;
  const editModal = useEditModal();

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
            src={image.src}
            width={24}
            height={24}
            alt={image.src}
            className={cn("rounded-full")}
          />

          <span>{profileName}</span>
        </div>
        <IconEdit2 />
      </button>

      <SettingsOptions />
    </>
  );
};
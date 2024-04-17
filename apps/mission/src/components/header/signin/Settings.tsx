"use client";

import { Menu } from "@headlessui/react";
import { ProfileButton } from "./Buttons";
import { SettingsTitle } from "./Titles";
import { SettingsOptions } from "./Options";
import { Dispatch, SetStateAction } from "react";
import { useEdit } from "../edit/useEdit";
import Image, { StaticImageData } from "next/image";
import { profileImages, useEditModal } from "../edit/ModalEdit";
import { cn } from "helpers";
import { IconEdit2 } from "@evmosapps/ui/icons/line/editor/edit-2.tsx";
export const Settings = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { profileImg, profileName } = useEdit();
  const img = profileImages[profileImg] as StaticImageData;
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
            src={img.src}
            width={24}
            height={24}
            alt={img.src}
            className={cn("rounded-full ")}
          />

          <span>{profileName}</span>
        </div>
        <IconEdit2 />
      </button>

      <SettingsOptions />
    </>
  );
};

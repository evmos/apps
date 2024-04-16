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
    <div className="relative">
      <Menu>
        {({}) => (
          <>
            <ProfileButton />

            <Menu.Items
              static
              className="text-center justify-center items-center space-y-5 z-10 absolute right-0 mt-2 w-96 origin-top-right bg-surface-container-low dark:bg-surface-container-low-dark border border-surface-container dark:border-surface-container-dark text-surface-container-high-dark dark:text-surface-container-high  rounded-2xl p-3"
            >
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
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
};

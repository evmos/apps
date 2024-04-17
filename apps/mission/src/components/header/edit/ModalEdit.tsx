// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "../../../../../../packages/ui/src/components/dialog/Dialog";
import { Input } from "../../../../../../packages/ui/src/components/inputs/Input";
import { Label } from "../../../../../../packages/ui/src/components/labels/Label";
import { Button } from "../../../../../../packages/ui/src/button/index";
import { cn, useModal } from "helpers";
import purple from "../../../../public/purple.png";
import orange from "../../../../public/orange.png";
import Image from "next/image";
import { useEdit } from "./useEdit";
import { useTranslation } from "@evmosapps/i18n/client";
// import { generateBlurImage } from "helpers/src/schemas/entities/generateBlurImage";
export const useEditModal = () => useModal("edit");
export const profileImages = [purple, orange];

export const EditModal = () => {
  const { isOpen, setIsOpen, modalProps } = useEditModal();
  const {
    profileImg,
    setProfileImg,
    profileName,
    setProfileName,
    setProfileImgDb,
    setProfileNameDb,
  } = useEdit();
  const { t } = useTranslation("dappStore");
  // console.log(profileName);
  const handleOnClick = () => {
    setProfileImgDb(profileImg);

    profileName && setProfileName(profileName);
    profileName && setProfileNameDb(profileName);
    setIsOpen(false);
    // TODO Mili: add notification when changes are saved.
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Body>
        {modalProps && (
          <div className="space-y-5">
            <Modal.Header>{t("profile.modal.title")}</Modal.Header>
            <div className="flex flex-col">
              <div className="flex items-center space-x-6">
                {profileImages.map((img, index) => (
                  <Image
                    // blurDataURL={await generateBlurImage(img.src)}
                    key={index}
                    src={img.src}
                    width={80}
                    height={80}
                    alt={img.src}
                    className={cn(
                      "rounded-full cursor-pointer transition-all duration-150 ease-out hover:scale-105 overflow-hidden",
                      {
                        "ring-1 ring-tertiary-container dark:ring-tertiary-container-dark ":
                          profileImg === index,
                      },
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setProfileImg(index);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label>{t("profile.modal.label")}</Label>
              <Input
                fullWidth
                placeholder={t("profile.modal.placeholder")}
                value={profileName}
                onChange={handleOnChange}
              />
            </div>
            <Modal.Separator />
            <div className="flex justify-end">
              <Button onClick={handleOnClick}>
                {t("profile.modal.button")}
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog";
import { Input } from "@evmosapps/ui/components/inputs/Input";
import { Label } from "@evmosapps/ui/components/labels/Label";
import { Button } from "@evmosapps/ui/button/index";
import { cn, modalLink, useModal } from "helpers";
import purple from "../../../../public/purple.png";
import orange from "../../../../public/orange.png";
import Image from "next/image";
import { useEdit } from "./useEdit";
import { useTranslation } from "@evmosapps/i18n/client";
export const useConsentModal = () => useModal("edit");
export const ConsentModalTrigger = modalLink("edit");

const profileImages = [purple, orange];

export const EditModal = () => {
  const { isOpen, setIsOpen, modalProps } = useConsentModal();
  const {
    profileImg,
    setProfileImg,
    profileName,
    setProfileName,
    setProfileImgDb,
    setProfileNameDb,
  } = useEdit();
  const { t } = useTranslation("dappStore");

  const handleOnClick = () => {
    setProfileImgDb(profileImg);
    setProfileNameDb(profileName);
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
                    key={index}
                    src={img}
                    width={50}
                    height={50}
                    alt={img.src}
                    className={cn("rounded-full cursor-pointer", {
                      "ring-1 ring-tertiary-container dark:ring-tertiary-container-dark":
                        profileImg === index,
                    })}
                    onClick={() => {
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

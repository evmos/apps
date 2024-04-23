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
import { useTranslation } from "@evmosapps/i18n/client";
import { useState } from "react";
import { ProfileContext, useProfileContext } from "./useEdit";

export const useEditModal = () => useModal("edit");
export const profileImages = [purple, orange];

export const EditModal = () => {
  const { isOpen, setIsOpen, modalProps } = useEditModal();

  const { name, handleSetName, img, handleSetImg } =
    useProfileContext() as ProfileContext;
  const [localName, setLocalName] = useState(name);
  const [localImg, setLocalImg] = useState(img);
  const { t } = useTranslation("dappStore");

  const handleOnClick = () => {
    handleSetImg(localImg);
    handleSetName(localName);
    setIsOpen(false);
    // TODO Mili: add notification when changes are saved.
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
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
                  // TODO Mili: add blur ?
                  <Image
                    key={index}
                    src={img.src}
                    width={80}
                    height={80}
                    alt={img.src}
                    className={cn(
                      "rounded-full cursor-pointer transition-all duration-150 ease-out hover:scale-105 overflow-hidden",
                      {
                        "ring-1 ring-tertiary-container dark:ring-tertiary-container-dark ":
                          localImg === index,
                      },
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setLocalImg(index);
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
                value={name}
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

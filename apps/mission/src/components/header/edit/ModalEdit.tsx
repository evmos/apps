// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { Input } from "@evmosapps/ui/components/inputs/Input.tsx";
import { Label } from "@evmosapps/ui/components/labels/Label.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { cn, useModal } from "helpers";
import purple from "../../../../public/purple.png";
import orange from "../../../../public/orange.png";
import Image from "next/image";
import { useTranslation } from "@evmosapps/i18n/client";
import { useState } from "react";
import { useProfileContext } from "./useEdit";
import { useWallet } from "@evmosapps/evmos-wallet";
import { sendEvent, SAVE_PROFILE_CHANGES, EDIT_PROFILE } from "tracker";
import { alertsManager } from "@evmosapps/ui/components/alert/alert-manager.tsx";
export const useEditModal = () => useModal("edit");
export const profileImages = [purple, orange];

export const EditModal = () => {
  const { isOpen, setIsOpen, modalProps } = useEditModal();
  const { setIsDropdownOpen, address } = useWallet();

  const { profile, updateProfile } = useProfileContext();
  const [localName, setLocalName] = useState(profile?.name);
  const [localImg, setLocalImg] = useState(profile?.img);
  const { t } = useTranslation("dappStore");

  const handleOnClick = () => {
    updateProfile({ name: localName, img: localImg });
    setIsOpen(false);
    sendEvent(SAVE_PROFILE_CHANGES);
    alertsManager.success({
      title: "Changes are saved!",
    });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalName(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setIsOpen(false);
        setIsDropdownOpen(true);
      }}
    >
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
                    blurDataURL={img.blurDataURL}
                    width={80}
                    height={80}
                    alt={img.src}
                    className={cn(
                      "rounded-full cursor-pointer transition-all duration-150 ease-out hover:scale-105 overflow-hidden",
                      {
                        "ring-1 ring-tertiary-container dark:ring-tertiary-container-dark ":
                          localImg?.src === img.src,
                      },
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setLocalImg(img);
                      sendEvent(EDIT_PROFILE, {
                        "Profile Details": "Picture",
                      });
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Label>{t("profile.modal.label")}</Label>
              <Input
                onClick={() =>
                  sendEvent(EDIT_PROFILE, { "Profile Details": "Display Name" })
                }
                fullWidth
                placeholder={t("profile.modal.placeholder")}
                value={
                  profile && profile?.name === "" ? address : profile?.name
                }
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

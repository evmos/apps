// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { cn, useModal } from "helpers";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";

import { useTranslation } from "@evmosapps/i18n/client";
import { useProfileContext } from "../edit/useEdit";
import { profileImages } from "../edit/ModalEdit";
import Image from "next/image";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { Chip } from "@evmosapps/ui/chips/Chip.tsx";

import { Button } from "@evmosapps/ui/button/index.tsx";
import { useAccount } from "wagmi";

export const useManageProfileModal = () => useModal("manage-profile");

const dummyAddress = "0xE54Cd6c3022135d09122ee3f5E05b9b66bed9200";

export const ManageProfileModal = () => {
  const { isOpen, setIsOpen } = useManageProfileModal();
  const { address } = useAccount();
  const { t } = useTranslation("dappStore");
  const { profile } = useProfileContext();
  const image = profileImages.find((image) => image.src === profile.img?.src);
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Modal.Body>
        <div className="space-y-5">
          <Modal.Header>{t("manageProfile.title")}</Modal.Header>
          <p className="text-subheading dark:text-subheading-dark text-base">
            {t("manageProfile.description")}
          </p>
          <Modal.Separator />
          <div className="flex justify-between items-center border border-success dark:border-success-dark rounded-xl px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="text-base bg-success/5 dark:bg-success-dark/5 w-10 h-10 text-success dark:text-success-dark flex items-center justify-center rounded-full">
                {image && (
                  <Image
                    src={image.src}
                    blurDataURL={image.blurDataURL}
                    width={40}
                    height={40}
                    alt={image.src}
                    className={cn("rounded-full")}
                  />
                )}
              </div>
              <div>
                <div className="text-base text-heading dark:text-heading-dark">
                  <AddressDisplay address={address} />
                </div>
                <div className="text-base text-subheading dark:text-subheading-dark">
                  {t("manageProfile.options.profile.title")}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Chip variant={"success"} disabled>
                <div className="rounded-full w-2 h-2 bg-success dark:bg-success-dark" />
                {t("manageProfile.options.profile.button")}
              </Chip>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="border-dashed border-paragraph dark:border-paragraph border p-1 rounded-full">
                <div className="bg-on-surface/10 dark:bg-on-surface-dark/10 rounded-full w-10 h-10"></div>
              </div>
              <div>
                <div className="text-base text-heading dark:text-heading-dark">
                  <AddressDisplay address={dummyAddress} />
                </div>
                <div className="text-base text-subheading dark:text-subheading-dark">
                  {t("manageProfile.options.wallet.title")}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  // TODO: add logic for sign in with wallet 1
                }}
              >
                Sign in
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

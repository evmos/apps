// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { cn, useModal } from "helpers";

import { Modal } from "@evmosapps/ui/components/dialog/Dialog.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "@evmosapps/i18n/client";
import { useProfileContext } from "../edit/useEdit";
import { profileImages } from "../edit/ModalEdit";
import Image from "next/image";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { Chip } from "@evmosapps/ui/chips/Chip.tsx";

import { Button } from "@evmosapps/ui/button/index.tsx";
import { useAccount } from "wagmi";
import { useState } from "react";
import { Spinner } from "@evmosapps/ui/components/spinners/Spinner.tsx";
import { useUserSession } from "@evmosapps/user/auth/use-user-session.ts";
import { signInWithEthereum } from "../../useSignInWithEthereum";
import { useWallet } from "@evmosapps/evmos-wallet";

export const useManageProfileModal = () => useModal("manage-profile");

export const ManageProfileModal = () => {
  const { isOpen, setIsOpen } = useManageProfileModal();
  const { address } = useAccount();
  const { t } = useTranslation("dappStore");
  const { profile } = useProfileContext();
  const image = profileImages.find((image) => image.src === profile.img?.src);
  const { data: session } = useUserSession();
  // manage appearence of loader
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { setIsDropdownOpen } = useWallet();

  const { mutate: changeProfile, isPending } = useMutation({
    mutationFn: async () => {
      // TODO:  add event for creating new profile
      setLoading(true);
      await signInWithEthereum();
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsOpen(false);
      setIsDropdownOpen(true);
      setLoading(false);
    },

    onError: () => {
      setLoading(false);
    },
  });

  const profileAddress = session?.user?.walletAccount[0]?.address;
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
                  <AddressDisplay address={profileAddress} />
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
                  <AddressDisplay address={address} />
                </div>
                <div className="text-base text-subheading dark:text-subheading-dark">
                  {t("manageProfile.options.wallet.title")}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              {loading ? (
                <Spinner className="w-8 h-8" />
              ) : (
                <Button
                  size="sm"
                  disabled={isPending || address === profileAddress}
                  onClick={() => {
                    changeProfile();
                  }}
                >
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

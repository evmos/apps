// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { IconChevronDown } from "@evmosapps/ui/icons/line/arrows/chevron-down.tsx";
import Image from "next/image";
import { profileImages } from "../edit/ModalEdit";
import { cn } from "helpers";
import { ProfileContext, useProfileContext } from "../edit/useEdit";
import { useAccount } from "wagmi";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import { Pulse } from "@evmosapps/ui/components/pulse/Pulse.tsx";
import { useTranslation } from "@evmosapps/i18n/client";
export const SignInButton = ({ open }: { open: boolean }) => {
  const { t } = useTranslation("dappStore");
  return (
    <Button as="div" className="relative" outlined={open}>
      {!open && <Pulse />}
      {t("signIn.button")}
    </Button>
  );
};

export const ProfileButton = ({ open }: { open: boolean }) => {
  const { name: profileName, img } = useProfileContext() as ProfileContext;

  const { address } = useAccount();

  return (
    <div
      className="text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
      data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
    >
      <div className="flex items-center justify-center space-x-3">
        {
          <Image
            src={profileImages[img]?.src ?? ""}
            width={24}
            height={24}
            alt={profileImages[img]?.src ?? ""}
            className={cn("rounded-full cursor-pointer")}
          />
        }
        {profileName === "" ? (
          <AddressDisplay address={address} />
        ) : (
          <span>{profileName}</span>
        )}
      </div>
      <IconChevronDown
        className={`w-5 text-paragraph dark:text-paragraph-dark transition-all duration-300 ${
          open && "rotate-180"
        }`}
      />
    </div>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Button } from "../../../../../../packages/ui/src/button/index";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { IconChevronDown } from "@evmosapps/ui/icons/line/arrows/chevron-down.tsx";
import Image from "next/image";
import { profileImages } from "../edit/ModalEdit";
import { cn } from "helpers";
import { ProfileContext, useProfileContext } from "../edit/useEdit";
import { useAccount } from "wagmi";
import { AddressDisplay } from "@evmosapps/ui-helpers";

export const SignInButton = ({ open }: { open: boolean }) => {
  return (
    <Button as="div" className="relative" outlined={open}>
      {!open && (
        <div
          className=" before:content-[''] before:absolute before:top-1.5 before:right-0 
before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:lg:w-[12px] before:lg:h-[12px] before:animate-pulse before:bg-primary before:dark:bg-primary-dark before:rounded-full"
        />
      )}
      Sign in
    </Button>
  );
};

export const ProfileButton = () => {
  const { name: profileName, img } = useProfileContext() as ProfileContext;

  const { address } = useAccount();

  return (
    <div
      className="text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 md:px-8 py-2 font-bold"
      data-testid={`wallet-profile-button wallet-profile-button-${getActiveProviderKey()}`}
    >
      <div className="flex items-center justify-center space-x-3">
        <Image
          src={profileImages[img].src}
          width={24}
          height={24}
          alt={profileImages[img].src}
          className={cn("rounded-full cursor-pointer")}
        />

        {profileName === "" ? (
          <AddressDisplay address={address} />
        ) : (
          <span>{profileName}</span>
        )}
      </div>
      <IconChevronDown className="w-5 text-paragraph dark:text-paragraph-dark" />
    </div>
  );
};

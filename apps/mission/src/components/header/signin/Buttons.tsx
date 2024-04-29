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
import useWindowResize from "../../useResize";
import { useWallet } from "@evmosapps/evmos-wallet";
export const SignInButton = () => {
  const { isOpen } = useWallet();
  const { t } = useTranslation("dappStore");
  return (
    <Button as="div" className="relative" outlined={isOpen}>
      {!isOpen && <Pulse />}
      {t("signIn.button")}
    </Button>
  );
};

export const ProfileButton = () => {
  const { name: profileName, img } = useProfileContext() as ProfileContext;
  const { isDesktop } = useWindowResize();
  const { address } = useAccount();
  const { isOpen } = useWallet();

  return (
    <div
      className={`text-heading dark:text-heading-dark  flex items-center justify-center space-x-3 rounded-full  font-bold 
      ${
        isDesktop
          ? "bg-surface-container-lowest dark:bg-surface-container-lowest-dark px-4 md:px-8 py-2"
          : "border border-surface-container-high dark:border-surface-container-high-dark rounded-full p-[3px]"
      }`}
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
        {isDesktop &&
          (profileName === "" ? (
            <AddressDisplay address={address} />
          ) : (
            <span>{profileName}</span>
          ))}
      </div>
      {isDesktop && (
        <IconChevronDown
          className={`w-5 text-paragraph dark:text-paragraph-dark transition-all duration-300 ${
            isOpen && "rotate-180"
          }`}
        />
      )}
    </div>
  );
};

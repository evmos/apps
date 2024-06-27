// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { getActiveProviderKey } from "@evmosapps/evmos-wallet";
import { IconChevronDown } from "@evmosapps/ui/icons/line/arrows/chevron-down.tsx";
import Image from "next/image";
import { profileImages } from "../edit/ModalEdit";
import { cn } from "helpers";
import { useProfileContext } from "../edit/useEdit";
import { AddressDisplay } from "@evmosapps/ui-helpers";
import useWindowResize from "../../useResize";
import { useWallet } from "@evmosapps/evmos-wallet";
import { isValidHexAddress } from "helpers/src/crypto/addresses/is-valid-hex-address";

export const ProfileButton = () => {
  const { profile } = useProfileContext();
  const { isDesktop } = useWindowResize();
  const { isDropdownOpen } = useWallet();
  const getImg = profileImages.find((image) => image.src === profile.img?.src);
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
        {getImg && (
          <Image
            blurDataURL={getImg.blurDataURL}
            src={getImg.src}
            width={24}
            height={24}
            alt={getImg.src}
            className={cn("rounded-full cursor-pointer")}
          />
        )}
        {isDesktop &&
          (isValidHexAddress(profile.name) ? (
            <AddressDisplay address={profile.name} />
          ) : (
            <span>{profile.name}</span>
          ))}
      </div>
      {isDesktop && (
        <IconChevronDown
          className={`w-5 text-paragraph dark:text-paragraph-dark transition-all duration-300 ${
            isDropdownOpen && "rotate-180"
          }`}
        />
      )}
    </div>
  );
};

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
import { useUserProfile } from "@evmosapps/user/auth/use-user-session.ts";
import { useTranslation } from "@evmosapps/i18n/client/instrumentation";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { Button } from "@evmosapps/ui/button/index.tsx";
import { sendEvent } from "tracker/src/useTracker";
import { CLICK_CONNECT_WALLET_BUTTON } from "tracker/src/events";
import { Pulse } from "@evmosapps/ui/components/pulse/Pulse.tsx";

export const ProfileButton = () => {
  const { profile } = useProfileContext();
  const { data: user } = useUserProfile();
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
          (!user?.displayName ? (
            <AddressDisplay address={user?.defaultWalletAccount.address} />
          ) : (
            <span>{user.displayName}</span>
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

export const ProfileToggleButton = () => {
  const {
    setIsDropdownOpen,
    isDropdownOpen,
    setDropdownState,
  } = useWallet();
  const { data: user } = useUserProfile();
  const { t } = useTranslation("dappStore");
  return (
    <Dropdown.Button
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
        if (user) setDropdownState("profile");
        else setDropdownState("wallets");
      }}
    >
      {user && <ProfileButton />}
      {!user && (
        <Button
          outlined={isDropdownOpen}
          onClick={() => {
            if (!isDropdownOpen) {
              sendEvent(CLICK_CONNECT_WALLET_BUTTON);
            }
          }}
        >
          {!isDropdownOpen && <Pulse />}
          {t("signIn.button")}
        </Button>
      )}
    </Dropdown.Button>
  );
};

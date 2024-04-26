// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { ProfileButton, SignInButton } from "./Buttons";
import { SignInTitle, WalletsTitle } from "./Titles";
import { Wallets } from "./Wallets";
import { SignInOptions } from "./Options";
import { useSignIn } from "./useSignIn";
import { useEffect, useRef, useState } from "react";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { Settings } from "./Settings";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useEditModal } from "../edit/ModalEdit";
import { useOtherWalletsModal } from "./WalletsModal";

export const StepsSignIn = () => {
  const { defaultWallets } = useSignIn();
  const { isOpen: editModalOpen } = useEditModal();
  const { isOpen: otherWallets } = useOtherWalletsModal();
  const [dropdownStatus, setDropdownStatus] = useState("profile");

  const {
    connector,
    address,
    isHydrating,
    isReconnecting,
    isDisconnected,
    isConnecting,
    setIsOpen,
    isOpen,
  } = useWallet();

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !editModalOpen &&
      !otherWallets
    ) {
      setIsOpen(!isOpen);
      setDropdownStatus("profile");
    }
  };
  const closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === "Escape" && !editModalOpen && !otherWallets) {
      setIsOpen(!isOpen);
      setDropdownStatus("profile");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isOpen);
    document.addEventListener("keydown", closeOnEscapePressed, !isOpen);
    return () => {
      document.removeEventListener("click", handleClickOutside, !isOpen);
      document.removeEventListener("keydown", closeOnEscapePressed, !isOpen);
    };
  });

  useEffect(() => {
    const status = localStorage.getItem("redirect-wallet");
    if (status === "true") {
      setIsOpen(true);
      localStorage.removeItem("redirect-wallet");
    }
  }, [setIsOpen]);

  const drawButton = () => {
    if (isDisconnected || isConnecting) {
      return <SignInButton open={isOpen} />;
    }
    if (address && connector) {
      return <ProfileButton open={isOpen} />;
    }
  };

  const drawContent = () => {
    if (
      isDisconnected ||
      isConnecting ||
      (address && connector && dropdownStatus === "wallets")
    ) {
      return (
        <>
          {dropdownStatus === "wallets" ? (
            <WalletsTitle setDropdownStatus={setDropdownStatus} />
          ) : (
            <SignInTitle />
          )}
          <div className="rounded-xl bg-surface-container dark:bg-surface-container-dark mt-5 ">
            <Wallets wallets={defaultWallets} />
          </div>
          <SignInOptions />
        </>
      );
    }
    if (address && connector && dropdownStatus === "settings") {
      return <Settings setDropdownStatus={setDropdownStatus} />;
    }

    if (address && connector && dropdownStatus === "profile") {
      return <Profile setDropdownStatus={setDropdownStatus} />;
    }
  };

  if (isHydrating || isReconnecting) {
    return (
      <div className="animate-pulse text-pearl bg-darGray800 flex items-center justify-center space-x-3 rounded-full px-4 py-[9px] w-24 font-bold h-full">
        &nbsp;
      </div>
    );
  }

  return (
    <div className="relative text-right">
      <Dropdown.Menu>
        <>
          <Dropdown.Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault();
              setIsOpen(!isOpen);
              setDropdownStatus("profile");
            }}
          >
            {drawButton()}
          </Dropdown.Button>
          {isOpen && (
            <Dropdown.Items ref={ref} static>
              {drawContent()}
            </Dropdown.Items>
          )}
        </>
      </Dropdown.Menu>
    </div>
  );
};

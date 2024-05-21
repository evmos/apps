// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ProfileButton } from "./ProfileButton";
import { Wallets } from "./Wallets";

import { useSignIn } from "./useSignIn";
import { useRef } from "react";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { Settings } from "./Settings";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useDropdownState } from "./useDropdownState";
import {
  SignInButton,
  SignInTitle,
  SignInOptions,
  WalletsTitle,
} from "./signInParts";
export const StepsSignIn = () => {
  const { defaultWallets } = useSignIn();

  const {
    connector,
    address,
    isHydrating,
    isReconnecting,
    isDisconnected,
    isConnecting,
    setIsDropdownOpen,
    isDropdownOpen,
    setDropdownState,
    dropdownState,
  } = useWallet();

  const ref = useRef<HTMLDivElement>(null);

  useDropdownState(ref);

  const drawButton = () => {
    if (isDisconnected || isConnecting) {
      return <SignInButton />;
    }
    if (address && connector) {
      return <ProfileButton />;
    }
  };

  const drawContent = () => {
    if (
      isDisconnected ||
      isConnecting ||
      (address && connector && dropdownState === "wallets")
    ) {
      return (
        <>
          {dropdownState === "wallets" ? <WalletsTitle /> : <SignInTitle />}
          <Dropdown.Container>
            <Wallets wallets={defaultWallets} />
          </Dropdown.Container>
          <SignInOptions />
        </>
      );
    }
    if (address && connector && dropdownState === "settings") {
      return <Settings />;
    }

    if (address && connector && dropdownState === "profile") {
      return <Profile />;
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
              setIsDropdownOpen(!isDropdownOpen);
              setDropdownState("profile");
            }}
          >
            {drawButton()}
          </Dropdown.Button>
          {isDropdownOpen && (
            <Dropdown.Items className="w-80" ref={ref} static>
              {drawContent()}
            </Dropdown.Items>
          )}
        </>
      </Dropdown.Menu>
    </div>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { ProfileToggleButton } from "./ProfileButton";
import { Wallets } from "./Wallets";
import { useEffect, useRef } from "react";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { Settings } from "./Settings";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { useDropdownState } from "./useDropdownState";
import { SignInTitle, SignInOptions, WalletsTitle } from "./signInParts";
import { useUserSession } from "@evmosapps/user/auth/use-user-session.ts";

const DrawContent = () => {
  const { dropdownState } = useWallet();
  const { data: session } = useUserSession();
  if (dropdownState === "wallets") {
    return (
      <>
        {session ? <WalletsTitle /> : <SignInTitle />}
        <Dropdown.Container>
          <Wallets />
        </Dropdown.Container>
        <SignInOptions />
      </>
    );
  }
  if (dropdownState === "settings") {
    return <Settings />;
  }

  return <Profile />;
};

export const StepsSignIn = () => {
  const {
    isHydrating,
    isReconnecting,
    isDropdownOpen,
    setDropdownState,
  } = useWallet();
  const { data: session } = useUserSession();
  useEffect(() => {
    if (session) setDropdownState("profile");
    else setDropdownState("wallets");
  }, [session, setDropdownState]);
  const ref = useRef<HTMLDivElement>(null);

  useDropdownState(ref);

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
          <ProfileToggleButton />
          {isDropdownOpen && (
            <Dropdown.Items className="w-80" ref={ref} static>
              <DrawContent />
            </Dropdown.Items>
          )}
        </>
      </Dropdown.Menu>
    </div>
  );
};

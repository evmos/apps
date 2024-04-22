// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { ProfileButton, SignInButton } from "./Buttons";
import { SignInTitle, WalletsTitle } from "./Titles";
import { Wallets } from "./Wallets";
import { SignInOptions } from "./Options";
import { useSignIn } from "./useSignin";
import { useEffect, useState } from "react";
import { useWallet } from "@evmosapps/evmos-wallet";
import { Profile } from "./Profile";
import { Settings } from "./Settings";
import { Dropdown } from "../../../../../../packages/ui/src/components/dropdown/Dropdown";
import useComponentVisible from "./useComponentVisible";

export const StepsSignIn = () => {
  const { defaultWallets } = useSignIn();

  const [dropdownStatus, setDropdownStatus] = useState("profile");

  const {
    connector,
    address,
    isHydrating,
    isReconnecting,
    isDisconnected,
    isConnecting,
  } = useWallet();

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible();

  useEffect(() => {
    const status = localStorage.getItem("redirect-wallet");
    if (status === "true") {
      setIsComponentVisible(true);
      localStorage.removeItem("redirect-wallet");
    }
  }, [setIsComponentVisible]);

  const drawButton = () => {
    if (isDisconnected || isConnecting) {
      return <SignInButton open={isComponentVisible} />;
    }
    if (address && connector) {
      return <ProfileButton />;
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
          <SignInOptions close={() => setIsComponentVisible(false)} />
        </>
      );
    }
    if (address && connector && dropdownStatus === "settings") {
      return <Settings setDropdownStatus={setDropdownStatus} />;
    }

    if (address && connector && dropdownStatus === "profile") {
      return (
        <Profile
          setDropdownStatus={setDropdownStatus}
          setIsOpen={setIsComponentVisible}
          connector={connector}
        />
      );
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
    <Dropdown isOpen={isComponentVisible} setIsOpen={setIsComponentVisible}>
      <>
        <Dropdown.Button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            setIsComponentVisible(!isComponentVisible);
          }}
        >
          {drawButton()}
        </Dropdown.Button>
        {isComponentVisible && (
          <Dropdown.Items ref={ref} static>
            {drawContent()}
          </Dropdown.Items>
        )}
      </>
    </Dropdown>
  );
};

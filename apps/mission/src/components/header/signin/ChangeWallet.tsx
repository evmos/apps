"use client";

import { Wallets } from "./Wallets";
import { useSignIn } from "./useSignin";
import { Dispatch, SetStateAction } from "react";
import { WalletsTitle } from "./Titles";
import { SignInOptions } from "./Options";

export const ChangeWallet = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  const { defaultWallets } = useSignIn();
  return (
    <>
      <WalletsTitle setDropdownStatus={setDropdownStatus} />

      <Wallets wallets={defaultWallets} />
      <SignInOptions />
    </>
  );
};

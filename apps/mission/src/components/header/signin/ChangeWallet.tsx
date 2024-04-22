// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Wallets } from "./Wallets";
import { useSignIn } from "./useSignIn";
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

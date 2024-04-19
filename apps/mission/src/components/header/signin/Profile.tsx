// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Dispatch, SetStateAction } from "react";
import { Connector } from "wagmi";

import { ProfileTitle } from "./Titles";
import { ProfileOptions, ProfileSettings } from "./Options";

export const Profile = ({
  connector,
  setIsOpen,
  setDropdownStatus,
}: {
  connector: Connector;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <ProfileTitle
        connector={connector}
        setDropdownStatus={setDropdownStatus}
      />

      <ProfileOptions setIsOpen={setIsOpen} />
      <ProfileSettings
        setDropdownStatus={setDropdownStatus}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

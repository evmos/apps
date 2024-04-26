// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { Dispatch, SetStateAction } from "react";

import { ProfileTitle } from "./Titles";
import { ProfileOptions, ProfileSettings } from "./Options";

export const Profile = ({
  setDropdownStatus,
}: {
  setDropdownStatus: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <ProfileTitle setDropdownStatus={setDropdownStatus} />

      <ProfileOptions />
      <ProfileSettings setDropdownStatus={setDropdownStatus} />
    </>
  );
};

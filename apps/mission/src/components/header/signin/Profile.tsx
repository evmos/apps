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

      <ProfileOptions />
      <ProfileSettings
        setDropdownStatus={setDropdownStatus}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

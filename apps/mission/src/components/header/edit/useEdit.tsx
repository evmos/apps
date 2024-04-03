// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";

export const PROFILE_IMAGE_KEY = "profileImage";
export const DISPLAY_NAME_KEY = "displayName";

export const useEdit = () => {
  const getProfileImage = () => {
    const storedImg =
      typeof window === "undefined"
        ? undefined
        : window.localStorage.getItem(PROFILE_IMAGE_KEY);

    if (!storedImg) {
      return 0;
    }
    return JSON.parse(storedImg) as number;
  };

  const [profileImg, setProfileImg] = useState(getProfileImage());

  const getProfileName = () => {
    const storedName =
      typeof window === "undefined"
        ? undefined
        : window.localStorage.getItem(DISPLAY_NAME_KEY);

    if (!storedName) {
      return "";
    }
    return JSON.parse(storedName) as string;
  };

  const [profileName, setProfileName] = useState(getProfileName());

  const setProfileImgDb = (profileImg: number) => {
    window.localStorage.setItem(PROFILE_IMAGE_KEY, JSON.stringify(profileImg));
  };

  const setProfileNameDb = (profileName: string) => {
    window.localStorage.setItem(DISPLAY_NAME_KEY, JSON.stringify(profileName));
  };

  return {
    profileImg,
    setProfileImg,
    profileName,
    setProfileName,
    setProfileImgDb,
    setProfileNameDb,
  };
};

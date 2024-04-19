// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { createContext, useCallback, useContext, useState } from "react";

export const DISPLAY_NAME_KEY = "displayName";
export const PROFILE_IMAGE_KEY = "profileImage";

export type ProfileContext = {
  name: string;
  handleSetName: (name: string) => void;
  img: number;
  handleSetImg: (img: number) => void;
};

const ProfileContext = createContext<ProfileContext | null>(null);

const setProfileNameDb = (profileName: string) => {
  localStorage.setItem(DISPLAY_NAME_KEY, JSON.stringify(profileName));
};

const setProfileImgDb = (profileImg: number) => {
  localStorage.setItem(PROFILE_IMAGE_KEY, JSON.stringify(profileImg));
};

export function ProfileWrapper({ children }: { children: JSX.Element }) {
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
  const [profileImg, setProfileImg] = useState(getProfileImage());

  const handleSetValue = useCallback((name: string) => {
    setProfileName(name);
    setProfileNameDb(name);
  }, []);

  const handleSetImage = useCallback((img: number) => {
    setProfileImg(img);
    setProfileImgDb(img);
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        name: profileName,
        handleSetName: handleSetValue,
        img: profileImg,
        handleSetImg: handleSetImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
export function useProfileContext() {
  return useContext(ProfileContext);
}

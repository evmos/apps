// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { useEffectEvent } from "helpers";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { profileImages } from "./ModalEdit";
import { StaticImageData } from "next/image";
export const PROFILE_KEY = "userProfile";

export const DEFAULT_PROFILE = {
  name: "",
  img: {
    src: "",
    height: 0,
    width: 0,
  },
};

type Profile = {
  name: string;
  img: StaticImageData | undefined;
};
export type ProfileContext = {
  profile: Profile;
  updateProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContext | null>(null);

const readProfile = (address: string) => {
  if (typeof window === "undefined") {
    return DEFAULT_PROFILE;
  }
  const values = window.localStorage.getItem(`${PROFILE_KEY}.${address}`);
  return values
    ? (JSON.parse(values) as Profile)
    : { name: address, img: profileImages[0] };
};

const writeProfile = (address: string, profile: Profile) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      `${PROFILE_KEY}.${address}`,
      JSON.stringify(profile),
    );
  }
};

export function ProfileProvider({ children }: { children: JSX.Element }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      return;
    }
    setProfile(readProfile(address));
  }, [address]);

  useEffect(() => {
    if (!address || !profile) {
      return;
    }
    writeProfile(address, profile);
  }, [address, profile]);

  const updateProfile = useEffectEvent((profile: Profile) => {
    setProfile({ name: profile?.name, img: profile.img });
  });

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error(
      "`ProfileContext` can only be used inside `ProfileProvider`",
    );
  return context;
}

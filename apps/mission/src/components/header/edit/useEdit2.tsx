import { createContext, useState, useContext } from "react";
import { useAccount } from "wagmi";
export const DISPLAY_NAME_KEY = "displayName";

const ProfileContext = createContext({
  profileName: "",
  setProfileName: (name: string) => {},
});

// TODO Mili: test this provider to reflect changes on name.
export const ProfileProvider = ({ children }) => {
  const { address } = useAccount();
  const getProfileName = () => {
    const storedName =
      typeof window === "undefined"
        ? undefined
        : window.localStorage.getItem(DISPLAY_NAME_KEY);

    if (!storedName) {
      //   setProfileName(address);
      address && setProfileNameDb(address);
      return address || "";
    }

    return JSON.parse(storedName) as string;
  };

  const [profileName, setProfileName] = useState(getProfileName());

  const setProfileNameDb = (profileName: string) => {
    window.localStorage.setItem(DISPLAY_NAME_KEY, JSON.stringify(profileName));
  };

  const updateProfileName = (newName: string) => {
    setProfileName(newName);
    setProfileNameDb(newName); // Update local storage here
  };

  return (
    <ProfileContext.Provider
      value={{ profileName, setProfileName: updateProfileName }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

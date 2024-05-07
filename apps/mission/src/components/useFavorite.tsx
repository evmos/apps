// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { createContext, useContext, useState } from "react";

const FAVORITES_KEY = "favorites_list";

export interface FavoritesContext {
  favorites: string[];
  setFavorites: (newFavorites: string) => void;
}

export const FavoritesContext = createContext<FavoritesContext | null>(null);

// Create the provider component
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setFavoritesDb = (favorites: string[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  };

  const getFavoritesDb = () => {
    if (typeof window === "undefined") {
      return [];
    }
    const values = window.localStorage.getItem(FAVORITES_KEY);
    return values ? (JSON.parse(values) as string[]) : [];
  };

  const [favorites, setFavorites] = useState<string[]>(getFavoritesDb());

  const updateFavorites = (favorites: string) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.includes(favorites)) {
        const newFavorites = [favorites, ...prevFavorites];
        setFavoritesDb(newFavorites);
        return newFavorites;
      }
      return prevFavorites;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites: updateFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}


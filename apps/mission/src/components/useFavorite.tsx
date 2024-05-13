// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { createContext, useContext, useState } from "react";

const FAVORITES_KEY = "favorites_list";

export interface FavoriteItem {
  name: string;
  blurDataURL: string;
  iconSrc: string;
  categorySlug: string;
  slug: string;
  instantDapp: boolean;
}

export interface FavoritesContext {
  favorites: FavoriteItem[];
  setFavorites: (newFavorites: FavoriteItem) => void;
}

export const FavoritesContext = createContext<FavoritesContext | null>(null);

// Create the provider component
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setFavoritesDb = (favorites: FavoriteItem[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  };

  const getFavoritesDb = () => {
    if (typeof window === "undefined") {
      return [];
    }
    const values = window.localStorage.getItem(FAVORITES_KEY);
    return values ? (JSON.parse(values) as FavoriteItem[]) : [];
  };

  const [favorites, setFavorites] = useState<FavoriteItem[]>(getFavoritesDb());

  const updateFavorites = useEffectEvent((favorite: FavoriteItem) => {
    setFavorites((prevFavorites) => {
      let fav;
      if (prevFavorites.find((f) => f.name === favorite.name)) {
        const indexForWallet = prevFavorites.findIndex(
          (f) => f?.name === favorite.name,
        );
        const listWallets = prevFavorites.slice();
        listWallets.splice(indexForWallet, 1);
        fav = listWallets;
      } else {
        fav = [favorite, ...prevFavorites];
      }
      setFavoritesDb(fav);
      return fav;
    });
  });

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites: updateFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("`FavoritesContext` can only be used inside `FavoritesProvider`")
  return context;
}

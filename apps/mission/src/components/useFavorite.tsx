// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { useEffectEvent } from "helpers";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const FAVORITES_KEY = "favorites_list";

type Slug = string;
export interface FavoritesContext {
  favorites: Slug[] | null;
  addFavorite: (favorite: Slug) => void;
  removeFavorite: (slug: string) => void;
  isLoading: boolean;
}

export const FavoritesContext = createContext<FavoritesContext | null>(null);

const readFavorites = (address: string) => {
  if (typeof window === "undefined") {
    return [];
  }
  const values = window.localStorage.getItem(`${FAVORITES_KEY}.${address}`);
  return values ? (JSON.parse(values) as Slug[]) : [];
};

const writeFavorites = (address: string, favorites: Slug[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      `${FAVORITES_KEY}.${address}`,
      JSON.stringify(favorites),
    );
  }
};

// Create the provider component
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Slug[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address } = useAccount();

  useEffect(() => {
    setIsLoading(false);
    if (!address) {
      setFavorites(null);
      return;
    }
    setFavorites(readFavorites(address));
  }, [address]);

  useEffect(() => {
    if (!address || !favorites) {
      return;
    }
    writeFavorites(address, favorites);
  }, [address, favorites]);

  const addFavorite = useEffectEvent((favorite: Slug) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites) return prevFavorites;
      if (prevFavorites.includes(favorite)) {
        return prevFavorites;
      }
      return [...prevFavorites, favorite];
    });
  });

  const removeFavorite = useEffectEvent((slug: string) => {
    setFavorites((prevFavorites) => {
      return prevFavorites?.filter((favorite) => favorite !== slug) ?? null;
    });
  });
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isLoading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error(
      "`FavoritesContext` can only be used inside `FavoritesProvider`",
    );
  return context;
}

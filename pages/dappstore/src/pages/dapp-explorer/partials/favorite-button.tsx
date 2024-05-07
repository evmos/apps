"use client";
import {
  FavoritesContext,
  useFavoritesContext,
} from "../../../../../../apps/mission/src/components/useFavorite";

import { IconStar as IconStarLine } from "@evmosapps/ui/icons/line/basic/star.tsx";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";

export const FavoriteButton = (dapp) => {
  const { favorites, setFavorites } = useFavoritesContext() as FavoritesContext;
  console.log(dapp);
  return (
    <IconButton
      variant={"low-emphasis"}
      onClick={() => setFavorites(dapp.name)}
    >
      <IconStarLine />
    </IconButton>
  );
};

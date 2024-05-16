// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useFavoritesContext } from "../../../../../../apps/mission/src/components/useFavorite";

import { IconStar as IconStarLine } from "@evmosapps/ui/icons/line/basic/star.tsx";
import { IconStar as IconStarFilled } from "@evmosapps/ui/icons/filled/basic/star.tsx";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";

export const FavoriteButton = ({
  dapp,
}: {
  dapp: {
    icon: {
      blurDataURL: string;
      src: string;
    };
    name: string;
    categorySlug: string;
    slug: string;
    instantDapp: boolean;
  };
}) => {
  const { favorites, setFavorites } = useFavoritesContext();

  const isFavorite = favorites.some((fav) => fav.name === dapp.name);

  const { isDisconnected } = useWallet();
  const handleFavoriteClick = () => {
    setFavorites({
      name: dapp.name,
      iconSrc: dapp.icon.src,
      blurDataURL: dapp.icon.blurDataURL,
      categorySlug: dapp.categorySlug,
      slug: dapp.slug,
      instantDapp: dapp.instantDapp,
    });
  };

  return (
    <IconButton
      className={`${isFavorite && "!bg-[#491F07] border-0"}`}
      variant={"low-emphasis"}
      onClick={handleFavoriteClick}
      outlined
      disabled={isDisconnected}
    >
      {isFavorite ? (
        <IconStarFilled className="text-primary-dark" />
      ) : (
        <IconStarLine />
      )}
    </IconButton>
  );
};

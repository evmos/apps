// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useFavoritesContext } from "../../../../../../apps/mission/src/components/useFavorite";

import { IconStar as IconStarLine } from "@evmosapps/ui/icons/line/basic/star.tsx";
import { IconStar as IconStarFilled } from "@evmosapps/ui/icons/filled/basic/star.tsx";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { useWallet } from "@evmosapps/evmos-wallet";

import { CLICK_FAVORITE, UNCLICK_FAVORITE, sendEvent } from "tracker";

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
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  const isFavorite = favorites?.some((fav) => fav === dapp.slug);

  const { isDisconnected } = useWallet();
  const handleFavoriteClick = () => {
    if (isFavorite) {
      sendEvent(UNCLICK_FAVORITE, {
        "dApp Type": dapp.instantDapp ? "Instant" : "Non - Instant",
        "dApp Name": dapp.name,
      });
      removeFavorite(dapp.slug);
      return;
    }

    sendEvent(CLICK_FAVORITE, {
      "dApp Type": dapp.instantDapp ? "Instant" : "Non - Instant",
      "dApp Name": dapp.name,
    });
    addFavorite(dapp.slug);
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

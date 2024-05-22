// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React, { useState, useEffect, Dispatch, useMemo } from "react";
import Image from "next/image";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning-stroke.tsx";
import { useFavoritesContext } from "../../src/components/useFavorite";
import Link from "next/link";
import {
  CLICK_ON_NAVIGATION,
  UNCLICK_FAVORITE_NAVBAR,
  sendEvent,
} from "tracker";
import { Trans, useTranslation } from "@evmosapps/i18n/client";
import { cn } from "helpers/src/classnames";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconCross } from "@evmosapps/ui/icons/line/basic/cross.tsx";
import { DApp } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";

export const FavoriteSection = ({
  setFavoritesIsOpen,
  favoritesIsOpen,
  dApps,
}: {
  setFavoritesIsOpen: Dispatch<React.SetStateAction<boolean>>;
  favoritesIsOpen: boolean;
  dApps: DApp[];
}) => {
  const { favorites, removeFavorite } = useFavoritesContext();
  const dAppBySlug = useMemo(
    () =>
      dApps.reduce<Record<string, DApp>>((acc, dApp) => {
        acc[dApp.slug] = dApp;
        return acc;
      }, {}),
    [dApps],
  );
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("dappStore");
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!favoritesIsOpen) {
      return;
    }
    const scrollTop = window.scrollY;

    const onScroll = () => {
      if (Math.abs(window.scrollY - scrollTop) > 50) {
        setFavoritesIsOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [setFavoritesIsOpen, favoritesIsOpen]);

  return (
    <div
      className={cn(
        "transition-all duration-200",
        {
          "invisible -translate-y-4 opacity-0": !favoritesIsOpen,
          "visible opacity-100": favoritesIsOpen,
        },
        "md:block md:visible md:opacity-100 md:translate-0 top-full md:top-0 min-h-60 md:min-none",
        "absolute bg-surface-container-lowest dark:bg-surface-container-lowest-dark w-full",
        "md:static md:bg-transparent md:dark:bg-transparent md:min-h-none",
      )}
    >
      <div className="mt-6 px-4 hidden md:block mb-4">
        <hr className="text-surface-container dark:text-surface-container-dark"></hr>
        <h2 className="text-xs mt-4">{t("favorites.title")}</h2>
      </div>
      {loading && (
        <div className="mt-6 px-4">
          <div className="animate-pulse w-full h-5 inline-flex align-bottom bg-white/20 rounded-full my-3"></div>
          <div className="animate-pulse w-full h-5 inline-flex align-bottom bg-white/10 rounded-full my-3"></div>
          <div className="animate-pulse w-full h-5 inline-flex align-bottom bg-white/5 rounded-full my-3"></div>
        </div>
      )}
      {!loading && (
        <div className="max-h-[50vh] md:overflow-y-auto scrollbar-hidden px-8 md:px-4 flex flex-col py-2 md:py-0">
          {(!favorites || favorites?.length === 0) && (
            <div className="text-sm opacity-70 mt-5 font-medium">
              <Trans
                t={t}
                i18nKey="favorites.description"
                components={{
                  p: <p className="mt-5" />,
                }}
              />
            </div>
          )}
          {favorites?.map((slug) => {
            const favorite = dAppBySlug[slug];
            if (!favorite) {
              return null;
            }
            return (
              <Link
                className={cn(
                  `flex flex-row  grow shrink basis-0 items-center place-items-center gap-3 py-2 md:py-1`,
                  `transition-transform duration-300 ease-out  group `,
                )}
                href={`/dapps/${favorite.categorySlug}/${favorite.slug}`}
                onClick={() => {
                  sendEvent(CLICK_ON_NAVIGATION, {
                    navigation: favorite.name,
                  });
                }}
                key={favorite.slug}
              >
                <div className="flex gap-3 items-center transform-gpu transition-transform md:group-hover:scale-105 md:group-hover:translate-x-2">
                  <div className="relative w-5 h-5 aspect-square">
                    {favorite.instantDapp === true && (
                      <div className="absolute z-10 top-2.5 right-2">
                        <IconLightning className="absolute z-20 h-3.5 w-3.5 mb-0.5 text-primary-container dark:text-primary-container-dark" />
                      </div>
                    )}
                    {favorite.icon && (
                      <Image
                        {...favorite.icon}
                        fill={true}
                        className="object-cover rounded-[7px]"
                        sizes={"20px"}
                        alt={""}
                      />
                    )}
                  </div>
                  <div className="text-paragraph dark:text-paragraph-dark text-sm">
                    {favorite.name}
                  </div>
                </div>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(favorite.slug);
                    sendEvent(UNCLICK_FAVORITE_NAVBAR, {
                      "dApp Type": favorite.name,
                    });
                  }}
                  className="ml-auto md:p-0 md:invisible md:group-hover:visible md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
                  size="sm"
                  ghost
                  variant="low-emphasis"
                >
                  <IconCross className="dark:text-paragraph-dark" />
                </IconButton>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

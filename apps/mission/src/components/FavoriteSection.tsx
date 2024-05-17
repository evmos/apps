// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconLightning } from "@evmosapps/ui/icons/filled/images/lightning-stroke.tsx";
import { useFavoritesContext } from "../../src/components/useFavorite";
import Link from "next/link";
import { Suspense } from "react";
import { CLICK_ON_NAVIGATION, sendEvent } from "tracker";
import { Trans, useTranslation } from "@evmosapps/i18n/client";

export const FavoriteSection = () => {
  const { favorites } = useFavoritesContext();
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("dappStore");
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="mt-6 px-4">
      <hr className="text-surface-container dark:text-surface-container-dark "></hr>
      <h2 className="text-xs mt-4">{t("favorites.title")}</h2>
      <Suspense>
        {loading ? (
          <>
            <div className="animate-pulse w-full h-5 inline-flex align-bottom bg-white/20 rounded-full my-3"></div>
            <div className="animate-pulse w-full h-5 inline-flex align-bottom bg-white/10 rounded-full my-3"></div>
            <div className="animate-pulse w-full h-5 inline-flex align-bottom bg-white/5 rounded-full my-3"></div>
          </>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto scrollbar-hidden">
            {favorites.length === 0 && (
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
            {favorites.map((favorite) => {
              return (
                <Link
                  href={`/dapps/${favorite.categorySlug}/${favorite.slug}`}
                  key={favorite.name}
                  onClick={() => {
                    sendEvent(CLICK_ON_NAVIGATION, {
                      navigation: favorite.name,
                    });
                  }}
                >
                  <div
                    className={`flex flex-row my-6 grow shrink basis-0 justify-start place-items-center gap-3
                     transition-transform duration-300 ease-out transform-gpu hover:scale-110 hover:translate-x-4`}
                  >
                    <div className="relative w-5 h-5 aspect-square">
                      {favorite.instantDapp === true && (
                        <div className="absolute z-10 top-2.5 right-2">
                          <IconLightning className="absolute z-20 h-3.5 w-3.5 mb-0.5 text-primary-container dark:text-primary-container-dark" />
                        </div>
                      )}
                      {favorite.iconSrc && (
                        <Image
                          src={favorite.iconSrc}
                          blurDataURL={favorite.blurDataURL}
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
                </Link>
              );
            })}
          </div>
        )}
      </Suspense>
    </div>
  );
};

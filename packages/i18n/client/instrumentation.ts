// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import i18next, { type FlatNamespace, type KeyPrefix } from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  type FallbackNs,
  type UseTranslationOptions,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions, languages } from "../settings";
import { useEffectEvent } from "helpers";
import { getLocaleFromPath } from "..";

const isServer = typeof window === "undefined";

void i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      return import(`../locales/${language}/${namespace}.json`);
    })
  )
  .init({
    ...getOptions(),
    lng: undefined,

    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },

    preload: isServer ? languages : [],
  });

export function useTranslation<
  Ns extends
    | FlatNamespace
    | readonly [FlatNamespace?, ...FlatNamespace[]]
    | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(namespace?: Ns, options?: UseTranslationOptions<KPrefix>) {
  const locale = getLocaleFromPath(usePathname() ?? "") || "en";

  const ret = useTranslationOrg<Ns, KPrefix>(namespace, options);

  const { i18n } = ret;

  if (isServer && locale && i18n.resolvedLanguage !== locale) {
    void i18n.changeLanguage(locale);
  }
  const [activeLocale, setActiveLng] = useState(i18n.resolvedLanguage);

  const syncActiveLanguageState = useEffectEvent(() => {
    if (activeLocale === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  });

  useEffect(() => {
    syncActiveLanguageState();
  }, [activeLocale, i18n.resolvedLanguage, syncActiveLanguageState]);

  const synci18nActiveLanguage = useEffectEvent(() => {
    if (!locale || i18n.resolvedLanguage === locale) return;
    void i18n.changeLanguage(locale);
  });
  useEffect(() => {
    synci18nActiveLanguage();
  }, [locale, i18n, synci18nActiveLanguage]);

  return ret;
}

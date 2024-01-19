// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "../settings";
import { getLocale } from "./locale";
import { Log } from "helpers";

const initI18next = async (locale: string, namespace: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        try {
          return import(`../locales/${language}/${namespace}.json`);
        } catch (error) {
          Log().warn(`Missing translation file: ${language}/${namespace}.json`);
          return {};
        }
      })
    )
    .init(getOptions(locale, namespace));
  return i18nInstance;
};

export async function translation(
  namespace: string = "common",
  options: {
    keyPrefix?: string;
  } = {}
) {
  const locale = getLocale();
  const i18nextInstance = await initI18next(locale, namespace);
  return {
    t: i18nextInstance.getFixedT(locale, namespace, options.keyPrefix),
    i18n: i18nextInstance,
  };
}

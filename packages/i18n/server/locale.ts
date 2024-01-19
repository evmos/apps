// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { defaultLocale } from "../settings";

let LOCALE = defaultLocale;
export const setLocale = (locale: string) => {
  LOCALE = locale;
};

export const getLocale = () => {
  return LOCALE;
};

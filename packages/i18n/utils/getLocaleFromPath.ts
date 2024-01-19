// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { languages } from "@evmosapps/i18n";

export const getLocaleFromPath = (url: string | URL) => {
  const pathhname = typeof url === "string" ? url : url.pathname;

  const [locale] = pathhname.split("/").filter(Boolean);
  if (locale && languages.includes(locale)) {
    return locale;
  }
  return null;
};

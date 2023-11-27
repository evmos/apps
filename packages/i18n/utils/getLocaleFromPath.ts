import { languages } from "@evmosapps/i18n";

export const getLocaleFromPath = (url: string | URL) => {
  const pathhname = typeof url === "string" ? url : url.pathname;

  const [locale] = pathhname.split("/").filter(Boolean);
  if (locale && languages.includes(locale)) {
    return locale;
  }
  return null;
};

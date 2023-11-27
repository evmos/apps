import { defaultLocale } from "../settings";

let LOCALE = defaultLocale;
export const setLocale = (locale: string) => {
  LOCALE = locale;
};

export const getLocale = () => {
  return LOCALE;
};

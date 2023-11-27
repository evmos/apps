import { cookies, headers } from "next/headers";
import { cookieName, defaultLocale, languages } from "../settings";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);
export const readLocale = () => {
  return (
    acceptLanguage.get(
      cookies().get(cookieName)?.value || headers().get("Accept-Language")
    ) || defaultLocale
  );
};

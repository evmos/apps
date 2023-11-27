import NextLink from "next/link";
import { forwardRef } from "react";
import { languages } from "../../settings";

import { getLocale } from "../locale";

export const Link: typeof NextLink = forwardRef(({ href, ...props }, ref) => {
  let [locale] = href.toString().split("/").filter(Boolean);

  if (!locale || !languages.includes(locale)) {
    locale = getLocale();
    href = `/${locale}${href}`;
  }

  return <NextLink href={href} {...props} ref={ref} />;
});

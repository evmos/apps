"use client";
import type NextLink from "next/link";
import { forwardRef } from "react";
import { defaultLocale, languages } from "../../settings";
import { useTranslation } from "../instrumentation";
import { getLocaleFromPath } from "../..";

export const Link: typeof NextLink = forwardRef(function Link(
  { href, ...props },
  ref
) {
  let url = String(href);
  let locale = getLocaleFromPath(url);
  const { i18n } = useTranslation();
  if ((!locale || !languages.includes(locale)) && !url.startsWith("http")) {
    locale = i18n.language;
    url = `/${locale}${url}`;
  }

  if (url.startsWith(`/${defaultLocale}`)) {
    url = url.replace(new RegExp(`^/${defaultLocale}`), "");
  }

  return <a href={url.toString()} ref={ref} {...props} role="link" />;
});

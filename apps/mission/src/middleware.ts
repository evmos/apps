// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { defaultLocale, languages, cookieName } from "@evmosapps/i18n";

import { getLocaleFromPath } from "@evmosapps/i18n";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|netlify|_next/image|assets|favicon.ico|manifest.json|sw.js|.*png|.*svg|.*jpg).*)",
  ],
};

export function middleware(request: NextRequest) {
  const routeLocale = getLocaleFromPath(request.nextUrl);

  /**
   * if path locale is defaultLocale, remove it from path and redirect
   */
  if (routeLocale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(`/${defaultLocale}`, "");
    return NextResponse.redirect(url);
  }

  /**
   * If path has no locale, serve defaultLocale
   */

  if (!routeLocale || !languages.includes(routeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();
  /**
   * If referer has a locale in path, set language cookie
   */
  if (request.headers.has("referer")) {
    const referer = request.headers.get("referer");
    const refererLocale = referer ? getLocaleFromPath(referer) : null;

    // const response = NextResponse.next();

    if (refererLocale && languages.includes(refererLocale)) {
      response.cookies.set(cookieName, refererLocale);
    }
    return response;
  }
  response.cookies.set(cookieName, routeLocale);

  return response;
}

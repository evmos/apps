// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "./globals.css";
import "evmos-wallet/styles.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

export default appWithTranslation(function App({
  Component,
  pageProps,
}: AppProps) {
  return <Component {...pageProps} />;
});

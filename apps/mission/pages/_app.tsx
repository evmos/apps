// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "./globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";

const app: ReturnType<typeof appWithTranslation> = appWithTranslation(
  function App({ Component, pageProps }: AppProps) {
    return (
      <>
        <Script src="https://public.cypherd.io/sdk/cypher-sdk.js" />
        <Component {...pageProps} />;
      </>
    );
  }
);
export default app;

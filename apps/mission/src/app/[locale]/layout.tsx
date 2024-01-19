// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "../../globals.css";
import { dir } from "i18next";
import { type PropsWithChildren } from "react";
import { languages } from "@evmosapps/i18n";
import { cn } from "helpers";
import { nb, evmos, poppins, inter } from "@evmosapps/ui-helpers/src/fonts";
import { RootProviders } from "stateful-components/src/root-providers";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import type { Metadata } from "next";
import Script from "next/script";
import { Modals } from "../../components/modals";
import { Container } from "@evmosapps/ui-helpers/src/Container";
import { StatefulBanner } from "stateful-components/src/banner/banner";

export const dynamic = "error";

export function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Evmos Apps",
  metadataBase: new URL("https://app.evmos.org"),

  keywords:
    "evmos, landing page, portfolio, overview, assets, stake, governance, vote",
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Evmos Apps",
    type: "article",
    images: "https://storage.evmos.org/social_previews/social_share_apps.jpg",
    url: "https://app.evmos.org/",
    description:
      "Evmos Apps is the official landing page of Evmos, giving you an overview of your Evmos portfolio and any updates from the Evmos development team.",
    siteName: "Evmos Apps",
  },

  twitter: {
    card: "summary_large_image",
    images: "https://storage.evmos.org/social_previews/social_share_apps.jpg",

    description:
      "Evmos Apps is the official landing page of Evmos, giving you an overview of your Evmos portfolio and any updates from the Evmos development team.",
    site: "@EvmosOrg",
  },
  // Other links
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  manifest: "/manifest.json",
};

function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
  return (
    <html lang={locale} dir={dir(locale)} className="dark bg-darkGray1 h-full">
      <head />
      <body
        className={cn(
          nb.variable,
          evmos.variable,
          poppins.variable,
          inter.variable,
          "h-full"
        )}
      >
        <RootProviders>
          <main className="flex flex-col dark:text-white min-h-screen relative">
            <StatefulBanner />
            <Header />

            <Container className="grow">{children}</Container>
            <Footer />
          </main>

          <Modals />

          <GoogleAnalytics />
          <Script src="https://public.cypherd.io/sdk/cypher-sdk.js" />
        </RootProviders>
      </body>
    </html>
  );
}

export default RootLayout;

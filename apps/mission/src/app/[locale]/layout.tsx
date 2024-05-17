// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import "../../globals.css";
import "@evmosapps/ui/global.css";
import { dir } from "i18next";
import { type PropsWithChildren } from "react";
import { languages } from "@evmosapps/i18n";
import { cn } from "helpers";
import { nb, evmos } from "@evmosapps/ui/fonts/index.ts";
import { RootProviders } from "stateful-components/src/root-providers";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import type { Metadata } from "next";
import { Modals } from "../../components/modals";
import { Footer } from "../../components/footer/Footer";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/header/Header";
import { ProfileProvider } from "../../components/header/edit/useEdit";
import { WalletsProvider } from "../../components/header/signin/useWallets";
import { ContainerLogo } from "../../components/ContainerLogo";
import { FavoritesProvider } from "../../components/useFavorite";
import { AlertStack } from "@evmosapps/ui/components/alert/alert-stack.tsx";
import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";

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

async function RootLayout({
  children,
  params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
  const { dApps } = await fetchExplorerData();
  return (
    <html lang={locale} dir={dir(locale)} className="dark bg-darkGray1 h-full">
      <head />
      <body
        className={cn(
          evmos.variable,
          nb.variable,
          "bg-background",
          "dark:bg-background-dark",
          "dark:text-paragraph-dark",
          "text-paragraph",
          "font-body",
          "relative",
          "grid",
          "md:grid-cols-[256px,1fr]",
          "md:grid-rows-[64px,1fr]",
          "md:h-full",
          "w-full",
        )}
      >
        <RootProviders>
          <ProfileProvider>
            <WalletsProvider>
              <FavoritesProvider>
                <ContainerLogo />
                <Sidebar dApps={dApps}/>
                <div className="overflow-y-auto md:row-span-2 md:col-start-2 md:col-span-1">
                  <Header />
                  <div className="px-5 md:px-14 max-w-full overflow-x-hidden">
                    <main className="flex flex-col dark:text-white min-h-screen relative">
                      {children}
                    </main>
                  </div>
                  <Footer />
                </div>
                <Modals />
                <AlertStack />
                <GoogleAnalytics />
              </FavoritesProvider>
            </WalletsProvider>
          </ProfileProvider>
        </RootProviders>
      </body>
    </html>
  );
}

export default RootLayout;



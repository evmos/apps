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
import { Logo } from "../../components/Logo";
import { Sidebar } from "../../components/Sidebar";
import { Header } from "../../components/header/Header";
import { Link } from "@evmosapps/i18n/client";
import { TrackerEvent } from "@evmosapps/ui-helpers/src/TrackerEvent";
import { CLICK_EVMOS_LOGO } from "tracker/src/events";

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
          "md:w-full",
        )}
      >
        <RootProviders>
          <div className="px-6 py-6 md:px-4 bg-surface dark:bg-surface-dark w-full  md:col-span-1 md:row-span-1 ">
            <TrackerEvent event={CLICK_EVMOS_LOGO}>
              <Link href="/">
                <Logo className="h-6" />
              </Link>
            </TrackerEvent>
          </div>
          <div className="bg-surface dark:bg-surface-dark w-full z-10 sticky top-0 md:col-span-1 md:row-start-2 md:row-span-1 h-full md:top-auto md:pt-5">
            <Sidebar />
          </div>
          <div className="md:overflow-y-auto md:row-span-2 md:col-start-2 md:col-span-1">
            <Header />
            <div className="px-14">
              <main className="flex flex-col dark:text-white min-h-screen relative">
                {children}
              </main>
            </div>
            <Footer />
          </div>
          <Modals />
          <GoogleAnalytics />
        </RootProviders>
      </body>
    </html>
  );
}

export default RootLayout;

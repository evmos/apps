import "../../globals.css";
import { dir } from "i18next";
import { PropsWithChildren, Suspense } from "react";
import { languages } from "@evmosapps/i18n";
import { withLocale } from "@evmosapps/i18n/server";
import { cn } from "helpers";
import { nb, evmos } from "@evmosapps/ui-helpers/src/fonts";
import { RootProviders } from "./RootProviders";
import { GoogleAnalytics } from "../../components/GoogleAnalytics";
import { ConsentModal } from "stateful-components/src/modals/ConsentModal/ConsentModal";

// import { ConnectModal } from "stateful-components/src/modals/ConnectModal/ConnectModal";
// import { SetupAccountModal } from "stateful-components/src/modals/SetupAccountModal/SetupAccountModal";
// import { ProfileModal } from "stateful-components/src/modals/ProfileModal/ProfileModal";
// import { TopupModal } from "stateful-components/src/modals/TopupModal/TopupModal";
// import { TermsOfServiceModal } from "stateful-components/src/modals/TermsOfServices/TermsOfServiceModal";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Container } from "@evmosapps/ui-helpers";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Modals } from "./modals";
export function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}
export const viewport: Viewport = {
  themeColor: "black",
  width: "device-width",
  initialScale: 1,
};

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
      <body className={cn(nb.variable, evmos.variable, "h-full")}>
        <RootProviders>
          <main className="flex flex-col dark:text-white min-h-full relative">
            <Header />
            <Container>{children}</Container>
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

export default withLocale(RootLayout);

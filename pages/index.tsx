import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider } from "react-redux";
import AssetsTable from "../src/components/asset/table/AssetsTable";
import Container from "../src/components/Container";
import { store } from "../src/redux/Store";
import { WagmiConfig } from "wagmi";
const Web3Modal = dynamic(() =>
  import("@web3modal/react").then((mod) => mod.Web3Modal)
);
import {
  ethereumClient,
  projectId,
  wagmiClient,
} from "../src/internal/wallet/functionality/walletconnect/walletconnectConstants";
import Script from "next/script";

const Header = dynamic(() => import("../src/components/Header"));
const TermOfServices = dynamic(
  () => import("../src/components/termsOfServices/TermOfServices")
);
const Snackbars = dynamic(
  () => import("../src/components/notification/Snackbars")
);
const Footer = dynamic(() => import("../src/components/footer/Footer"));
import twitterPreviewImage from "../src/images/social_share.jpg";
export default function Home() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <>
            <Head>
              <title>Assets Page</title>
              <link rel="icon" href="/favicon.ico" />

              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta
                name="keywords"
                content="assets, evmos, evm, evm on cosmos, fast finality, delegated proof-of-stake, single-token representation, erc20 assets"
              />
              <link rel="canonical" href="https://app.evmos.org/assets" />

              {/* <!--  Essential META Tags --> */}
              <meta property="og:title" content="Evmos Assets" />
              <meta property="og:type" content="article" />
              <meta property="og:image" content={twitterPreviewImage.src} />
              <meta property="og:url" content="https://app.evmos.org/assets" />
              <meta name="twitter:card" content={twitterPreviewImage.src} />

              {/* <!--  Non-Essential, But Recommended --> */}
              <meta
                property="og:description"
                content="EVMOS Assets is the official place to withdraw, deposit and convert your Evmos assets."
              />
              <meta property="og:site_name" content="Evmos Assets" />
              <meta
                name="twitter:image:alt"
                content="EVMOS Assets is the official place to withdraw, deposit and convert your Evmos assets."
              />
              <meta name="twitter:site" content="@EvmosOrg" />

              <link rel="icon" href="/favicon.ico" />
              {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
              <link rel="manifest" href="/manifest.json" />
            </Head>
            {/* Google tag (gtag.js)  */}
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=G-TBJ303M1SC`}
            />
            <Script id="google-analytics-lz" strategy="lazyOnload">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TBJ303M1SC');
        `}
            </Script>
            <main>
              <TermOfServices />
              <Container>
                <>
                  <Snackbars />
                  <Header />
                  <div className="container mx-auto overflow-auto mb-auto">
                    <AssetsTable />
                  </div>
                  <Footer />
                </>
              </Container>
            </main>
          </>
        </WagmiConfig>
      </QueryClientProvider>

      <Web3Modal
        projectId={projectId}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ethereumClient={ethereumClient}
      />
    </Provider>
  );
}

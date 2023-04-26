// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider, useDispatch, useSelector } from "react-redux";
import { WagmiConfig } from "wagmi";
const Web3Modal = dynamic(() =>
  import("@web3modal/react").then((mod) => mod.Web3Modal)
);
import {
  store,
  ethereumClient,
  projectId,
  wagmiClient,
  StoreType,
  Snackbars,
  getAllSnackbars,
} from "evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Container, TermOfServices } from "ui-helpers";
import MainContainer from "../src/components/mission/MainContainer";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
export default function Mission() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <>
            <Head>
              <title>Mission Control</title>
              <link rel="icon" href="/favicon.ico" />

              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              {/* TODO: what keywords do we want for mission control ? */}
              <meta
                name="keywords"
                content="evmos, landing page, portfolio, overview, assets, stake, governance, vote"
              />
              <link rel="canonical" href="https://app.evmos.org/" />

              {/* <!--  Essential META Tags --> */}
              <meta property="og:title" content="Evmos Mission Control" />
              <meta property="og:type" content="article" />
              <meta
                property="og:image"
                content="https://storage.evmos.org/social_previews/social_share_apps.jpg"
              />
              <meta
                name="twitter:image"
                property="og:image"
                content={
                  "https://storage.evmos.org/social_previews/social_share_apps.jpg"
                }
              />
              <meta property="og:url" content="https://app.evmos.org/" />
              <meta name="twitter:card" content="summary_large_image" />

              {/* <!--  Non-Essential, But Recommended --> */}
              {/* TODO: update description */}

              <meta
                property="og:description"
                content="Mission Control is the official landing page of Evmos, giving you an overview of your Evmos portfolio and any updates from the Evmos development team."
              />
              <meta property="og:site_name" content="Evmos Mission Control" />
              {/* TODO: update description */}
              <meta
                name="twitter:description"
                content="Mission Control is the official landing page of Evmos, giving you an overview of your Evmos portfolio and any updates from the Evmos development team."
              />
              <meta name="twitter:site" content="@EvmosOrg" />

              <link rel="icon" href="/favicon.ico" />
              {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}
              <link rel="manifest" href="/manifest.json" />
            </Head>

            <main>
              <TermOfServices />
              <Container>
                <>
                  <SnackbarsInternal />
                  <MainContainer />
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

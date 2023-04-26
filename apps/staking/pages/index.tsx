// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import Head from "next/head";
import { WagmiConfig } from "wagmi";
import { Provider, useDispatch, useSelector } from "react-redux";

const Web3Modal = dynamic(() =>
  import("@web3modal/react").then((mod) => mod.Web3Modal)
);
import {
  ethereumClient,
  projectId,
  wagmiClient,
  StoreType,
  Snackbars,
  getAllSnackbars,
  store,
} from "evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TermOfServices, Footer, Container } from "ui-helpers";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
import { StatefulHeader } from "../src/StatefulHeader";
const Content = dynamic(() => import("../src/components/staking/Content"));

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <>
            <Head>
              <title>Staking Page</title>
              <link rel="icon" href="/favicon.ico" />

              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              {/* TODO: what keywords do we want for staking ? */}
              <meta
                name="keywords"
                content="evmos, evmos dApp, staking, validator, delegate, undelegate, unstake, redelegate, rewards"
              />
              <link rel="canonical" href="https://app.evmos.org/staking" />

              {/* <!--  Essential META Tags --> */}
              <meta property="og:title" content="Evmos Staking" />
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
              <meta property="og:url" content="https://app.evmos.org/staking" />
              <meta name="twitter:card" content="summary_large_image" />

              {/* <!--  Non-Essential, But Recommended --> */}
              {/* TODO: update description */}
              <meta
                property="og:description"
                content="Evmos Staking is the official Evmos dApp to stake/unstake your Evmos tokens, claim your rewards, and watch your stake grow."
              />
              <meta property="og:site_name" content="Evmos Staking" />
              {/* TODO: update description */}
              <meta
                name="twitter:description"
                content="Evmos Staking is the official Evmos dApp to stake/unstake your Evmos tokens, claim your rewards, and watch your stake grow."
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
                  <StatefulHeader pageName="Staking" />
                  <div className="container mx-auto mb-auto overflow-auto">
                    <Content />
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

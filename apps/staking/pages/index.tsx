// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
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

import { TermOfServices, Container } from "ui-helpers";
import { MixpanelProvider } from "tracker";
function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
import { StatefulHeader } from "../src/StatefulHeader";
import { HeadComponent } from "../src/components/staking/HeadComponent";
import { GoogleAnalytics } from "../src/components/GoogleAnalytics";
import { StatefulFooter } from "../src/StatefulFooter";
import { InformationBanner } from "ui-helpers";
const Content = dynamic(() => import("../src/components/staking/Content"));

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <MixpanelProvider
            config={{ ip: false }}
            token={process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ""}
          >
            <>
              <HeadComponent />
              <GoogleAnalytics />
              <main>
                <TermOfServices />
                <InformationBanner
                  dismissible={true}
                  localStorageId="dora-hacks-banner"
                  text={
                    <div className="text-base">
                      Extend the EVM with DoraHacks - live until June 15!{" "}
                      <a
                        href="https://dorahacks.io/hackathon/EVM/detail"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2.5 rounded bg-red p-5 py-1.5 font-semibold text-pearl"
                      >
                        Build Now 🚀
                      </a>
                    </div>
                  }
                />
                <Container>
                  <>
                    <SnackbarsInternal />
                    <StatefulHeader pageName="Staking" />
                    <div className="container mx-auto mb-auto overflow-auto">
                      <Content />
                    </div>
                    <StatefulFooter />
                  </>
                </Container>
              </main>
            </>
          </MixpanelProvider>
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

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AssetsTable from "../src/components/asset/table/AssetsTable";

import {
  ethereumClient,
  projectId,
  wagmiClient,
  WagmiConfig,
  Web3Modal,
  store,
  Snackbars,
  StoreType,
  getAllSnackbars,
} from "evmos-wallet";
import { Container, TermOfServices } from "ui-helpers";
import { Provider, useDispatch, useSelector } from "react-redux";

import { StatefulHeader } from "../src/StatefulHeader";
import { HeadComponent } from "../src/components/asset/HeadComponent";
import { GoogleAnalytics } from "../src/components/asset/GoogleAnalytics";
import { StatefulFooter } from "../src/StatefulFooter";
import { MixpanelProvider } from "tracker";
import { InformationBanner, Consent } from "ui-helpers";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
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
                <Consent />
                <TermOfServices />
                <InformationBanner
                  dismissible={true}
                  localStorageId="dora-hacks-banner"
                  text={
                    <div className="text-base">
                      Extend the EVM with DoraHacks - live until June 2!{" "}
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
                    <StatefulHeader pageName="Assets" />
                    <div className="container mx-auto mb-auto overflow-auto">
                      <AssetsTable />
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

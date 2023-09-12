// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { Provider, useDispatch, useSelector } from "react-redux";

import {
  StoreType,
  Snackbars,
  getAllSnackbars,
  store,
  WalletProvider,
} from "evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TermOfServices, Container, MavaWidget } from "ui-helpers";
import { MixpanelProvider } from "tracker";
function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
import { StatefulHeader } from "stateful-components";
import { HeadComponent } from "../src/components/staking/HeadComponent";
import { GoogleAnalytics } from "../src/components/GoogleAnalytics";
import { StatefulFooter } from "stateful-components";
import { GiveFeedback } from "../src/GiveFeedback";

const Content = dynamic(() => import("../src/components/staking/Content"));

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <MixpanelProvider
            config={{ ip: false }}
            token={process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? ""}
          >
            <>
              <HeadComponent />
              <GoogleAnalytics />
              <main>
                <TermOfServices />
                <GiveFeedback />
                <Container>
                  <>
                    <SnackbarsInternal />
                    <StatefulHeader pageName="Staking" page="staking" />
                    <MavaWidget />
                    <div className="container mx-auto mb-auto overflow-auto">
                      <Content />
                    </div>
                    <StatefulFooter />
                  </>
                </Container>
              </main>
            </>
          </MixpanelProvider>
        </WalletProvider>
      </QueryClientProvider>
    </Provider>
  );
}

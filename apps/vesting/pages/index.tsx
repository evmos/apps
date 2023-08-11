// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { Provider, useDispatch, useSelector } from "react-redux";

import {
  store,
  StoreType,
  Snackbars,
  getAllSnackbars,
  WalletProvider,
} from "evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TermOfServices, Container } from "ui-helpers";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
import { StatefulHeader } from "../src/components/StatefulHeader";
import { HeadComponent } from "../src/components/vesting/HeadComponent";
import { GoogleAnalytics } from "../src/components/GoogleAnalytics";
import { StatefulFooter } from "../src/components/StatefulFooter";
const Content = dynamic(() => import("../src/components/vesting/Content"));
import { MixpanelProvider } from "tracker";
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
                <Container>
                  <>
                    <SnackbarsInternal />
                    <StatefulHeader pageName="Vesting" />
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

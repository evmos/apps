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
} from "@evmosapps/evmos-wallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TermOfServices, Container, MavaWidget } from "@evmosapps/ui-helpers";
import { nb, evmos } from "@evmosapps/ui-helpers/src/fonts";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}
import { HeadComponent } from "../src/components/vesting/HeadComponent";
import { GoogleAnalytics } from "../src/components/GoogleAnalytics";
import { StatefulFooter, StatefulHeader } from "stateful-components";
const Content = dynamic(() => import("../src/components/vesting/Content"));
import { MixpanelProvider } from "tracker";
import { GiveFeedback } from "../src/components/GiveFeedback";
import { cn } from "helpers";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
      // Will be passed to the page component as props
    },
  };
}

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
              <main className={cn(nb.variable, evmos.variable)}>
                <TermOfServices />
                <GiveFeedback />
                <Container>
                  <>
                    <SnackbarsInternal />
                    <StatefulHeader pageName="Vesting" page="vesting" />
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

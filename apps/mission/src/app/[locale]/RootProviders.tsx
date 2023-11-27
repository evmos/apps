"use client";
import { QueryClient } from "@tanstack/react-query";
import { StoreType, store } from "@evmosapps/evmos-wallet/src/redux/Store";
import { WalletProvider } from "@evmosapps/evmos-wallet/src/wallet/components/WalletProvider";
import { PropsWithChildren, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { MavaWidget } from "@evmosapps/ui-helpers";
import { Snackbars, getAllSnackbars } from "@evmosapps/evmos-wallet";
import { GiveFeedback } from "../../components/GiveFeedback";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import {
  ThemeProvider,
  useTheme,
} from '@interchain-ui/react';
import '@interchain-ui/react/globalStyles';
import '@interchain-ui/react/styles';

function SnackbarsInternal() {
  const valueRedux = useSelector((state: StoreType) => getAllSnackbars(state));
  const dispatch = useDispatch();
  return <Snackbars valueRedux={valueRedux} dispatch={dispatch} />;
}

export const RootProviders = ({ children }: PropsWithChildren) => {

  const [{ queryClient, persister }] = useState(() => ({
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
      },
    }),

    persister: createSyncStoragePersister({
      storage: typeof window === "undefined" ? undefined : window.localStorage,
    }),
  }));
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <ReactQueryStreamedHydration>
            <WalletProvider>
              {children}

              <SnackbarsInternal />
              <MavaWidget />
              <GiveFeedback />
            </WalletProvider>
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            />
          </ReactQueryStreamedHydration>
        </PersistQueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};

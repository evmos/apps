import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider } from "react-redux";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "../src/components/Container";
import MainContainer from "../src/components/mission/MainContainer";

const TermOfServices = dynamic(
  () => import("../src/components/termsOfServices/TermOfServices")
);
const Snackbars = dynamic(
  () => import("../src/components/notification/Snackbars")
);

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
            </Head>

            <main>
              <TermOfServices />
              <Container>
                <>
                  <Snackbars />
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

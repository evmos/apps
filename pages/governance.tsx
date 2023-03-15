import dynamic from "next/dynamic";
import Head from "next/head";
import { Provider } from "react-redux";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Header = dynamic(() => import("../src/components/Header"));
const TermOfServices = dynamic(
  () => import("../src/components/termsOfServices/TermOfServices")
);
const Snackbars = dynamic(
  () => import("../src/components/notification/Snackbars")
);
const Footer = dynamic(() => import("../src/components/footer/Footer"));
const Content = dynamic(() => import("../src/components/governance/Content"));

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={wagmiClient}>
          <>
            <Head>
              <title>Governance Page</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
              <TermOfServices />
              <Container>
                <>
                  <Snackbars />
                  <Header pageName="Governance" />
                  <div className="container mx-auto overflow-auto mb-auto">
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

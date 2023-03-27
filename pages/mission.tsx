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
import SideBar from "../src/components/mission/SideBar/SideBar";
import MissionContainer from "../src/components/MissionContainer";

const MissionHeader = dynamic(() => import("../src/components/MissionHeader"));
const TermOfServices = dynamic(
  () => import("../src/components/termsOfServices/TermOfServices")
);
const Snackbars = dynamic(
  () => import("../src/components/notification/Snackbars")
);
const Footer = dynamic(() => import("../src/components/footer/Footer"));
const Content = dynamic(() => import("../src/components/mission/Content"));

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
              <MissionContainer>
                <>
                  <Snackbars />
                  <div className="grid grid-cols-8">
                    <SideBar />
                    <div className="flex col-span-7 flex-1 flex-col">
                      <MissionHeader pageName="Mission Control" />
                      <div className="container mx-auto overflow-auto mb-auto">
                        <Content />
                      </div>
                      <Footer />
                    </div>
                  </div>
                </>
              </MissionContainer>
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

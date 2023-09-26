// // Copyright Tharsis Labs Ltd.(Evmos)
// // SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AssetsTable from "../src/components/asset/table/AssetsTable";
export default function Home() {
  return <AssetsTable />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
      // Will be passed to the page component as props
    },
  };
}

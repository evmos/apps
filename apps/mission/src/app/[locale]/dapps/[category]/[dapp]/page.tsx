import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";

export { DappDetailsPage as default } from "@evmosapps/dappstore-page";

export const generateStaticParams = async () => {
  const { dApps } = await fetchExplorerData();

  return dApps
    .filter(({ instantDapp }) => instantDapp)
    .map((dapp) => ({
      dapp: dapp.slug,
      category: dapp.categorySlug,
    }));
};

export async function generateMetadata({
  params,
}: {
  params: { dapp: string };
}) {
  const { dApps } = await fetchExplorerData();
  const dapp =
    dApps.find((c) => c.slug === params.dapp) ?? raise("DApp not found");

  if (dapp.instantDapp) {
    return {
      title: `${dapp.name} Instant dApp | Evmos dApp Store`,
    };
  }

  return {
    title: `${dapp.name} dApp | Evmos dApp Store`,
  };
}

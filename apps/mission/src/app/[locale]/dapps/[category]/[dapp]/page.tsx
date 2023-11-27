import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";

export { DappDetailsPage as default } from "@evmosapps/dappstore-page";
export const dynamic = "error";
export const generateStaticParams = async () => {
  const { dApps } = await fetchExplorerData();

  return dApps
    .filter(({ instantDapp }) => instantDapp)
    .map((dapp) => ({
      dapp: dapp.slug,
      category: dapp.categorySlug,
    }));
};

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";

export const dynamic = "error";
export { DappExplorerPage as default } from "@evmosapps/dappstore-page";

export const generateStaticParams = async () => {
  const { categories } = await fetchExplorerData();

  return [
    {
      category: "instant-dapps",
    },
    ...categories.map((category) => ({
      category: category.slug,
    })),
  ];
};

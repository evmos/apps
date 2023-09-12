import Head from "next/head";
import { useRouter } from "next/router";

export const HeadComponent = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Assets Page</title>
        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="assets, evmos, evm, evm on cosmos, fast finality, delegated proof-of-stake, single-token representation, erc20 assets, (new) evmos dApp"
        />
        <link rel="canonical" href="https://app.evmos.org/assets" />

        {/* <!--  Essential META Tags --> */}
        <meta property="og:title" content="Evmos Assets" />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://storage.evmos.org/social_previews/social_share_apps.jpg"
        />
        <meta
          name="twitter:image"
          property="og:image"
          content={
            "https://storage.evmos.org/social_previews/social_share_apps.jpg"
          }
        />
        <meta property="og:url" content="https://app.evmos.org/assets" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* <!--  Non-Essential, But Recommended --> */}
        <meta
          property="og:description"
          content="Evmos Assets is the official Evmos dApp to withdraw, deposit and convert your Evmos assets."
        />
        <meta property="og:site_name" content="Evmos Assets" />
        <meta
          name="twitter:description"
          content="Evmos Assets is the official Evmos dApp to withdraw, deposit and convert your Evmos assets."
        />
        <meta name="twitter:site" content="@EvmosOrg" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href={`${router.basePath}/manifest.json`} />
      </Head>
    </>
  );
};

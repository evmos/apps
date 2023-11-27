import Head from "next/head";

export const HeadComponent = () => {
  return (
    <>
      <Head>
        <title>Assets Portfolio</title>
        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="assets, evmos, evm, evm on cosmos, fast finality, delegated proof-of-stake, single-token representation, erc20 assets, (new) evmos dApp"
        />
        <link rel="canonical" href="https://app.evmos.org/portfolio" />

        {/* <!--  Essential META Tags --> */}
        <meta property="og:title" content="Evmos Portfolio" />
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
        <meta property="og:url" content="https://app.evmos.org/portfolio" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* <!--  Non-Essential, But Recommended --> */}
        <meta
          property="og:description"
          content="Evmos Portfolio is the official Evmos dApp to withdraw, deposit and convert your Evmos assets."
        />
        <meta property="og:site_name" content="Evmos Portfolio" />
        <meta
          name="twitter:description"
          content="Evmos Portfolio is the official Evmos dApp to withdraw, deposit and convert your Evmos assets."
        />
        <meta name="twitter:site" content="@EvmosOrg" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
    </>
  );
};

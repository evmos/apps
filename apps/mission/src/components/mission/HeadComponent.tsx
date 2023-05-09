import Head from "next/head";

export const HeadComponent = () => {
  return (
    <Head>
      <title>Mission Control</title>
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="evmos, landing page, portfolio, overview, assets, stake, governance, vote"
      />
      <link rel="canonical" href="https://app.evmos.org/" />

      {/* <!--  Essential META Tags --> */}
      <meta property="og:title" content="Evmos Mission Control" />
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
      <meta property="og:url" content="https://app.evmos.org/" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* <!--  Non-Essential, But Recommended --> */}

      <meta
        property="og:description"
        content="Mission Control is the official landing page of Evmos, giving you an overview of your Evmos portfolio and any updates from the Evmos development team."
      />
      <meta property="og:site_name" content="Evmos Mission Control" />
      <meta
        name="twitter:description"
        content="Mission Control is the official landing page of Evmos, giving you an overview of your Evmos portfolio and any updates from the Evmos development team."
      />
      <meta name="twitter:site" content="@EvmosOrg" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};

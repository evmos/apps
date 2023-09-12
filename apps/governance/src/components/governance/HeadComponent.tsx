import Head from "next/head";
import { useRouter } from "next/router";

export const HeadComponent = () => {
  const router = useRouter();

  return (
    <Head>
      <title>Governance Page</title>
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="keywords"
        content="evmos, evmos dApp, voting, governance, proposal"
      />
      <link rel="canonical" href="https://app.evmos.org/governance" />

      {/* <!--  Essential META Tags --> */}
      <meta property="og:title" content="Evmos Governance" />
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
      <meta property="og:url" content="https://app.evmos.org/governance" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* <!--  Non-Essential, But Recommended --> */}
      <meta
        property="og:description"
        content="Evmos Governance is the official Evmos dApp to view and vote on Evmos governance proposals."
      />
      <meta property="og:site_name" content="Evmos Governance" />
      <meta
        name="twitter:description"
        content="Evmos Governance is the official Evmos dApp to view and vote on Evmos governance proposals."
      />
      <meta name="twitter:site" content="@EvmosOrg" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href={`${router.basePath}/manifest.json`} />
    </Head>
  );
};

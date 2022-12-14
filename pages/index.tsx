import Head from "next/head";
import AssetsTable from "../src/components/asset/AssetsTable";
import Container from "../src/components/Container";
import Header from "../src/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Assets Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <>
            <Header />
            <div className="container mx-auto">
              <AssetsTable />
            </div>
          </>
        </Container>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </>
  );
}

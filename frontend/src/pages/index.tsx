import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>News Capsule</title>
        <meta name="description" content="News Capsule description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className="text-2xl text-center">News Capsule</p>
      </main>
    </>
  );
}

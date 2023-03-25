import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Template</title>
        <meta name="description" content="Project template description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className="text-2xl text-center">Hello World</p>
      </main>
    </>
  );
}

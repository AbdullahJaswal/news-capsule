import Head from "next/head";

import { GetServerSidePropsContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import Login from "@/components/authentication/LoginComponent";
import { AuthSession } from "@/common/types/Auth/AuthSession";

export default function Home() {
  return (
    <>
      <Head>
        <title>NewsCapsule</title>
        <meta name="description" content="NewsCapsule description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Login />
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session: AuthSession | null = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: { destination: "/dashboard" },
    };
  }

  return {
    props: {},
  };
};

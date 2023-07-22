import "@/styles/globals.css";

import type { AppProps } from "next/app";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Merriweather as Font } from "next/font/google";
import AuthLayout from "@/components/layouts/AuthLayout";

const font = Font({
  subsets: ["latin"],
  weight: "400",
});

config.autoAddCss = false;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const renderWithLayout =
    Component.getLayout ||
    function (page: ReactElement) {
      return (
        <main className={font.className}>
          <AuthLayout>{page}</AuthLayout>
        </main>
      );
    };

  return renderWithLayout(
    <SessionProvider session={pageProps.session}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>,
  );
}

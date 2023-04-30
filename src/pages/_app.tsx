import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
// import { Analytics } from '@vercel/analytics/react';
import Layout from '@/components/common/Layout';
import Head from 'next/head';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>Bono</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={"Bono's resume / CV website"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Analytics /> */}
      <Component {...pageProps} />;
    </Layout>
  );
}

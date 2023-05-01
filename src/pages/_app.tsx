import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
// import { Analytics } from '@vercel/analytics/react';
import Layout from '@/components/common/Layout';
import Script from 'next/script';
import Head from 'next/head';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KXS0HTW0P4"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KXS0HTW0P4', {page_path: window.location.pathname,});`,
        }}
      />
      <Layout>
        <Head>
          <title>Bono</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content={"Bono's resume / CV website"} />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        </Head>
        {/* <Analytics /> */}
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

import '../styles/globals.css';
import Head from 'next/head';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import Layout from '../components/layout/Layout';
import { AppProps } from 'next/app';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>DP Generator</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        theme={{
          fontFamily: "Cabinet Grotesk",
          headings: {
            fontFamily: "Cabinet Grotesk",
            sizes: {
              h1: { fontSize: '36' },
            },
          },
        }}
      >
        <Notifications />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}

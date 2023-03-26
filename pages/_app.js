import '../styles/globals.css';
import Head from 'next/head';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Auto DP Generator</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        theme={{
          fontFamily: "Cabinet Grotesk",
          headings: {
            fontFamily: "Cabinet Grotesk",
            sizes: {
              h1: { fontSize: 36 },
            },
          },
        }}
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

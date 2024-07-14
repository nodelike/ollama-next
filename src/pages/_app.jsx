import "../styles/globals.css";
import Head from "next/head";
import Toast from "@/components/Toast";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
        <Head>
          <link rel="icon" href="/next.svg" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
        <Toast />
    </>
  );
}

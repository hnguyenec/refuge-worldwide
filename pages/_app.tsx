import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Footer from "../components/footer";
import LivePlayer from "../components/livePlayer";
import Meta from "../components/meta";
import Navigation from "../components/navigation";
import "../styles/globals.css";

const MixcloudPlayer = dynamic(() => import("../components/mixcloudPlayer"), {
  ssr: false,
});

function RefugeApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />

      <header>
        <Navigation />
      </header>

      <LivePlayer />

      <Component {...pageProps} />

      <Footer />

      <MixcloudPlayer />
    </>
  );
}

export default RefugeApp;

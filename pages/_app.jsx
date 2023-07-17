import '../styles/global.css';
import '../styles/Editor.global.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>TextShare</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;

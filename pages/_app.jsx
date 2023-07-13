import '../styles/global.css';
import '../styles/Editor.global.css';
import 'reactjs-popup/dist/index.css';
import 'tippy.js/dist/tippy.css';
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

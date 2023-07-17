import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Styles from '../styles/OpenText.module.css';
import { RxCross1, RxLink2, RxPencil2 } from 'react-icons/rx';
import { BsStars } from 'react-icons/bs';
import Link from 'next/link';
import parser from 'react-html-parser';
import { RiReactjsLine } from 'react-icons/ri';

export default function OpenText() {
  const router = useRouter();
  const id = router.asPath.replace('/', '');
  const [HTML, setHTML] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState('');

  const getHTML = async () => {
    if (isNaN(id)) return;
    await fetch(`/api/textshare?id=${id}`)
      .then(async (res) => {
        const HTML = await res.text();
        HTML ? setHTML(HTML) : setError(`No Text with id: ${id}!`);
      })
      .catch((e) => setError(e));
  };

  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess('Copied');
  }

  async function copyAndEdit() {
    await router.push(`/?getData=true&id=${id}`);
  }

  useEffect(() => {
    getHTML();
  }, [id]);

  return (
    <div className={Styles.OpenTextMain}>
      <div className={Styles.OpenTextTop}>
        <Link href="/" style={{ textDecoration: 'none' }} target="_blank">
          <span className={Styles.Title}>TextShare</span>
        </Link>
        <div className={Styles.Menu}>
          <button
            style={{ backgroundColor: '#87ceeb' }}
            disabled={copySuccess}
            onClick={copyToClip}>
            {copySuccess ? (
              <>
                Link Copied
                <BsStars />
              </>
            ) : (
              <>
                <RxLink2 size="1rem" />
                Copy Link
              </>
            )}
          </button>
          <button onClick={copyAndEdit} style={{ backgroundColor: '#90ee90' }}>
            <RxPencil2 size="1rem" />
            Copy and Edit Text
          </button>
        </div>
      </div>
      {HTML ? (
        <div className={Styles.Content}>{parser(HTML)}</div>
      ) : error ? (
        <div className={Styles.Error}>
          <div>
            <span>{error}</span>
          </div>
        </div>
      ) : (
        <div className={Styles.LoadingAnimation}>
          <RiReactjsLine size="2rem" />
        </div>
      )}
    </div>
  );
}

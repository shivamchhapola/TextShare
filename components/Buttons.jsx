import { useState } from 'react';
import Styles from '../styles/Buttons.module.css';

export default function Buttons({ HTML }) {
  const [getID, setGetID] = useState(0);
  const [btnActive, setBtnActive] = useState(true);

  const onTextshare = async () => {
    if (!HTML) return;
    setBtnActive(false);
    await fetch('/api/textshare', {
      method: 'POST',
      headers: { 'Content-Type': 'text/html' },
      body: HTML,
    })
      .then(async (res) => {
        console.log(await res.json());
        setBtnActive(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={Styles.Buttons}>
      <button disabled={!btnActive} className={Styles.OpenText}>
        Open Text
      </button>
      <button
        disabled={!btnActive}
        className={Styles.TextShare}
        onClick={onTextshare}>
        Text Share
      </button>
    </div>
  );
}

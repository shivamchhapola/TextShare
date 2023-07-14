import { useRef, useState } from 'react';
import Styles from '../styles/Buttons.module.css';
import PopupStyles from '../styles/Editor.module.css';
import Popup from 'reactjs-popup';
import { useRouter } from 'next/router';

export default function Buttons({ HTML }) {
  const id = useRef();
  const router = useRouter();
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
        await router.push(`/${(await res.json()).id}`);
        return setBtnActive(true);
      })
      .catch((e) => console.log(e));
  };

  const onOpenText = async () => {
    if (!id.current) return;
    return await router.push(`/${id.current.value}`);
  };

  return (
    <div className={Styles.Buttons}>
      <Popup
        trigger={
          <button disabled={!btnActive} className={Styles.OpenText}>
            Open Text
          </button>
        }
        nested
        modal>
        {(close) => {
          return (
            <div className={PopupStyles.PopupMain}>
              <input
                style={{
                  width: '80%',
                }}
                ref={id}
                type="number"
                placeholder="Insert a valid Text id..."
              />
              <button
                onClick={() => {
                  onOpenText();
                  close();
                }}
                className={PopupStyles.InsertImgBtn}>
                Open Text
              </button>
            </div>
          );
        }}
      </Popup>
      <button
        disabled={!btnActive}
        className={Styles.TextShare}
        onClick={onTextshare}>
        Text Share
      </button>
    </div>
  );
}

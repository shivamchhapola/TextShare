import Styles from '../styles/index.module.css';
import { useEffect, useState } from 'react';
import Navbar from './../components/Navbar';
import RichEditor from './../components/Editor';
import Buttons from './../components/Buttons';
import { useRouter } from 'next/router';

export default function App() {
  const router = useRouter();
  const getData = router.query.getData || false;
  const [HTML, setHTML] = useState('');
  const [initHTML, setInitHTML] = useState('<p>Start Writing here...</p>');

  const GetData = async () => {
    await fetch(`/api/textshare?id=${router.query.id}`)
      .then(async (res) => {
        setInitHTML(await res.text());
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (getData) {
      GetData();
    }
  }, [getData]);

  return (
    <div className={Styles.App}>
      <Navbar />
      <Buttons HTML={HTML} />
    </div>
  );
}

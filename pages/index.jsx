import Styles from '../styles/index.module.css';
import { useState } from 'react';
import Navbar from './../components/Navbar';
import RichEditor from './../components/Editor';
import GoogleFontLoader from 'react-google-font-loader';
import Buttons from './../components/Buttons';

export default function App() {
  const [HTML, setHTML] = useState('');

  return (
    <div className={Styles.App}>
      <Navbar />
      <RichEditor setHTML={setHTML} />
      <Buttons HTML={HTML} />
    </div>
  );
}

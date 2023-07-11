import './App.css';
import { useState } from 'react';
import RichEditor from './Editor';
import Navbar from './Navbar';
import GoogleFontLoader from 'react-google-font-loader';
import Buttons from './Buttons';

export default function App() {
  const [HTML, setHTML] = useState('');

  return (
    <div className="App">
      <GoogleFontLoader
        fonts={[
          {
            font: 'Lexend Mega',
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
          {
            font: 'Public Sans',
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
        ]}
      />
      <Navbar />
      <RichEditor setHTML={setHTML} />
      <Buttons HTML={HTML} />
    </div>
  );
}

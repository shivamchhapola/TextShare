import './App.css';
import Navbar from './Navbar';
import GoogleFontLoader from 'react-google-font-loader';

export default function App() {
  return (
    <div className="App">
      <GoogleFontLoader
        fonts={[
          {
            font: 'Lexend Mega',
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
          },
        ]}
      />
      <Navbar />
    </div>
  );
}

import './Buttons.css';

export default function Buttons({ HTML }: { HTML: string }) {
  return (
    <div className="Buttons">
      <button
        className="OpenText"
        onClick={() => {
          console.log(HTML);
        }}>
        Open Text
      </button>
      <button
        className="TextShare"
        onClick={() => {
          console.log(HTML);
        }}>
        Text Share
      </button>
    </div>
  );
}

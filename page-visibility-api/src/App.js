import './App.css';
import UrlVideoPlayer from './UrlVideoPlayer';
import ReactPlayer from 'react-player';
import { useEffect, useState } from 'react';

function App() {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div>
          <h2>UrlVideoPlayer:</h2>
          <UrlVideoPlayer
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            playing={playing}
          />
        </div>
        <div className="youtube-player-container">
          <h2>ReactPlayer:</h2>
          <ReactPlayer
            width="100%"
            muted
            playing={playing}
            url="https://www.youtube.com/embed/oUFJJNQGwhk"
          />
        </div>
      </div>
      <button
        onClick={() => {
          setPlaying((playing) => !playing);
        }}
      >
        {playing ? 'Stop' : 'Play'}
      </button>
    </div>
  );
}

export default App;

import { useEffect, useRef } from 'react';

const UrlVideoPlayer = ({ src, playing }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (playing) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [playing]);

  return (
    <video controls width="100%" ref={ref} muted autoPlay={false}>
      <source src={src} type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  );
};

export default UrlVideoPlayer;

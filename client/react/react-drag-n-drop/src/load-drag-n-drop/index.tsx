import { useState } from 'react';
import './LoadDragAndDrop.css';

function LoadDragAndDrop() {
  const [drag, setDrag] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDrag(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log(files);
    setDrag(false);
  }

  return (
    <div className="app">
      {drag ? (
        <div
          className="drop-area"
          onDragStart={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragStart}
          onDrop={handleDrop}
        >
          Drop files to upload
        </div>
      ) : (
        <div
          onDragStart={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragStart}
        >
          Drag files to upload
        </div>
      )}
    </div>
  );
}

export default LoadDragAndDrop;

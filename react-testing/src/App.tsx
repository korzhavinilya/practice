import { useState } from 'react';
import './App.scss';

function App() {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState(false);

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function toggleVisibility() {
    setVisibility((visibility) => !visibility);
  }

  return (
    <div className="container">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChangeName}
        value={name}
      />
      <button onClick={toggleVisibility}>{visibility ? 'Hide' : 'Show'}</button>
      {visibility && <p>{name}</p>}
    </div>
  );
}

export default App;

import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

async function search(searchTerms: string) {
  console.log('Searching...', searchTerms);
}

function useDebounceHook(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
}

function debounce<T>(callback: (arg: T) => void, delay: number) {
  let timerId = 0;

  return (arg: T) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(arg);
    }, delay);
  };
}

function App() {
  const [valueForHook, setValueForHook] = useState('');
  const debouncedValue = useDebounceHook(valueForHook, 500);

  const [valueForFunction, setValueForFunction] = useState('');

  useEffect(() => {
    search(debouncedValue);
  }, [debouncedValue]);

  const debouncedSearch = useRef(debounce(search, 500));

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          placeholder="hook"
          type="text"
          value={valueForHook}
          onChange={(e) => setValueForHook(e.target.value)}
        />
      </div>
      <p className="read-the-docs">useDebounce hook: {debouncedValue}</p>

      <div className="card">
        <input
          placeholder="function"
          type="text"
          value={valueForFunction}
          onChange={(e) => {
            debouncedSearch.current(e.target.value);
            setValueForFunction(e.target.value);
          }}
        />
      </div>

      <p className="read-the-docs">useDebounce function: None</p>
    </>
  );
}

export default App;

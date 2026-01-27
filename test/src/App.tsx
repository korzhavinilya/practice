import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState({ count: 0 });
  const [flag, setFlag] = useState(false);

  function increment() {
    setFlag((f) => !f);
    setCount((lastCount) => {
      console.log('set state callback');
      return { ...lastCount, count: lastCount.count + 1 };
    });
    console.log('after increment');
  }

  function increment3() {
    increment();
    increment();
    increment();
  }

  console.log('render', count);

  return (
    <>
      <h1>count is {count.count}</h1>
      <h2>flag is {flag ? '+' : '-'}</h2>
      <div className="card">
        <button onClick={increment}>+1</button>
        <button onClick={increment3}>+3</button>
      </div>
    </>
  );
}

export default App;

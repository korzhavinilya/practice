import DataFetcher from './components/DataFetcher';
import axios from 'axios';

function App() {
  return (
    <>
      <DataFetcher resource="a" />
      <DataFetcher resource="b" />
      <DataFetcher resource="c" />

      <button onClick={async () => {
          await axios.get("http://localhost:3001/a");
          await axios.get("http://localhost:3001/b");
          await axios.get("http://localhost:3001/c");
      }}>Fetch all</button>
    </>
  );
}

export default App;

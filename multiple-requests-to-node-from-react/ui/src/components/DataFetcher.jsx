import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DataFetcher({ resource = 'a' }) {
  const [data, setData] = useState(0);

  async function fetchData() {
    const response = await axios.get(`http://localhost:3001/${resource}`);
    const data = response.data;
    const value = data.value;
    setData(value);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <span>
        {resource} value: {data}
      </span>{' '}
      <button onClick={fetchData}>fetch data</button>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  getData,
  rxjsState,
  triggerRxjsSubject,
} from '@utility-app/utility-project';
import './style.css';

export default function Root(props) {
  const [data, setData] = useState('');
  const [rxjsData, setRxjsData] = useState<string[]>([]);

  useEffect(() => {
    getData('/123').then((response) => {
      setData(response.data);
    });

    triggerRxjsSubject();

    const subscription = rxjsState.subscribe((data) => {
      if (data) {
        setRxjsData((rxjsData) => [...rxjsData, data.message]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <section>
      <h1>Content</h1>

      <p>Externals data: {data}</p>

      {!!rxjsData.length && (
        <>
          <p>Rxjs data:</p>
          <ul>
            {rxjsData.map((data, index) => (
              <li key={index + data}>{data}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

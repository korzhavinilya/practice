import { useCallback, useEffect } from 'react';
import './App.css';

const url = 'http://localhost:3000';

function FetchApp() {
  const fetchETagData = useCallback(async () => {
    try {
      const savedEtag = localStorage.getItem('etag');

      // const response = await fetch(`${url}/etag`, {
      const response = await fetch(`${url}/etag-optimized`, {
        method: 'GET',
        headers: {
          'If-None-Match': savedEtag || '' // Отправляем заголовок If-None-Match
        }
      });

      if (response.status === 304) {
        console.log('304 Not Modified');
        console.log('Using cached data.');
        return;
      }

      if (response.ok) {
        const jsonData = await response.json();
        console.log('200 OK');
        console.log({ etag: jsonData });

        const newEtag = response.headers.get('ETag');
        if (newEtag) {
          localStorage.setItem('etag', newEtag);
        }
      } else {
        console.error('Error fetching ETag data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching ETag data:', error);
    }
  }, []);

  const fetchCacheControlData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/cache-control', {
        method: 'GET'
      });

      if (response.ok) {
        const jsonData = await response.json();
        console.log('Cache-Control response received');
        console.log({ cacheControl: jsonData });
      } else {
        console.error('Error fetching Cache-Control data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching Cache-Control data:', error);
    }
  }, []);

  useEffect(() => {
    fetchETagData();
    fetchCacheControlData();
  }, [fetchETagData, fetchCacheControlData]);

  return (
    <>
      <div className="card">
        <button onClick={fetchETagData}>Fetch ETag Data</button>
        <button onClick={fetchCacheControlData}>
          Fetch Cache-Control Data
        </button>
      </div>
    </>
  );
}

export default FetchApp;

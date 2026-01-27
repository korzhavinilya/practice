import { useCallback, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const axiosInstance = axios.create({ baseURL: 'http://localhost:3000' });

// axiosInstance.interceptors.request.use((config) => {
//   const savedEtag = localStorage.getItem(`etag${config.url}`);
//   if (savedEtag) {
//     config.headers['If-None-Match'] = savedEtag;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.headers['etag']) {
//       localStorage.setItem(
//         `etag${response.config.url}`,
//         response.headers['etag']
//       );
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 304) {
//       console.log('Data not modified, using cached version.');
//       return error.response;
//     }
//     return Promise.reject(error);
//   }
// );

function AxiosApp() {
  useEffect(() => {
    function handle() {
      console.log('click');
    }

    document.addEventListener('click', handle);

    return () => {
      document.removeEventListener('click', handle);
    };
  }, []);

  const fetchETagData = useCallback(async () => {
    try {
      // const res = await axiosInstance.get('/etag');
      const res = await axiosInstance.get('/etag-optimized');
      console.log({ etag: res.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  const fetchCacheControlData = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/cache-control');
      console.log({ cacheControl: res.data });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchETagData();
    fetchCacheControlData();
  }, [fetchCacheControlData, fetchETagData]);

  return (
    <>
      <div className="card">
        <button onClick={fetchETagData}>fetch ETag</button>
        <button onClick={fetchCacheControlData}>fetch Cache-Control</button>
      </div>
    </>
  );
}

export default AxiosApp;

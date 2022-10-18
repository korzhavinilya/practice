import fetch from 'node-fetch';
import axios from 'axios';

const abortController = new AbortController();

// const promiseOne = fetch('http://123.123.123.123', {
//   signal: abortController.signal,
// });

const promiseOne = axios.get('http://123.123.123.123', {
  signal: abortController.signal,
});

console.time('fetch');

const timeout = setTimeout(() => {
  abortController.abort();
}, 1000);

promiseOne
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error.message);
  })
  .finally(() => {
    console.timeEnd('fetch');
    clearTimeout(timeout);
  });

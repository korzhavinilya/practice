import fetch from 'node-fetch';

const promiseOne = fetch('http://123.123.123.123');
console.time('fetch');

promiseOne
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('error', error.message);
  })
  .finally(() => {
    console.timeEnd('fetch');
  });

const promiseTwo = new Promise((res) => {
  setTimeout(() => {
    console.log('Time is over');
    res(1);
  }, 3000);
});

Promise.race([promiseOne, promiseTwo]);
